//selectors for specific elements
const startPage = document.getElementById("start-page");
const startButton = document.getElementById("start-btn");
const quizContainer = document.querySelector(".quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");
const footer = document.getElementById("footer");

let shuffledQuestions, currentQuestionIndex, score;

//All 20 questions for the quiz 
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
    },
    {
        question: "What artist has the most streams on Spotify?",
        answers: [
            {text: "Drake", correct: true},
            {text: "Whiz Khalifa", correct: false},
            {text: "Red Hot Chilli Peppers", correct: false},
            {text: "Jay-Z", correct: false},
        ]
    },
    {
        question: "What is the 4th letter of the Greek alphabet?",
        answers: [
            {text: "Omega", correct: false},
            {text: "Beta", correct: false},
            {text: "Delta", correct: true},
            {text: "Hecta", correct: false},
        ]
    },
    {
        question: "What sports car company manufactures the 911?",
        answers: [
            {text: "Seat", correct: false},
            {text: "Porsche", correct: true},
            {text: "Audi", correct: false},
            {text: "Peugeot", correct: false},
        ]
    },
    {
        question: "How many dots appear on a pair of dice?",
        answers: [
            {text: "42", correct: true},
            {text: "33", correct: false},
            {text: "51", correct: false},
            {text: "28", correct: false},
        ]
    },
    {
        question: "Cacio & Pepe is a staple of what Italian city’s cuisine?",
        answers: [
            {text: "Rome", correct: true},
            {text: "Pisa", correct: false},
            {text: "Bologna", correct: false},
            {text: "Modena", correct: false},
        ]
    },
    {
        question: "What meat is used in a shepherd's pie?",
        answers: [
            {text: "Pork", correct: false},
            {text: "Lamb", correct: true},
            {text: "Pork & Beef", correct: false},
            {text: "Beef & Chicken", correct: false},
        ]
    },
    {
        question: "What animated movie features a rat who dreams of becoming a chef in Paris",
        answers: [
            {text: "The Mouse - Chef", correct: false},
            {text: "Cooking in Paris", correct: false},
            {text: "Ratatouille", correct: true},
            {text: "The Ratatouille", correct: false},
        ]
    },
    {
        question: "Who was the first Disney princess?",
        answers: [
            {text: "Mulan", correct: false},
            {text: "Cindarella", correct: false},
            {text: "Pocahontas", correct: false},
            {text: "Snow White", correct: true},
        ]
    },
    {
        question: "What country has the highest life expectancy?",
        answers: [
            {text: "Japan", correct: false},
            {text: "Hong Kong", correct: true},
            {text: "Singapore", correct: false},
            {text: "Monaco", correct: false},
        ]
    },
    {
        question: "How many weeks are in one year?",
        answers: [
            {text: "52", correct: true},
            {text: "53", correct: false},
            {text: "50", correct: false},
            {text: "41", correct: false},
        ]
    },
    {
        question: "If the time is 12pm, how many hours is it until 6pm?",
        answers: [
            {text: "6 hrs", correct: true},
            {text: "12 hrs", correct: false},
            {text: "3 hrs", correct: false},
            {text: "2 hrs", correct: false},
        ]
    },
    {
        question: "What theorem is used to find the length of an unknown side and the angle of a triangle?",
        answers: [
            {text: "Triangle sum theorem", correct: false},
            {text: "Mid-point theorem", correct: false},
            {text: "Pythagoras theorem", correct: true},
            {text: "Factor theorem", correct: false},
        ]
    },
    {
        question: "What does KFC stand for?",
        answers: [
            {text: "Kentucky Fried Crisps", correct: false},
            {text: "Kentucky Fried Chicken", correct: true},
            {text: "Kitchen Fried Chicken", correct: false},
            {text: "Kentucky Flying Chicken", correct: false},
        ]
    },
    {
        question: "What does USB stand for?",
        answers: [
            {text: "User secure byte", correct: false},
            {text: "Universal secure bus", correct: false},
            {text: "User special byte", correct: false},
            {text: "Universal serial bus", correct: true},
        ]
    },
    {
        question: "Which sea borders the north of Turkey?",
        answers: [
            {text: "Aegean Sea", correct: false},
            {text: "Sea of Marmara", correct: false},
            {text: "Atlantic Ocean", correct: false},
            {text: "Black Sea", correct: true},
        ]
    },
    {
        question: "How many hearts does an octopus have?",
        answers: [
            {text: "1.5", correct: false},
            {text: "1", correct: false},
            {text: "3", correct: true},
            {text: "7", correct: false},
        ]
    }
];

// Initializes the quiz, shuffles the questions, and resets the quiz interface
function startQuiz() {
    startPage.classList.add("hide");
    quizContainer.classList.remove("hide");
    footer.classList.add("hide"); // Hide the footer
    //Resets the quiz score to zero.
    score = 0;
    // Randomly select 10 questions from the array
    shuffledQuestions = getRandomQuestions(questions, 10);
    // Shuffle the selected questions
    shuffledQuestions = shuffledQuestions.sort(() => Math.random() - 0.5);
    //Resets the question index to start from the first question
    currentQuestionIndex = 0;
    nextButton.classList.remove("hide");
    restartButton.classList.add("hide");
    resultDiv.classList.add("hide");
    setNextQuestion();
}

// Selects a random subset of questions from the array
function getRandomQuestions(arr, num) {
    //Randomizes the order of questions
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

//Prepares the quiz for the next question
function setNextQuestion() {
    resetState();
    //Displays the current question using the showQuestion function
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Displays the current question and its possible answers
function showQuestion(question) {
    //Sets the text of the question
    questionElement.innerText = question.question;

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        //Styles the button
        button.classList.add("btn", "answer-btn");
        //Calling selectAnswer when clicked
        button.addEventListener("click", () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

// Clears the answers from the previous question
function resetState() {
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//Handles the logic for when an answer is selected 
function selectAnswer(answer) {
    const correct = answer.correct;
    // Disable all buttons after an answer is selected
    Array.from(answerButtons.children).forEach(button => button.disabled = true);
    
    const selectedButton = Array.from(answerButtons.children).find(button => button.innerText === answer.text);
    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setTimeout(() => {
            resetState();
            setNextQuestion();
        }, 200); // Add a delay before moving to the next question
    } else {
        setTimeout(() => {
            endQuiz();
        }, 1000);
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        endQuiz();
    }
});

// Event listener for the "Restart" button
restartButton.addEventListener("click", () => {
    startPage.classList.remove("hide");
    quizContainer.classList.add("hide");
    resultDiv.classList.add("hide");
    // Optionally reset the quiz state here
    currentQuestionIndex = 0;
    score = 0;
});


//func endQuiz displays the final score and ends the quiz
function endQuiz() {
    //Hides the "Next" button
    nextButton.classList.add("hide");
    //Shows the "Restart" button
    restartButton.classList.remove("hide");
    //Displays the results
    resultDiv.classList.remove("hide");
    //Shows final score x/10
    resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}

startButton.addEventListener("click", startQuiz);
