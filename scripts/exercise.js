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

    // Fachspezifische Farben setzen
    updateSubjectSpecificContent();

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

function updateSubjectSpecificContent() {
    // Prüfen ob subjects.js geladen ist
    if (typeof subjects === 'undefined') {
        console.error('subjects.js ist nicht geladen');
        return;
    }

    const subject = subjects[currentSubject];
    if (!subject) {
        console.error('Ungültiges Fach:', currentSubject);
        return;
    }

    // Farben setzen
    const colors = subject.gradientColors;
    setSubjectColors(colors[0], colors[1]);

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

async function loadExercise() {
    try {
        const response = await fetch('/.netlify/functions/generateExercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                subject: currentSubject, 
                topic: currentTopic, 
                subtopic: currentSubtopic 
            })
        });

        if (!response.ok) {
            throw new Error('Netzwerk-Antwort war nicht ok');
        }

        currentExercise = await response.json();
        hintsShown = 0;

        // Breadcrumb und fachspezifische Inhalte aktualisieren
        if (subjects[currentSubject]) {
            document.getElementById('subject-name').textContent = subjects[currentSubject].name;
            document.getElementById('topic-name').textContent = currentTopic || 'Allgemein';
            updateSubjectSpecificContent();
        }

        // Aufgabe anzeigen
        document.getElementById('dynamic-exercise').innerHTML = `
            <h3>${currentTopic}</h3>
            <p class="exercise-question">${currentExercise.question}</p>
        `;

        // Feedback und Lösungsweg ausblenden
        document.getElementById('feedback').classList.add('hidden');
        document.getElementById('solution-modal').classList.add('hidden');

        // Math-Input zurücksetzen
        if (window.mathInput && currentSubject === 'mathematik') {
            window.mathInput.clearInput();
        }

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

function setSubjectColors(primaryColor, secondaryColor) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', primaryColor);
    root.style.setProperty('--secondary-color', secondaryColor);
    root.style.setProperty('--primary-color-rgb', hexToRgb(primaryColor));
    root.style.setProperty('--primary-gradient', `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`);
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