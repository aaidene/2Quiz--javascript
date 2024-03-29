const questions1 = [{
        question: "Soru 1?",
        answers: [
            { text: "Cevap 1", correct: false },
            { text: "Cevap 2", correct: false },
            { text: "Cevap 3", correct: false },
            { text: "Cevap 4", correct: true }
        ]
    },
    {
        question: "Soru 2?",
        answers: [
            { text: "Cevap 1", correct: false },
            { text: "Cevap 2", correct: true },
            { text: "Cevap 3", correct: false },
            { text: "Cevap 4", correct: false }
        ]
    },
    {
        question: "Soru 3?",
        answers: [
            { text: "Cevap 1", correct: true },
            { text: "Cevap 2", correct: false },
            { text: "Cevap 3", correct: false },
            { text: "Cevap 4", correct: false }
        ]
    },
    {
        question: "Soru 4?",
        answers: [
            { text: "Cevap 1", correct: true },
            { text: "Cevap 2", correct: false },
            { text: "Cevap 3", correct: false },
            { text: "Cevap 4", correct: false }
        ]
    }
];

var questions = [{
        "question": "Quel joueur de football a remporté le Ballon d'Or 7 fois en 2021 ?",
        "answers": [
            { "reponse": "Cristiano Ronaldo", "isCorrect": true },
            { "reponse": "Lionel Messi", "isCorrect": false },
            { "reponse": "Neymar", "isCorrect": false }
        ]
    },
    {
        "question": "Quelle équipe a remporté la Coupe du Monde de la FIFA en 2018 ?",
        "answers": [
            { "reponse": "France", "isCorrect": true },
            { "reponse": "Brésil", "isCorrect": false },
            { "reponse": "Allemagne", "isCorrect": false }
        ]
    },
    {
        "question": "Quel club a remporté le plus grand nombre de titres de Premier League anglaise ?",
        "answers": [
            { "reponse": "Manchester United", "isCorrect": true },
            { "reponse": "Liverpool", "isCorrect": false },
            { "reponse": "Chelsea", "isCorrect": false }
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.reponse;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();