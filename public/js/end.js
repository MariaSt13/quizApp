const usernameInput = document.getElementById("username");
const saveBtn = document.getElementById("saveBtn");
const finalScore = document.getElementById('finalScore');
const recentScore = localStorage.getItem('recentScore');
const MAX_OF_HIGH_SCORES = 5;

finalScore.innerText = recentScore;

// add an event listener to the input.
usernameInput.addEventListener('input', e => {
    // disable save button if input is empty.
    saveBtn.disabled = !usernameInput.value;
})

// save button click event
saveHighScore = e => {
    e.preventDefault();
    // get higs scores table from local storage if exists
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const score = {
        score: recentScore,
        name: usernameInput.value
    }
    // push new score
    highScores.push(score);
    // sort the scores 
    highScores.sort((a, b) => b.score - a.score);
    // get only top scores
    highScores.splice(MAX_OF_HIGH_SCORES);

    // update local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));
    // go home
    window.location.assign("/")
}