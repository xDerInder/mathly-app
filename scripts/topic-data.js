const topicData = {
    algebra: {
        quadratischeFunktionen: {
            title: "Quadratische Funktionen",
            description: "Lerne alles über quadratische Funktionen, ihre Graphen und Eigenschaften.",
            exercises: [
                {
                    title: "Scheitelpunkt berechnen",
                    description: "Berechne den Scheitelpunkt der Funktion f(x) = x² + 4x + 3",
                    correctAnswer: "(-2,-1)",
                    solution: [
                        "Schritt 1: Bringe die Funktion in die Scheitelpunktform f(x) = a(x + p)² + q",
                        "Schritt 2: Ergänze das Quadrat: x² + 4x = (x + 2)² - 4",
                        "Schritt 3: Also ist f(x) = (x + 2)² - 4 + 3 = (x + 2)² - 1",
                        "Schritt 4: Der Scheitelpunkt ist S(-2, -1)"
                    ]
                },
                {
                    title: "Nullstellen bestimmen",
                    description: "Bestimme die Nullstellen der Funktion f(x) = x² - 4",
                    correctAnswer: "-2,2",
                    solution: [
                        "Schritt 1: Setze f(x) = 0",
                        "Schritt 2: x² - 4 = 0",
                        "Schritt 3: x² = 4",
                        "Schritt 4: x = ±2, also x₁ = -2 und x₂ = 2"
                    ]
                }
            ]
        },
        lineareFunktionen: {
            title: "Lineare Funktionen",
            description: "Verstehe die Grundlagen linearer Funktionen und ihre grafische Darstellung.",
            exercises: [
                {
                    title: "Steigung berechnen",
                    description: "Berechne die Steigung der Geraden durch die Punkte A(1,2) und B(3,6)",
                    correctAnswer: "2",
                    solution: [
                        "Schritt 1: Verwende die Steigungsformel m = (y₂-y₁)/(x₂-x₁)",
                        "Schritt 2: Setze die Werte ein: m = (6-2)/(3-1)",
                        "Schritt 3: m = 4/2 = 2"
                    ]
                }
            ]
        },
        termeUndVariablen: {
            title: "Terme und Variablen",
            description: "Mathematische Ausdrücke verstehen und vereinfachen",
            exercises: [
                // Aufgaben hier
            ]
        }
    },
    geometrie: {
        pythagoras: {
            title: "Satz des Pythagoras",
            description: "Lerne den Satz des Pythagoras und seine Anwendungen kennen.",
            exercises: [
                {
                    title: "Hypotenuse berechnen",
                    description: "Ein rechtwinkliges Dreieck hat die Katheten a=3 und b=4. Wie lang ist die Hypotenuse c?",
                    correctAnswer: "5",
                    solution: [
                        "Schritt 1: Verwende die Formel a² + b² = c²",
                        "Schritt 2: Setze die Werte ein: 3² + 4² = c²",
                        "Schritt 3: 9 + 16 = c²",
                        "Schritt 4: 25 = c²",
                        "Schritt 5: c = 5"
                    ]
                }
            ]
        },
        flaechenberechnung: {
            title: "Flächenberechnung",
            description: "Berechne Flächen verschiedener geometrischer Formen",
            exercises: [
                // Aufgaben hier
            ]
        },
        kreiseUndWinkel: {
            title: "Kreise und Winkel",
            description: "Grundlagen der Kreisgeometrie und Winkelmessung",
            exercises: [
                // Aufgaben hier
            ]
        }
    },
    analysis: {
        differentialrechnung: {
            title: "Differentialrechnung",
            description: "Lerne die Grundlagen der Differentialrechnung und wie man Ableitungen berechnet.",
            exercises: [
                {
                    title: "Ableitung bestimmen",
                    description: "Bestimme die Ableitung der Funktion f(x) = x³",
                    correctAnswer: "3x²",
                    solution: [
                        "Schritt 1: Verwende die Potenzregel: Die Ableitung von xⁿ ist n·x^(n-1)",
                        "Schritt 2: Hier ist n=3",
                        "Schritt 3: Also ist f'(x) = 3x²"
                    ]
                }
            ]
        },
        integralrechnung: {
            title: "Integralrechnung",
            description: "Grundlagen der Integration und Flächenberechnung",
            exercises: [
                // Aufgaben hier
            ]
        },
        kurvendiskussion: {
            title: "Kurvendiskussion",
            description: "Analysiere Funktionen und ihre Eigenschaften",
            exercises: [
                // Aufgaben hier
            ]
        }
    },
    statistik: {
        datenanalyse: {
            title: "Datenanalyse",
            description: "Lerne wichtige Kennzahlen der Statistik kennen und berechnen.",
            exercises: [
                {
                    title: "Arithmetisches Mittel",
                    description: "Berechne den Durchschnitt der Zahlen: 2, 4, 6, 8, 10",
                    correctAnswer: "6",
                    solution: [
                        "Schritt 1: Addiere alle Zahlen: 2 + 4 + 6 + 8 + 10 = 30",
                        "Schritt 2: Teile durch die Anzahl der Zahlen: 30 ÷ 5 = 6"
                    ]
                }
            ]
        },
        wahrscheinlichkeit: {
            title: "Wahrscheinlichkeit",
            description: "Grundlagen der Wahrscheinlichkeitsrechnung",
            exercises: [
                // Aufgaben hier
            ]
        },
        diagramme: {
            title: "Diagramme",
            description: "Lerne verschiedene Arten von Diagrammen kennen und erstelle sie selbst",
            exercises: [
                {
                    title: "Balkendiagramm erstellen",
                    description: "Erstelle ein Balkendiagramm für die folgenden Daten: A=5, B=3, C=7, D=2",
                    correctAnswer: "balkendiagramm",
                    solution: [
                        "Schritt 1: Zeichne die x- und y-Achse",
                        "Schritt 2: Beschrifte die x-Achse mit den Kategorien A, B, C, D",
                        "Schritt 3: Teile die y-Achse in gleichmäßige Abschnitte ein",
                        "Schritt 4: Zeichne die Balken entsprechend der Werte"
                    ]
                }
                // Weitere Aufgaben hier
            ]
        }
    }
};
