let currentExercise = null;
let hintsShown = 0;
let currentSubject = '';
let currentTopic = '';
let currentSubtopic = '';

document.addEventListener('DOMContentLoaded', async function() {
    // URL-Parameter auslesen
    const urlParams = new URLSearchParams(window.location.search);
    currentSubject = urlParams.get('subject') || 'mathematik';
    currentTopic = urlParams.get('topic') || '';
    currentSubtopic = urlParams.get('subtopic') || '';

    // Warten bis subjects.js geladen ist
    if (typeof subjects === 'undefined') {
        console.error('subjects.js ist nicht geladen');
        return;
    }

    // Fachspezifische Farben und Inhalte setzen
    const subject = subjects[currentSubject];
    if (subject) {
        // Farben setzen
        const colors = subject.gradientColors;
        document.documentElement.style.setProperty('--primary-color', colors[0]);
        document.documentElement.style.setProperty('--secondary-color', colors[1]);
        document.documentElement.style.setProperty('--primary-gradient', `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`);
        
        // Breadcrumb aktualisieren
        document.getElementById('subject-name').textContent = subject.name;
        document.getElementById('topic-name').textContent = currentTopic || 'Allgemein';

        // Math-Tools nur für Mathematik anzeigen
        const mathTools = document.getElementById('math-tools');
        if (mathTools) {
            mathTools.style.display = currentSubject === 'mathematik' ? 'flex' : 'none';
        }

        // Math-Input-Feld anpassen
        const mathInput = document.getElementById('math-input');
        if (mathInput) {
            mathInput.style.display = currentSubject === 'mathematik' ? 'block' : 'none';
        }
    }

    // Titel der Seite aktualisieren
    document.title = `${currentTopic} - Übungsaufgabe`;

    // Aufgabe laden
    await loadExercise();

    // Event-Listener für den Überprüfen-Button
    document.getElementById('check-answer').addEventListener('click', checkAnswer);

    // Event-Listener für den Neue Aufgabe Button
    document.getElementById('new-exercise').addEventListener('click', async () => {
        const button = document.getElementById('new-exercise');
        button.disabled = true;
        button.textContent = 'Lade neue Aufgabe...';
        
        await loadExercise();
        
        button.disabled = false;
        button.textContent = 'Neue Aufgabe';
    });

    // Event-Listener für den Lösungsweg-Button
    document.getElementById('show-solution').addEventListener('click', showSolution);

    // Event-Listener für den Modal-Schließen-Button
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('solution-modal').classList.add('hidden');
    });
});

async function loadExercise() {
    try {
        // Bestehende Aufgabe und Feedback zurücksetzen
        currentExercise = null;
        document.getElementById('feedback').classList.add('hidden');
        document.getElementById('solution-modal').classList.add('hidden');
        
        // Math-Input zurücksetzen, nur wenn es existiert und initialisiert ist
        if (window.mathInput && window.mathInput.mathField && currentSubject === 'mathematik') {
            window.mathInput.clearInput();
        }

        // Neue Aufgabe vom Server anfordern
        const response = await fetch('/.netlify/functions/generateExercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                subject: currentSubject, 
                topic: currentTopic, 
                subtopic: currentSubtopic,
                forceNew: true // Signal an den Server, dass eine neue Aufgabe generiert werden soll
            })
        });

        if (!response.ok) {
            throw new Error('Netzwerk-Antwort war nicht ok');
        }

        currentExercise = await response.json();
        hintsShown = 0;

        // Aufgabe anzeigen
        document.getElementById('dynamic-exercise').innerHTML = `
            <h3>${currentTopic}</h3>
            <p class="exercise-question">${currentExercise.question}</p>
        `;

    } catch (error) {
        console.error('Fehler beim Laden der Aufgabe:', error);
        document.getElementById('dynamic-exercise').innerHTML = `
            <h3>Fehler</h3>
            <p class="error-message">Beim Laden der Aufgabe ist ein Fehler aufgetreten. Bitte versuche es später erneut.</p>
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

    solutionSteps.innerHTML = `
        <div class="solution-content">
            <p class="solution-final">Lösung: ${currentExercise.solution}</p>
            <div class="solution-steps">
                ${currentExercise.solutionSteps.map(step => `
                    <div class="solution-step">
                        <p>${step}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

function hexToRgb(hex) {
    // Entferne das #-Symbol, falls vorhanden
    hex = hex.replace('#', '');
    
    // Konvertiere Hex zu RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
}

function updateSubjectSpecificContent() {
    const subject = currentSubject || getSubjectFromUrl();
    const mathTools = document.getElementById('math-tools');
    const inputHint = document.querySelector('.input-hint');
    
    if (subject === 'mathematik') {
        mathTools.style.display = 'flex';
        if (inputHint) inputHint.style.display = 'block';
    } else {
        mathTools.style.display = 'none';
        if (inputHint) inputHint.style.display = 'none';
    }
} 