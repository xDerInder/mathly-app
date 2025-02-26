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
        const { subject, topic, subtopic } = JSON.parse(event.body);
        
        // Prompt für die KI vorbereiten
        const prompt = `Generiere eine Übungsaufgabe für ${subject} zum Thema ${topic}, Unterthema ${subtopic}.
        Format:
        {
            "question": "Die Aufgabenstellung",
            "hints": ["Erster Hinweis", "Zweiter Hinweis"],
            "solution": "Die vollständige Lösung",
            "solutionSteps": ["Schritt 1", "Schritt 2", "Schritt 3"]
        }`;

        // Hugging Face API aufrufen
        const response = await fetch(
            'https://api-inference.huggingface.co/models/google/flan-t5-large',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputs: prompt })
            }
        );

        if (!response.ok) {
            throw new Error(`API-Anfrage fehlgeschlagen: ${response.statusText}`);
        }

        const result = await response.json();

        // Antwort formatieren
        let exercise;
        try {
            exercise = JSON.parse(result[0].generated_text);
        } catch (e) {
            // Fallback für nicht-JSON Antworten
            exercise = {
                question: result[0].generated_text,
                hints: ["Versuche die Aufgabe in kleinere Schritte zu zerlegen", "Schaue dir ähnliche Beispiele an"],
                solution: "Bitte versuche es erneut",
                solutionSteps: ["Schritt 1: Aufgabe analysieren", "Schritt 2: Lösungsweg planen", "Schritt 3: Ausführen"]
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exercise)
        };

    } catch (error) {
        console.error('Fehler:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Interner Server-Fehler',
                details: error.message 
            })
        };
    }
}; 