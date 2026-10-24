import CellState from "./CellState.js";
class Cell{
    constructor(row, col){
        this.row = row; 
        this.col = col;
        this.hasMine = false;
        this.adjacentMines = 0;
        this.state = CellState.HIDDEN;
    }

    reveal(){
        if (this.state !== CellState.FLAGGED){
            this.state = CellState.REVEALED;
        }
    }

    toggleFlag(){
        if (this.state === CellState.FLAGGED){
            this.state = CellState.HIDDEN;
        }
        else if (this.state === CellState.HIDDEN){
            this.state = CellState.FLAGGED;
        }
    }
}

export default Cell;