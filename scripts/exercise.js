let currentExercise = null;
let hintsShown = 0;

document.addEventListener('DOMContentLoaded', async function() {
    // URL-Parameter auslesen
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject') || 'mathematik';
    const topic = urlParams.get('topic') || '';
    const subtopic = urlParams.get('subtopic') || '';

    // Aufgabe laden
    await loadExercise(subject, topic, subtopic);

    // Event-Listener für den Überprüfen-Button
    document.getElementById('check-answer').addEventListener('click', checkAnswer);

    // Event-Listener für den Neue Aufgabe Button
    document.getElementById('new-exercise').addEventListener('click', () => {
        loadExercise(subject, topic, subtopic);
    });

    // Event-Listener für den Lösungsweg-Button
    document.getElementById('show-solution').addEventListener('click', showSolution);

    // Event-Listener für den Modal-Schließen-Button
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('solution-modal').classList.add('hidden');
    });
});

async function loadExercise(subject, topic, subtopic) {
    try {
        const response = await fetch('/.netlify/functions/generateExercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subject, topic, subtopic })
        });

        if (!response.ok) {
            throw new Error('Netzwerk-Antwort war nicht ok');
        }

        currentExercise = await response.json();
        hintsShown = 0;

        // Aufgabe anzeigen
        document.getElementById('dynamic-exercise').innerHTML = `
            <h3>Aufgabe</h3>
            <p>${currentExercise.question}</p>
        `;

        // Feedback und Lösungsweg ausblenden
        document.getElementById('feedback').classList.add('hidden');
        document.getElementById('solution-modal').classList.add('hidden');

        // Math-Input zurücksetzen
        if (window.mathInput) {
            window.mathInput.clearInput();
        }

    } catch (error) {
        console.error('Fehler beim Laden der Aufgabe:', error);
        document.getElementById('dynamic-exercise').innerHTML = `
            <h3>Fehler</h3>
            <p>Beim Laden der Aufgabe ist ein Fehler aufgetreten. Bitte versuche es später erneut.</p>
        `;
    }
}

function checkAnswer() {
    if (!currentExercise) return;

    const userAnswer = window.mathInput ? window.mathInput.getLatex() : '';
    const feedback = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');

    // Einfacher Vergleich - hier könnte man noch eine komplexere Überprüfung einbauen
    if (userAnswer.trim().toLowerCase() === currentExercise.solution.trim().toLowerCase()) {
        feedbackText.textContent = 'Richtig! Sehr gut gemacht!';
        feedbackText.style.color = '#4CAF50';
        document.getElementById('show-solution').style.display = 'none';
    } else {
        if (hintsShown < currentExercise.hints.length) {
            feedbackText.textContent = `Hinweis: ${currentExercise.hints[hintsShown]}`;
            feedbackText.style.color = '#FF9800';
            hintsShown++;
            document.getElementById('show-solution').style.display = 'block';
        } else {
            feedbackText.textContent = 'Leider falsch. Schaue dir den Lösungsweg an.';
            feedbackText.style.color = '#F44336';
            document.getElementById('show-solution').style.display = 'block';
        }
    }

    feedback.classList.remove('hidden');
}

function showSolution() {
    const modal = document.getElementById('solution-modal');
    const solutionSteps = document.getElementById('solution-steps');

    solutionSteps.innerHTML = currentExercise.solutionSteps
        .map(step => `<p>${step}</p>`)
        .join('');

    modal.classList.remove('hidden');
} 