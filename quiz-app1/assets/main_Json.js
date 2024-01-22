// Liste des questions avec les réponses correctes
var listesDesquestions = [{
        "question": "Quel joueur de football a remporté le Ballon d'Or 7 fois en 2021 ?",
        "reponses": [
            { "reponse": "Cristiano Ronaldo", "isCorrect": true },
            { "reponse": "Lionel Messi", "isCorrect": false },
            { "reponse": "Neymar", "isCorrect": false }
        ]
    },
    {
        "question": "Quelle équipe a remporté la Coupe du Monde de la FIFA en 2018 ?",
        "reponses": [
            { "reponse": "France", "isCorrect": true },
            { "reponse": "Brésil", "isCorrect": false },
            { "reponse": "Allemagne", "isCorrect": false }
        ]
    },
    {
        "question": "Quel club a remporté le plus grand nombre de titres de Premier League anglaise ?",
        "reponses": [
            { "reponse": "Manchester United", "isCorrect": true },
            { "reponse": "Liverpool", "isCorrect": false },
            { "reponse": "Chelsea", "isCorrect": false }
        ]
    }
];

// Création de la div container pour contenir les questions
var containerDiv = document.createElement("div");
containerDiv.classList.add("container", "p-5");

// Utilisation de listesDesquestions pour créer les éléments HTML
listesDesquestions.forEach(function(question, index) {
    // Création de la section pour chaque question
    var questionSection = document.createElement("section");
    questionSection.classList.add("question-section");
    questionSection.id = "question" + (index + 1);

    // Ajout de l'en-tête (Question x) à la section
    var questionHeading = document.createElement("h2");
    questionHeading.textContent = "Question " + (index + 1);
    questionSection.appendChild(questionHeading);

    // Ajout du paragraphe avec la question à la section
    var questionParagraph = document.createElement("p");
    questionParagraph.textContent = question.question;
    questionSection.appendChild(questionParagraph);

    // Boucle sur les réponses de la question
    question.reponses.forEach(function(reponse, i) {
        // Création de la balise label pour chaque réponse
        var label = document.createElement("label");
        label.classList.add("d-flex");

        // Création de la balise input de type radio pour chaque réponse
        var input = document.createElement("input");
        input.type = "radio";
        input.name = "q" + (index + 1);
        input.value = reponse.isCorrect.toString(); // Convertir en chaîne car les valeurs des attributs HTML sont des chaînes

        // Création d'un nœud de texte pour la réponse
        var textNode = document.createTextNode(reponse.reponse);

        // Ajout de l'input et du texte à la balise label
        label.appendChild(input);
        label.appendChild(textNode);

        // Ajout de la balise label à la section
        questionSection.appendChild(label);
    });

    // Ajout de la section à la div container
    containerDiv.appendChild(questionSection);
});

// Ajout du bouton de validation
var validateButton = document.createElement("button");
validateButton.type = "button";
validateButton.classList.add("btn", "btn-primary");
validateButton.textContent = "Valider vos réponses";

// Ajout du gestionnaire d'événements au bouton de validation
validateButton.addEventListener("click", function() {
    // Vérifier si toutes les questions ont une réponse sélectionnée
    var allQuestionsAnswered = Array.from(document.querySelectorAll('.question-section')).every(function(section) {
        return section.querySelector('input[type="radio"]:checked');
    });

    if (allQuestionsAnswered) {
        // Parcourir les sections et vérifier les réponses
        var sections = document.querySelectorAll(".question-section");
        sections.forEach(function(section, index) {
            var selectedAnswer = document.querySelector('input[name="q' + (index + 1) + '"]:checked');
            if (selectedAnswer) {
                var isCorrect = selectedAnswer.value === "true";
                section.style.backgroundColor = isCorrect ? "green" : "red";
            }
        });
    } else {
        // Alerte si toutes les questions n'ont pas de réponse sélectionnée
        alert("Merci de répondre à toutes les questions avant de valider.");
    }
});

// Création d'une div pour contenir les sections et le bouton
var contentDiv = document.createElement("div");
contentDiv.appendChild(containerDiv);
contentDiv.appendChild(validateButton);

// Ajout de la div content au body du document
document.body.appendChild(contentDiv);