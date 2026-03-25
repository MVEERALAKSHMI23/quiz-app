const questions = [
    {
        question : "Which is our national animal?",
        answers : [
            {text:"Lion",correct: false},
            {text:"Tiger",correct: true},
            {text:"Elephant",correct: false},
            {text:"Bear",correct: false},
        ]
    },
    {
        question : "What is the capital of India?",
        answers : [
            {text:"Mumbai",correct: false},
            {text:"Kolkata",correct: false},
            {text:"New Delhi",correct: true},
            {text:"Chennai",correct: false},
        ]
    },
    {
        question : "Who is the Father of the Nation?",
        answers : [
            {text:"Subhash Chandra Bose",correct: false},
            {text:"Mahatma Gandhi",correct: true},
            {text:"Nehru",correct: false},
            {text:"Patel",correct: false},
        ]
    },
    {
        question : "Which is the national flower of India?",
        answers : [
            {text:"Rose",correct: false},
            {text:"Sunflower",correct: false},
            {text:"Marigold",correct: false},
            {text:"Lotus",correct: true},
        ]
    },
    {
        question : "What is the currency of India?",
        answers : [
            {text:"Dollar",correct: false},
            {text:"Rupee",correct: true},
            {text:"Dinar",correct: false},
            {text:"Pound",correct: false},
        ]
    }
];


const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex +1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button =document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if (button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled= true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestions();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();