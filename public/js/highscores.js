const highScoreList = document.getElementById("highScoreList");
// get high scores table if exists
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// show high scores in a table.
highScoreList.innerHTML = highScores.map(score =>
    `<tr class="highscore">
            <td>${score.name}</td>
            <td class="score">${score.score}</td>
    </tr>`)
    .join("");