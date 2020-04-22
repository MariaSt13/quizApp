const question = document.getElementById("question");
const scoreText = document.getElementById('score')
const progressText = document.getElementById('progressText')
const progressBar = document.getElementById('progressBarFill')
const game = document.getElementById("game");
const loader = document.getElementById("loader");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

let currentQuestion = {};
let score = 0;
let acceptiongAnswers = false;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

// fetch questions from trivia api
fetch("https://opentdb.com/api.php?amount=10&type=multiple&encode=base64")
    .then(res => res.json())
    .then(loadedQuestions => {
        // map questions
        questions = loadedQuestions.results.map(loadedQuestion => {
            // format the question and decode
            const formattedQuestion = {
                question: atob(loadedQuestion.question)
            }
            // load incorrect answer to choices array
            const answerChoices = [...loadedQuestion.incorrect_answers];
            // get a random index for the correct answer
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            // add the correct anwer to choices array in that index
            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
            // add choices to the formatted question and decode
            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = atob(choice);
            })
            return formattedQuestion;
        })
        startGame();
    }).catch(err => {
        console.error(err);
    });

/**
 * This function initializes the game.
 */
startGame = () => {
    // reset
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // get the first question
    getNewQuestion();
    // remove loader and show the game
    game.classList.remove('hidden');
    loader.classList.add('hidden');
}


/**
 * This function gets a new question from the available questions and shows it.
 */
getNewQuestion = () => {
    // if its the end of the game
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //save score
        localStorage.setItem('recentScore', score);
        // go to end page
        return window.location.assign("/end")
    }
    //update question number
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // update progress bar
    progressBar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`
    // get a random question
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    // display question and choices
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    // remove question
    availableQuestions.splice(questionIndex, 1);
    acceptiongAnswers = true;
}

// add click event listener to each choice
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptiongAnswers)
            return;
        acceptiongAnswers = false;
        // get selected choice number
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        // check if correct answer 
        let className = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            className = 'correct';
            updateScore(CORRECT_BONUS);
        }
        // add class to selected choice to show if answer is correct or not.
        selectedChoice.parentElement.classList.add(className);
        setTimeout(() => {
            // remove class after timeout and load a new question
            selectedChoice.parentElement.classList.remove(className);
            getNewQuestion();
        }, 700)
    })
});

// updates the score with 'num' points.
updateScore = num => {
    score += num;
    scoreText.innerText = score;
}