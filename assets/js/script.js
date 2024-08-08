const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const anwerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex , score; 

const questions = [
    {
        question: "Where is the biggest lake?", 
        answers:[
            {text: "Bulgaria", correct: false},
            {text: "Canada", correct: false},
            {text: "Asia", correct: true},
            {text: "Australia", correct: false},
        ]
        
    }, 
    {
        question: "Which is the smallest country?", 
        answers:[
            {text: "Vatican", correct: true},
            {text: "Luxembourg", correct: false},
            {text: "Monaco", correct: false},
            {text: "Liechtenstein", correct: false},
        ]

    },
    {
        question: "Where is the highest island mountain?", 
        answers:[
            {text: "Taiwan - Yu Shan", correct: false},
            {text: "Tenerife - Teide", correct: false},
            {text: "Sri Lanka - Pidurutalagala", correct: false},
            {text: "New Guinea - Puncak Jaya", correct: true},
        ]
    },

        {
            question: "Which language has more native speakers?",
            answers: [
                {text: "English", correct: false},
                {text: "Latin", correct: false},
                {text: "Spanish", correct: true},
                {text: "Chinese", correct: false},
            ]
        }
]

startQuiz();