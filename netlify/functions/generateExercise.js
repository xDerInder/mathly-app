import fetch from 'node-fetch';

export const handler = async (event) => {
    // Nur POST-Anfragen erlauben
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Methode nicht erlaubt' })
        };
    }

    try {
        // API-Key überprüfen
        if (!process.env.HUGGINGFACE_API_KEY) {
            throw new Error('API-Key nicht konfiguriert');
        }

        const { subject, topic, subtopic } = JSON.parse(event.body);
        
        const promptConfig = {
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            inputs: `Generiere eine Übungsaufgabe für das Fach ${subject}, Thema ${topic || 'Allgemein'}${subtopic ? ', Unterthema ' + subtopic : ''}.

Wichtige Anforderungen:
1. Die Aufgabe MUSS auf Deutsch sein
2. Für Mathematik: Verwende LaTeX-Formatierung für Formeln
3. Der Schwierigkeitsgrad sollte angemessen sein
4. Gib detaillierte Lösungsschritte an
5. Formatiere mathematische Formeln korrekt mit LaTeX

Generiere die Antwort im folgenden JSON-Format:
{
    "question": "Die Aufgabenstellung",
    "hints": ["Erster Hinweis", "Zweiter Hinweis"],
    "solution": "Die vollständige Lösung",
    "solutionSteps": ["Schritt 1", "Schritt 2", "Schritt 3"]
}

Stelle sicher, dass:
- Die Aufgabe klar und verständlich ist
- Die Hinweise hilfreich sind
- Die Lösung vollständig und korrekt ist
- Die Lösungsschritte logisch aufeinander aufbauen
${subject === 'chemie' ? '- Die Aufgabe nicht zu komplex ist' : ''}
${subject === 'mathematik' ? '- Alle Formeln in LaTeX-Format sind' : ''}`,
            parameters: {
                max_new_tokens: 1000,
                temperature: 0.7,
                top_p: 0.95,
                do_sample: true,
                return_full_text: false
            }
        };

        console.log('Sende Anfrage an Hugging Face API...');

        const response = await fetch(
            'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(promptConfig)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API-Fehler:', errorText);
            throw new Error(`API-Anfrage fehlgeschlagen: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('API-Antwort erhalten:', result);

        // Antwort formatieren
        let exercise;
        try {
            // Versuche JSON aus der Antwort zu extrahieren
            const jsonMatch = result[0].generated_text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                exercise = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('Kein gültiges JSON in der Antwort gefunden');
            }

            // Validiere die Struktur der Antwort
            if (!exercise.question || !exercise.solution || !Array.isArray(exercise.hints) || !Array.isArray(exercise.solutionSteps)) {
                throw new Error('Ungültige Antwortstruktur');
            }

        } catch (e) {
            console.log('Verwende Fallback-Aufgabe für', subject);
            exercise = getFallbackExercise(subject, topic);
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(exercise)
        };

    } catch (error) {
        console.error('Fehler in generateExercise:', error);
        
        // Gebe Fallback-Aufgabe zurück statt Fehlermeldung
        const fallbackExercise = getFallbackExercise(subject, topic);
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(fallbackExercise)
        };
    }
};

// Fallback-Aufgaben für verschiedene Fächer
function getFallbackExercise(subject, topic) {
    const fallbacks = {
        mathematik: {
            question: "Berechne die Ableitung der Funktion f(x) = 3x² + 2x - 5.",
            hints: [
                "Wende die Potenzregel an",
                "Die Ableitung von x² ist 2x",
                "Beachte die Summenregel"
            ],
            solution: "f'(x) = 6x + 2",
            solutionSteps: [
                "1. Wir wenden die Potenzregel auf 3x² an: 3 · 2x = 6x",
                "2. Die Ableitung von 2x ist 2",
                "3. Die Ableitung einer Konstanten ist 0",
                "4. Zusammenfassen: f'(x) = 6x + 2"
            ]
        },
        physik: {
            question: "Ein Auto beschleunigt gleichmäßig aus dem Stand auf 100 km/h in 8 Sekunden. Berechne die Beschleunigung.",
            hints: [
                "Wandle km/h in m/s um",
                "Nutze die Formel a = Δv/Δt",
                "Beachte die Einheiten"
            ],
            solution: "3,47 m/s²",
            solutionSteps: [
                "1. Umrechnung: 100 km/h = 27,78 m/s",
                "2. Zeitdifferenz: Δt = 8 s",
                "3. Geschwindigkeitsänderung: Δv = 27,78 m/s",
                "4. a = 27,78 m/s ÷ 8 s = 3,47 m/s²"
            ]
        },
        chemie: {
            question: "Berechne die molare Masse von Schwefelsäure (H₂SO₄).",
            hints: [
                "Schaue die atomaren Massen nach: H = 1,01 g/mol, S = 32,07 g/mol, O = 16,00 g/mol",
                "Beachte die Anzahl der Atome"
            ],
            solution: "98,09 g/mol",
            solutionSteps: [
                "1. Masse von H₂: 2 · 1,01 g/mol = 2,02 g/mol",
                "2. Masse von S: 1 · 32,07 g/mol = 32,07 g/mol",
                "3. Masse von O₄: 4 · 16,00 g/mol = 64,00 g/mol",
                "4. Gesamtmasse: 2,02 + 32,07 + 64,00 = 98,09 g/mol"
            ]
        },
        biologie: {
            question: "Erkläre den Prozess der Photosynthese und nenne die wichtigsten Reaktanden und Produkte.",
            hints: [
                "Denke an die Rolle des Sonnenlichts",
                "Welche Stoffe werden aufgenommen?",
                "Was sind die Endprodukte?"
            ],
            solution: "6 CO₂ + 6 H₂O + Lichtenergie → C₆H₁₂O₆ + 6 O₂",
            solutionSteps: [
                "1. Aufnahme von Kohlenstoffdioxid aus der Luft",
                "2. Aufnahme von Wasser durch die Wurzeln",
                "3. Absorption von Lichtenergie durch Chlorophyll",
                "4. Bildung von Glucose als Energiespeicher",
                "5. Freisetzung von Sauerstoff als Nebenprodukt"
            ]
        }
    };

    return fallbacks[subject] || fallbacks.mathematik;
} 