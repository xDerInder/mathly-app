const subjectTopics = {
    mathematik: {
        categories: [
            {
                id: 'analysis',
                name: 'Analysis',
                icon: '📈',
                topics: [
                    {
                        title: 'Differentialrechnung',
                        description: 'Ableitungen und ihre Anwendungen',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Integralrechnung',
                        description: 'Bestimmtes und unbestimmtes Integral',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Kurvendiskussion',
                        description: 'Funktionsanalyse und Graphen',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Grenzwerte',
                        description: 'Grenzwertberechnung und Stetigkeit',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Exponentialfunktionen',
                        description: 'e-Funktion und natürlicher Logarithmus',
                        link: 'exercise-template.html'
                    }
                ]
            },
            {
                id: 'algebra',
                name: 'Algebra & Arithmetik',
                icon: '📐',
                topics: [
                    {
                        title: 'Polynomfunktionen',
                        description: 'Eigenschaften und Nullstellen',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Folgen und Reihen',
                        description: 'Arithmetische und geometrische Folgen',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Vektorrechnung',
                        description: 'Grundlagen und Anwendungen',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Matrizen',
                        description: 'Matrizenrechnung und lineare Gleichungssysteme',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Komplexe Zahlen',
                        description: 'Rechnen mit i und Polarform',
                        link: 'exercise-template.html'
                    }
                ]
            },
            {
                id: 'stochastik',
                name: 'Stochastik',
                icon: '🎲',
                topics: [
                    {
                        title: 'Wahrscheinlichkeitsrechnung',
                        description: 'Grundlagen und bedingte Wahrscheinlichkeit',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Binomialverteilung',
                        description: 'Bernoulli-Experimente und Verteilungen',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Hypothesentests',
                        description: 'Signifikanztests und Fehlerarten',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Konfidenzintervalle',
                        description: 'Schätzung von Parametern',
                        link: 'exercise-template.html'
                    }
                ]
            },
            {
                id: 'geometry',
                name: 'Geometrie',
                icon: '📏',
                topics: [
                    {
                        title: 'Analytische Geometrie',
                        description: 'Geraden und Ebenen im Raum',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Kegelschnitte',
                        description: 'Kreis, Ellipse, Parabel, Hyperbel',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Trigonometrie',
                        description: 'Sinus, Cosinus und Tangens',
                        link: 'exercise-template.html'
                    }
                ]
            }
        ]
    },
    physik: {
        categories: [
            {
                id: 'mechanics',
                name: 'Mechanik',
                icon: '🎯',
                topics: [
                    {
                        title: 'Kinematik',
                        description: 'Bewegungen und Beschleunigung',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Dynamik',
                        description: 'Kräfte und Newtonsche Gesetze',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Impuls und Energie',
                        description: 'Erhaltungssätze und Stöße',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Kreisbewegung',
                        description: 'Zentripetalkraft und Drehimpuls',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Gravitation',
                        description: 'Gravitationsfeld und Keplersche Gesetze',
                        link: 'exercise-template.html'
                    }
                ]
            },
            {
                id: 'em',
                name: 'Elektrodynamik',
                icon: '⚡',
                topics: [
                    {
                        title: 'Elektrische Felder',
                        description: 'Ladungen und Coulomb-Kraft',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Magnetische Felder',
                        description: 'Magnetismus und Induktion',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Elektrische Stromkreise',
                        description: 'Ohmsches Gesetz und Kirchhoffsche Regeln',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Elektromagnetische Wellen',
                        description: 'Maxwell-Gleichungen und Wellenoptik',
                        link: 'exercise-template.html'
                    }
                ]
            },
            {
                id: 'quantum',
                name: 'Quantenphysik',
                icon: '🌌',
                topics: [
                    {
                        title: 'Photoeffekt',
                        description: 'Welle-Teilchen-Dualismus',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Atommodelle',
                        description: 'Bohr bis Schrödinger',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Quantenmechanik',
                        description: 'Grundlagen und Heisenbergsche Unschärferelation',
                        link: 'exercise-template.html'
                    }
                ]
            }
        ]
    },
    biologie: {
        categories: [
            {
                id: 'genetics',
                name: 'Genetik',
                icon: '🧬',
                topics: [
                    {
                        title: 'Molekulargenetik',
                        description: 'DNA, RNA und Proteinbiosynthese',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Klassische Genetik',
                        description: 'Mendel und Stammbaumanalyse',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Gentechnik',
                        description: 'Methoden und Anwendungen',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Mutation und Repair',
                        description: 'DNA-Schäden und Reparaturmechanismen',
                        link: 'exercise-template.html'
                    }
                ]
            },
            {
                id: 'cell',
                name: 'Zellbiologie',
                icon: '🔬',
                topics: [
                    {
                        title: 'Zellorganellen',
                        description: 'Aufbau und Funktion',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Stoffwechsel',
                        description: 'Zellatmung und Photosynthese',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Zellteilung',
                        description: 'Mitose und Meiose',
                        link: 'exercise-template.html'
                    }
                ]
            },
            {
                id: 'ecology',
                name: 'Ökologie',
                icon: '🌱',
                topics: [
                    {
                        title: 'Ökosysteme',
                        description: 'Struktur und Dynamik',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Stoffkreisläufe',
                        description: 'Kohlenstoff und Stickstoff',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Evolution',
                        description: 'Evolutionstheorien und Artbildung',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Biodiversität',
                        description: 'Artenvielfalt und Naturschutz',
                        link: 'exercise-template.html'
                    }
                ]
            },
            {
                id: 'human',
                name: 'Humanbiologie',
                icon: '🫀',
                topics: [
                    {
                        title: 'Nervensystem',
                        description: 'Aufbau und Funktion',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Immunsystem',
                        description: 'Abwehrmechanismen',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Hormonsystem',
                        description: 'Regulation und Feedback',
                        link: 'exercise-template.html'
                    }
                ]
            }
        ]
    },
    chemie: {
        categories: [
            {
                id: 'organic',
                name: 'Organische Chemie',
                icon: '🧪',
                topics: [
                    {
                        title: 'Kohlenwasserstoffe',
                        description: 'Alkane, Alkene, Alkine',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Funktionelle Gruppen',
                        description: 'Alkohole, Aldehyde, Ketone, Carbonsäuren',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Aromaten',
                        description: 'Benzol und Derivate',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Reaktionsmechanismen',
                        description: 'Addition, Substitution, Elimination',
                        link: 'exercise-template.html'
                    }
                ]
            },
            {
                id: 'inorganic',
                name: 'Anorganische Chemie',
                icon: '⚗️',
                topics: [
                    {
                        title: 'Atombau',
                        description: 'Schalenmodell und Orbital',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Chemische Bindung',
                        description: 'Ionisch, kovalent, metallisch',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Säure-Base-Reaktionen',
                        description: 'pH-Wert und Puffer',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Redoxreaktionen',
                        description: 'Elektronenübertragung und Galvanische Zellen',
                        link: 'exercise-template.html'
                    }
                ]
            },
            {
                id: 'physical',
                name: 'Physikalische Chemie',
                icon: '🔋',
                topics: [
                    {
                        title: 'Thermodynamik',
                        description: 'Energetik chemischer Reaktionen',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Kinetik',
                        description: 'Reaktionsgeschwindigkeit und Katalyse',
                        link: 'exercise-template.html'
                    },
                    {
                        title: 'Chemisches Gleichgewicht',
                        description: 'MWG und Gleichgewichtsverschiebung',
                        link: 'exercise-template.html'
                    }
                ]
            }
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // URL-Parameter für das aktuelle Fach auslesen
    const urlParams = new URLSearchParams(window.location.search);
    const currentSubject = urlParams.get('subject') || 'mathematik';

    // Fachspezifische Anpassungen
    updateSubjectSpecificContent(currentSubject);
    
    // Home-Link mit dem aktuellen Fach aktualisieren
    const homeLink = document.getElementById('home-link');
    if (homeLink) {
        homeLink.href = `homepage.html?subject=${currentSubject}`;
    }
});

function updateSubjectSpecificContent(subject) {
    const subjectData = subjects[subject];
    const topicsData = subjectTopics[subject];

    if (!subjectData || !topicsData) return;

    // Titel und Logo aktualisieren
    document.title = `${subjectData.name} Themengebiete - Mathly`;
    const subjectTitle = document.getElementById('subject-title');
    if (subjectTitle) subjectTitle.textContent = subjectData.name;

    const logo = document.getElementById('subject-logo');
    if (logo) {
        logo.src = `../images/${subject}-logo.png`;
        logo.alt = `${subjectData.name} Logo`;
    }

    // Farbschema anpassen
    document.documentElement.style.setProperty('--primary-gradient', `linear-gradient(45deg, ${subjectData.gradientColors[0]}, ${subjectData.gradientColors[1]})`);
    document.documentElement.style.setProperty('--primary-color', subjectData.gradientColors[0]);
    document.documentElement.style.setProperty('--secondary-color', subjectData.gradientColors[1]);

    // Kategorien anzeigen
    displayCategories(topicsData.categories);
}

function displayCategories(categories) {
    const categoryGrid = document.getElementById('category-grid');
    const topicsContainer = document.getElementById('topics-container');
    
    if (!categoryGrid || !topicsContainer) return;

    categoryGrid.innerHTML = '';
    topicsContainer.innerHTML = '';

    categories.forEach(category => {
        // Kategorie-Karte erstellen
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.onclick = () => showTopics(category.id);
        
        categoryCard.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h3>${category.name}</h3>
        `;
        
        categoryGrid.appendChild(categoryCard);

        // Themen-Sektion erstellen
        const topicSection = document.createElement('section');
        topicSection.id = `${category.id}-topics`;
        topicSection.className = 'topic-section';
        topicSection.style.display = 'none';
        
        topicSection.innerHTML = `
            <h2>${category.name}</h2>
            <div class="topic-grid">
                ${category.topics.map(topic => `
                    <div class="topic-card">
                        <h3>${topic.title}</h3>
                        <p>${topic.description}</p>
                        <button onclick="window.location.href='${topic.link}'">Jetzt lernen</button>
                    </div>
                `).join('')}
            </div>
        `;
        
        topicsContainer.appendChild(topicSection);
    });
}

function showTopics(categoryId) {
    // Alle Topic-Sektionen ausblenden
    document.querySelectorAll('.topic-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Gewählte Sektion einblenden
    const selectedSection = document.getElementById(`${categoryId}-topics`);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        selectedSection.scrollIntoView({ behavior: 'smooth' });
    }
}
