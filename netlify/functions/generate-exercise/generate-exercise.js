const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// HuggingFace API Endpoint für das Mistral Modell
const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";

exports.handler = async (event, context) => {
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

    // Call HuggingFace API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 800,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const result = await response.json();
    let exerciseText = result[0].generated_text;

    // Find JSON in response
    let exercise;
    try {
      // Try to parse the entire response as JSON first
      exercise = JSON.parse(exerciseText);
    } catch (e) {
      // If that fails, try to extract JSON from the text
      const jsonStart = exerciseText.indexOf('{');
      const jsonEnd = exerciseText.lastIndexOf('}') + 1;
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        const jsonStr = exerciseText.substring(jsonStart, jsonEnd);
        exercise = JSON.parse(jsonStr);
      } else {
        throw new Error('Could not find valid JSON in response');
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(exercise)
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to generate exercise' })
    };
  }
};
