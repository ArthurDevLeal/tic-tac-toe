// Innitial data
let gameBoard = {
    a1: "",
    a2: "",
    a3: "",
    b1: "",
    b2: "",
    b3: "",
    c1: "",
    c2: "",
    c3: "",
};
let player = "";
let warning = "";
let playing = false;
reset();

// Events
document.querySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", itemClick);
});

// Functions
function reset() {
    warning = "";

    let random = Math.floor(Math.random() * 2);
    random === 0 ? (player = "X") : (player = "O");

    for (let i in gameBoard) {
        gameBoard[i] = "";
    }

    playing = true;

    renderGameBoard();
    renderInfo();
}

function renderGameBoard() {
    for (let i in gameBoard) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = gameBoard[i];
    }
    checkResult();
}

function renderInfo() {
    document.querySelector(".vez").innerHTML = player;
    document.querySelector(".resultado").innerHTML = warning;
}

function itemClick(event) {
    let item = event.target.getAttribute("data-item");
    if (gameBoard[item] === "" && playing) {
        gameBoard[item] = player;
        renderGameBoard();
        switchPlayer();
        renderInfo();
    }
}

function switchPlayer() {
    player = player === "X" ? "O" : "X";
}

function checkResult() {
    if (checkWinnerFor("X")) {
        warning = 'O "X" venceu';
        playing = false;
    } else if (checkWinnerFor("O")) {
        warning = 'O "O" venceu';
        playing = false;
    } else if (checkDraw()) {
        warning = "Deu empate";
        playing = false;
    }
}

function checkWinnerFor(player) {
    let poss = ["a1,a2,a3", "b1,b2,b3", "c1,c2,c3", "a1,b1,c1", "a2,b2,c2", "a3,b3,c3", "a1,b2,c3", "a3,b2,c1"];
    for (let i in poss) {
        let newArr = poss[i].split(",");
        let hasWon = newArr.every((item) => {
            return gameBoard[item] === player;
        });
        if (hasWon) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    for (let i in gameBoard) {
        if (gameBoard[i] === "") {
            return false;
        }
    }
    return true;
}
