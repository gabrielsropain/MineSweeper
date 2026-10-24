import Board from "./Board.js";
import Timer from "./Timer.js";
import GameRules from "./GameRules.js";
import GameState from "./GameState.js";
import CellState from "./CellState.js";
class Game{
    constructor(difficulty){
        this.difficulty = difficulty;
        this.timer = new (Timer);
        this.rules = new (GameRules);
        this.start();
    }

    getState(){
        return this.state;
    }

    getMinesRemaining(){
        return this.board.quanMines - this.flagCount;
    }

    reveal(row,col){
        const cell = this.board.getCell(row, col);
        if (this.state === GameState.WON || this.state === GameState.LOST){
            return;
        }
        if (cell === null || cell.state !== CellState.HIDDEN ){
            return;
        }
        if (this.board.minesPlaced ===false){
            this.board.placeMines(row,col);
            this.board.calculateAdjacentMines();
            this.timer.start();
            this.state = GameState.PLAYING;
        }
        if(this.rules.checkLoss(cell)){
            this.board.revealAllMines();
            this.timer.stop();
            this.state = GameState.LOST;
            return;
        }
        this.board.floodFill(row,col);
        if(this.rules.checkWin(this.board)){
            this.timer.stop();
            this.state = GameState.WON;
        }
    }

    toggleFlag(row,col){
        const cell = this.board.getCell(row,col);
        if (this.state === GameState.WON || this.state===GameState.LOST){
            return;
        }
        if(cell === null || cell.state === CellState.REVEALED){
            return;
        }
        if (cell.state === CellState.HIDDEN){
            this.flagCount ++;
        }
        else if (cell.state === CellState.FLAGGED){
            this.flagCount --;
        }
        cell.toggleFlag();
    }

    start(){
        this.board = new Board(this.difficulty.getRows(), this.difficulty.getCols(), this.difficulty.getMines());
        this.timer.reset();
        this.state = GameState.READY;
        this.flagCount = 0;
    }

    restart(){
        this.start();
    }
}

export default Game;