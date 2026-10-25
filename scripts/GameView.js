import CellState from "./CellState.js";

class GameView{
    constructor(game){
        this.game = game;
        this.board = document.querySelector(".board");
        this.minesCounter = document.querySelector("#mines-counter");
        this.timerDisplay = document.querySelector("#timer-display");
        this.restartButton = document.querySelector("#restart-button");
    }

    renderBoard(){
        this.board.replaceChildren();
        for (let r = 0; r<this.game.board.rows; r++){
            for(let c=0; c<this.game.board.cols; c++){
                const cell = this.game.board.getCell(r,c);
                const element = document.createElement("div");
                element.classList.add("cell");
                element.dataset.row = r;
                element.dataset.col = c;
                if(cell.state === CellState.FLAGGED){
                    element.textContent = "🚩";
                }
                else if (cell.state === CellState.REVEALED){
                    element.classList.add("revealed");
                    if (cell.hasMine){
                        element.textContent = "💣";
                    }
                    else if (cell.adjacentMines > 0){
                        element.textContent = cell.adjacentMines;
                    }
                }
                this.board.appendChild(element);

            }
        }
    }

    updatePanel(){
        this.minesCounter.textContent = this.game.getMinesRemaining();
        this.timerDisplay.textContent = this.game.timer.getSeconds();     
    }
}

export default GameView;