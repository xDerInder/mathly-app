const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// HuggingFace API Endpoint
const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";

export async function handler(event, context) {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle OPTIONS request (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Parse request body
    const { category, topic, difficulty = "mittel" } = JSON.parse(event.body);

    // Create prompt for the model
    const prompt = `<s>[INST]Erstelle eine Mathematik-Aufgabe für folgendes Thema:
    Kategorie: ${category}
    Thema: ${topic}
    Schwierigkeitsgrad: ${difficulty}

    Gib die Antwort in folgendem JSON-Format zurück:
    {
        "title": "Kurzer Titel der Aufgabe",
        "description": "Ausführliche Aufgabenbeschreibung",
        "correctAnswer": "Die korrekte Antwort (möglichst kurz und eindeutig)",
        "solution": [
            "Schritt 1: Erste Erklärung",
            "Schritt 2: Zweite Erklärung",
            "usw."
        ]
    }

    Wichtig:
    - Die Aufgabe soll herausfordernd aber lösbar sein
    - Die correctAnswer muss eindeutig und kurz sein (z.B. "5", "-2,3", "x²+2")
    - Der Lösungsweg soll in klaren, nachvollziehbaren Schritten erklärt werden
    - Gib NUR das JSON zurück, keine zusätzlichen Erklärungen[/INST]</s>`;

    console.log('Generated Prompt:', prompt);

    // Call HuggingFace API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 256,
          temperature: 0.7,
          top_p: 0.9
        }
      })
    });

    console.log('HuggingFace API Response Status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('HuggingFace API Response Data:', JSON.stringify(data, null, 2));

    // Überprüfe, ob die Antwort gültig ist
    if (!data || !Array.isArray(data) || data.length === 0 || !data[0]?.generated_text) {
      throw new Error('Ungültige Antwort von der HuggingFace API');
    }

    let exercise;
    try {
      exercise = JSON.parse(data[0].generated_text);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError.message);
      throw new Error('Fehler beim Parsen der KI-Antwort. API könnte unerwartete Daten zurückgeben.');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(exercise)
    };
  } catch (error) {
    console.error('Error:', error.message, error.stack);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
}
