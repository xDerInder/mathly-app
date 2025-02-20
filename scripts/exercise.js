// ExerciseManager Klasse für die Verwaltung der Aufgaben
class ExerciseManager {
    constructor() {
        this.initializeElements();
        this.loadExercise();
        this.setupEventListeners();
    }

    async loadExercise() {
        try {
            // Hole die ausgewählte Kategorie und das Thema aus dem localStorage
            const category = localStorage.getItem('selectedCategory');
            const topic = localStorage.getItem('selectedTopic');
            
            console.log('Kategorie:', category);
            console.log('Thema:', topic);
            
            if (!category || !topic) {
                console.error('Keine Kategorie oder Thema ausgewählt');
                this.showError('Bitte wähle zuerst ein Thema aus.');
                return;
            }

            // Zeige Lade-Animation
            this.showLoading();

            // Nutze die Netlify Function statt des lokalen Backends
            const response = await fetch('/.netlify/functions/generate-exercise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: category,
                    topic: topic,
                    difficulty: 'mittel' // Könnte später anpassbar gemacht werden
                })
            });

            if (!response.ok) {
                throw new Error('Fehler beim Laden der Aufgabe');
            }

            const exercise = await response.json();
            
            // Speichere die aktuelle Aufgabe
            this.currentExercise = exercise;
            
            // Aktualisiere die Anzeige
            this.updateExercise();
            
        } catch (error) {
            console.error('Fehler:', error);
            this.showError('Fehler beim Laden der Aufgabe. Bitte versuche es später erneut.');
        } finally {
            // Verstecke Lade-Animation
            this.hideLoading();
        }
    }

    initializeElements() {
        // Header Elemente
        this.topicTitleElement = document.getElementById('topic-title');
        this.topicDescriptionElement = document.getElementById('topic-description');
        
        // Aufgaben Elemente
        this.exerciseTitleElement = document.getElementById('exercise-title');
        this.exerciseDescriptionElement = document.getElementById('exercise-description');
        this.answerInput = document.getElementById('answer-input');
        this.checkButton = document.getElementById('check-answer');
        this.feedbackElement = document.getElementById('feedback');
        this.feedbackTextElement = document.getElementById('feedback-text');
        
        // Modal Elemente
        this.solutionButton = document.getElementById('show-solution');
        this.modal = document.getElementById('solution-modal');
        this.closeModalButton = document.querySelector('.close-modal');
        this.solutionStepsElement = document.getElementById('solution-steps');
        
        // Exercise Box
        this.exerciseBox = document.querySelector('.exercise-box');
        
        // Neue Aufgabe Button
        this.newExerciseButton = document.getElementById('new-exercise');
    }

    setupEventListeners() {
        this.checkButton.addEventListener('click', () => this.checkAnswer());
        this.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
        
        // Modal Event Listener
        this.solutionButton.addEventListener('click', () => this.showSolution());
        this.closeModalButton.addEventListener('click', () => this.hideModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });

        // Neue Aufgabe Button
        if (this.newExerciseButton) {
            this.newExerciseButton.addEventListener('click', () => this.loadExercise());
        }
    }

    updateExercise() {
        if (!this.currentExercise) {
            this.showError('Keine Aufgabe verfügbar');
            return;
        }

        // Update Header
        const category = localStorage.getItem('selectedCategory');
        const topic = localStorage.getItem('selectedTopic');
        this.topicTitleElement.textContent = topic;
        this.topicDescriptionElement.textContent = `${category} - Generierte Aufgabe`;
        
        // Update Aufgabe
        this.exerciseTitleElement.textContent = this.currentExercise.title;
        this.exerciseDescriptionElement.textContent = this.currentExercise.description;
        
        // Reset Input und Feedback
        this.answerInput.value = '';
        this.feedbackElement.classList.add('hidden');
        
        // Zeige die Exercise Box
        if (this.exerciseBox) {
            this.exerciseBox.style.display = 'block';
        }
    }

    showError(message) {
        this.topicTitleElement.textContent = 'Fehler';
        this.topicDescriptionElement.textContent = message;
        if (this.exerciseBox) {
            this.exerciseBox.style.display = 'none';
        }
    }

    checkAnswer() {
        if (!this.currentExercise) return;

        const userAnswer = this.answerInput.value.trim();
        const isCorrect = userAnswer === this.currentExercise.correctAnswer;

        this.feedbackElement.classList.remove('hidden', 'correct', 'incorrect');
        this.feedbackElement.classList.add(isCorrect ? 'correct' : 'incorrect');
        this.feedbackTextElement.textContent = isCorrect 
            ? 'Richtig! Gut gemacht!' 
            : 'Leider nicht richtig. Versuche es noch einmal!';
        
        // Zeige den "Lösungsweg anzeigen" Button nur bei falscher Antwort
        this.solutionButton.style.display = isCorrect ? 'none' : 'block';
    }

    showSolution() {
        if (!this.currentExercise) return;

        this.solutionStepsElement.innerHTML = this.currentExercise.solution
            .map(step => `<p>${step}</p>`)
            .join('');
        this.modal.classList.remove('hidden');
    }

    hideModal() {
        this.modal.classList.add('hidden');
    }

    showLoading() {
        // Hier könnte eine Lade-Animation angezeigt werden
        this.exerciseBox.style.opacity = '0.5';
    }

    hideLoading() {
        this.exerciseBox.style.opacity = '1';
    }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    const manager = new ExerciseManager();
});
