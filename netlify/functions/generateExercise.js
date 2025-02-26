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
        
        // Prompt für die KI vorbereiten
        const prompt = `Generiere eine ${subject}-Aufgabe zum Thema ${topic} (${subtopic}). Die Antwort MUSS im folgenden JSON-Format sein: {"question": "Aufgabenstellung hier", "hints": ["Hinweis 1", "Hinweis 2"], "solution": "Lösung hier", "solutionSteps": ["Schritt 1", "Schritt 2"]}`;

        console.log('Sende Anfrage an Hugging Face API...');

        // Hugging Face API aufrufen
        const response = await fetch(
            'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 500,
                        temperature: 0.7,
                        return_full_text: false
                    }
                })
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
            const match = result[0].generated_text.match(/\{.*\}/s);
            if (match) {
                exercise = JSON.parse(match[0]);
            } else {
                throw new Error('Kein JSON in der Antwort gefunden');
            }
        } catch (e) {
            console.log('Verwende Fallback-Aufgabe');
            exercise = {
                question: "Was ist die Ableitung von x²?",
                hints: ["Denke an die Potenzregel", "Der Exponent wird nach vorne multipliziert"],
                solution: "2x",
                solutionSteps: ["1. Potenzregel: Multipliziere mit dem Exponenten", "2. Reduziere den Exponenten um 1"]
            };
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
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                error: 'Interner Server-Fehler',
                details: error.message
            })
        };
    }
}; 