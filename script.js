const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const startScreen = document.getElementById('start-screen');
const resultScreen = document.getElementById('result-screen');
const quizScreen = document.getElementById('quiz-screen');
const questionText = document.getElementById('question-text');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestion = document.getElementById('total-question');
const scoreSpan = document.getElementById('score');
const finalScore = document.getElementById('final-score');
const answerContainer = document.getElementById('answer-container');
const progressBar = document.getElementById('progress');

const quizQuestions = [
    {
        question : 'What is the capital of France?',
        answers : [
            { text : 'Islamabad', correct : false},
            { text : 'Marakash', correct : false},
            { text : 'London', correct : false},
            { text : 'Paris', correct : true},
        ]
    },
    {
        question : 'Which planet is known as the Red Planet?',
        answers : [
            { text : 'Earth', correct : false },
            { text : 'Mars', correct : true},
            { text : 'Jupiter', correct : false },
            { text : 'Venus', correct : false},
        ]
    },
    {
        question : 'What is the largest ocean on Earth?',
        answers : [
             { text: "Atlantic Ocean", correct: false },
             { text: "Indian Ocean", correct: false },
             { text: "Arctic Ocean", correct: false },
             { text: "Pacific Ocean", correct: true },
        ]
    },
    {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// Quiz State Variable
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', reStartQuiz);

function startQuiz(){

    currentQuestionIndex = 0;
    score = 0;

    startScreen.classList.remove('active');

    showQuestion();
}

function showQuestion(){

    answerDisabled = false;

    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    totalQuestion.textContent = quizQuestions.length;
    scoreSpan.textContent = score;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + '%';

    questionText.textContent = currentQuestion.question;

    answerContainer.innerHTML = '';

    quizScreen.classList.add('active');

    currentQuestion.answers.forEach( answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');
        button.addEventListener('click', selectAnswer);
        button.dataset.correct = answer.correct;

        answerContainer.appendChild(button);
    });
}

function selectAnswer(event){

    if(answerDisabled) return;

    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    Array.from(answerContainer.children).forEach( (button) => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
            alert('correct');
        } else if( button === selectedButton){
            button.classList.add('incorrect');
            
            alert('incorrect');
        }
    });
    
    if(isCorrect){
        score += 1;        
        scoreSpan.textContent = score;
    }

    setTimeout(() => {

    currentQuestionIndex++;

    if(currentQuestionIndex < quizQuestions.length){
        showQuestion();        
    }
    else{
        showResult();
    }
    }, 1000);
}

function showResult(){
finalScore.textContent = score;
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
}

function reStartQuiz(){
    alert('from restart Quiz.');
    resultScreen.classList.remove('active');
    startQuiz();
}