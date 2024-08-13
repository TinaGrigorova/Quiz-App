const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");


let shuffledQuestions, currentQuestionIndex , score; 

const questions = [
    {
        question: "Where is the biggest lake in the world?", 
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

function startQuiz(){
score = 0;
//questionContainer.style.display="flex";
shuffledQuestions = questions.sort(() => Math.random() -0.5);
currentQuestionIndex = 0;
nextButton.classList.remove("hide");
restartButton.classList.add("hide");
resultDiv.classList.add("hide");
setNextQuestion(shuffledQuestions);
}


function setNextQuestion(question) {
    resetState();
    showQuestion(question[currentQuestionIndex]);
    console.log(question[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerHTML = question.question;
    question.answers.forEach((answer, index) => {
        const inputGroup = document.createElement ("div");
        inputGroup.classList.add("input-group");

        const radio = document.createElement("input");
        radio.type ="radio";
        radio.id="answer" + index;
        radio.name="answer";
        radio.value="index";

        const label = document.createElement("label"); 
        label.htmlFor= "answer" + index;
        label.innerText = answer.text;

        inputGroup.appendChild(radio);
        inputGroup.appendChild(label);
        answerButtons.appendChild(inputGroup);
        
    });

}

function resetState() {
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
nextButton.addEventListener("click", () => {
    const answerIndex = Array.from(
        answerButtons.querySelectorAll("input")
    ).findIndex((radio) => {return radio.checked});
    if (answerIndex !== -1){
        if(shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct){
            score++
        }
        currentQuestionIndex++;
        if(shuffledQuestions.length > currentQuestionIndex){
            setNextQuestion();
        }else{
          endQuiz();
        }
     }else{
        }alert("Please select an answer.");
  }
);

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
    //questionContainer.style.display = "none";
    nextButton.classList.add("hide");
    restartButton.classList.remove("hide");
    resultDiv.classList.remove("hide");
    resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;

}
