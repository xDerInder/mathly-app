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
            subject: subject,
            topic: topic,
            subtopic: subtopic,
            forceNew: true,
            config: {
                language: "German",
                formatting: {
                    useLaTeX: true,
                    stepByStep: true,
                    decimalSeparator: ",",
                },
                difficulty: {
                    adaptiveDifficulty: true,
                    maxComplexity: {
                        chemistry: "medium"
                    }
                },
                validation: {
                    allowEquivalentAnswers: true,
                    naturalLanguageComparison: true,
                    toleranceRange: 0.01,
                },
                requirements: {
                    minQuestionLength: 50,
                    contextRequired: true,
                    solutionStepsRequired: true,
                    formatSolution: {
                        steps: true,
                        equations: "LaTeX",
                        finalAnswer: "highlighted"
                    }
                }
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