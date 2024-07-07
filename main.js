let playerRole = 2,
    letPlaying = true;
document.querySelector("#role-dice").addEventListener("click", function(e) {
    if(!letPlaying) return;
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    document.querySelector("#dice-img").style.backgroundImage = `url(./Images/${randomNumber}.png)`;

    switchPlayer();

    let ScoreValue = Number(document.querySelector(`#player${playerRole}-score`).innerHTML);
    ScoreValue += randomNumber;
    document.querySelector(`#player${playerRole}-score`).innerHTML = ScoreValue;
    console.log("player role:" + playerRole + " scoreValue: " + ScoreValue)
});

document.querySelector("#hold").addEventListener("click", function(e) {
    if(!letPlaying) return;
    let ScoreValue = Number(document.querySelector(`#player${playerRole}-score`).innerHTML);
    let PlayerResult = Number(document.querySelector(`#player${playerRole}-result`).innerHTML);
    document.querySelector(`#player${playerRole}-result`).innerHTML = PlayerResult + ScoreValue;
    document.querySelector(`#player${playerRole}-score`).innerHTML = 0;
    checkTheWinner();
});

const popUpWindow = document.querySelector("#pop-up-window");
document.querySelector("#new-game").addEventListener("click", function(e) {
    popUpWindow.classList.remove("hidden");
});

document.querySelector("#no").addEventListener("click", function(e) {
    popUpWindow.classList.add("hidden");
});

document.querySelector("#yes").addEventListener("click", function(e) {
    popUpWindow.classList.add("hidden");
    letPlaying = true;
    for(let i = 1; i <= 2; i++)
    {
        document.querySelector(`#player${i}-result`).innerHTML = 0;
        document.querySelector(`#player${i}-score`).innerHTML = 0;
    }
    document.querySelector(`#player-${playerRole}-section`).classList.remove("stop-playing");
    switchPlayer();
});

function checkTheWinner() {
    let result = Number(document.querySelector(`#player${playerRole}-result`).innerHTML);
    if(result >= 10) 
    {
        alert(`Player ${playerRole} is the Winner!`);
        letPlaying = false;
        document.querySelector(`#player-${playerRole}-section`).classList.add("stop-playing")
    }
}

function switchPlayer() {
    playerRole = playerRole === 1 ? 2 : 1;
    let activePlayerSection = document.querySelector(`#player-${playerRole}-section`);
    activePlayerSection.classList.add("player-turn");
    activePlayerSection.classList.remove("not-my-turn"); //1 2    2 1

    let notActivePlayer = playerRole === 1 ? 2 : 1;
    let notActivePlayerSection = document.querySelector(`#player-${notActivePlayer}-section`);
    notActivePlayerSection.classList.add("not-my-turn");
    notActivePlayerSection.classList.remove("player-turn");
}