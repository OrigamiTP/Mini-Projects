//Declarando uma variavel para poder pegar o valor das células para alterar para x ou bolinha
const cellElements = document.querySelectorAll("[data-cell]");
//declarando uma variavel para poder pegar o board inteiro dessa vez, para poder alternar a jogada entre os jogadores
const board = document.querySelector("[data-board]");

const WinMsgTxt = document.querySelector("[data-win-msg-txt]");

const WinMsg = document.querySelector("[data-win-msg]");

const RestartBtn = document.querySelector("[data-restart-btn");

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3 ,6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]


]

const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick)
        cell.addEventListener('click', handleClick, { once: true });
    }

    setBoardHoverClass();
    WinMsg.classList.remove("show-win-msg");
}

const endGame = (isDraw) => {
    if(isDraw){
        WinMsgTxt.innerText = 'Empate!';
    }
    else{
        WinMsgTxt.innerText = isCircleTurn ? "Círculo Venceu 🤓" : "X Venceu 🤓";
    }

    WinMsg.classList.add("show-win-msg")
}

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn){
        board.classList.add("circle");
    }
    else{
        board.classList.add("x");
    };
}

const swapsTurn = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass()
};

const handleClick = (e) => {
    //Colocar uma marca(Cross or Circle).
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    //Verificar por vitória
    const isWin = checkForWin(classToAdd);
    //verificar por empate
    const isDraw = checkForDraw()

    if (isWin){
        endGame(false)
    }
    else if(isDraw){
        endGame(true)
    }
    //mudar o jogador(circulo ou cross)
    else {
        swapsTurn();
    }
    
    
    
};

startGame();

RestartBtn.addEventListener("click", startGame);