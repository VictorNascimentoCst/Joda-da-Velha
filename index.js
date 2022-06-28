const cellElements = document.querySelectorAll("[data-cell]") /*usa colchetes para selecionar por atributos*/
const board = document.querySelector("[data-board]")
const winMsgTxt = document.querySelector("[data-winMsg-txt]")
let isCircleTurn;
const winMsg = document.querySelector("[winMsg")
const restartButton = document.querySelector("[data-win-msg-button]")

const winningCombinations = [
    [0, 1, 2],
    [3, 4 ,5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*Adicionando a funcao em cada div cell */
const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove("circle")
        cell.classList.remove('x')
        cell.removeEventListener('click', handleClick);
        cell.addEventListener("click", handleClick, {once:true});
    }
    

   setBoardHoverClass()
    winMsg.classList.remove("show-winnig-msg")
}

const endGame = (isDraw) => {
    if(isDraw) {
        winMsgTxt.innerText = 'Empate'
    } else {
        winMsgTxt.innerText = isCircleTurn ? "O Venceu!" : "X Venceu !"
    }
    winMsg.classList.add('show-winnig-msg')
}


const checkForWin = (currentPlayer) =>{
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}
checkForDraw = () => {
    return[...cellElements].every((cell) => {
      return  cell.classList.contains('x') || cell.classList.contains('circle')
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
}

/*Mudando o simbolo */

const setBoardHoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if(isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn

    setBoardHoverClass()
};

/* Funcao do evento click */
const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw();

    if(isWin) {
        endGame(false)
    } else if(isDraw) {
        endGame(true)
    } else {
        swapTurns();
    }
        
  
};


startGame();

restartButton.addEventListener('click', startGame)