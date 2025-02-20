const exercises = {
    Algebra: {
        Quadratische_Funktionen: {
            question: "Löse die Gleichung: x² - 4 = 0",
            answer: "x = 2 oder x = -2",
            solution: ["x² = 4", "x = ±2"]
        },
        Lineare_Gleichungen: {
            question: "Löse die Gleichung: 3x + 6 = 0",
            answer: "x = -2",
            solution: ["Subtrahiere 6: 3x = -6", "Teile durch 3: x = -2"]
        },
        Terme_Variablen: {
            question: "Vereinfache den Ausdruck: 2(x + 3) + 4",
            answer: "2x + 10",
            solution: ["Verteile 2: 2x + 6 + 4", "Fasse zusammen: 2x + 10"]
        }
    },
    Geometrie: {
        Flaechenberechnung: {
            question: "Berechne die Fläche eines Rechtecks mit Länge 5 und Breite 3.",
            answer: "Fläche = 15",
            solution: ["Fläche = Länge × Breite = 5 × 3 = 15"]
        },
        Umfang: {
            question: "Berechne den Umfang eines Rechtecks mit Länge 4 und Breite 2.",
            answer: "Umfang = 12",
            solution: ["Umfang = 2 × (Länge + Breite) = 2 × (4 + 2) = 12"]
        }
    },
    Bruche: {
        Addition: {
            question: "Addiere die Brüche: 1/4 + 1/2.",
            answer: "3/4",
            solution: ["Finde einen gemeinsamen Nenner (4).", "1/4 + 2/4 = 3/4"]
        }
    }
};

function loadExercise(topic) {
    const exerciseContainer = document.getElementById('dynamic-exercise');
    const exercise = exercises[topic];
    exerciseContainer.querySelector('#exercise-title').textContent = exercise.question;
    exerciseContainer.querySelector('#exercise-description').textContent = exercise.answer;
    exerciseContainer.querySelector('#exercise-solution').innerHTML = '';
    exercise.solution.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        exerciseContainer.querySelector('#exercise-solution').appendChild(li);
    });
}

export { loadExercise };
