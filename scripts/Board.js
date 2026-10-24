import Cell from "./Cell.js";
class Board{ //this constructs the board using a two anidated fors, one for the columns and the other one for the rows.
    constructor(rows, cols, quanMines){
        this.rows = rows; 
        this.cols = cols; 
        this.quanMines = quanMines;
        this.minesPlaced = false;
        this.cells = [];
        for (let r = 0; r < this.rows; r++){
            const rowCells = [];
            for (let c = 0; c < this.cols; c++){
                rowCells.push(new Cell(r, c));
            }
            this.cells.push(rowCells);
        }
    }

    isInside(row, col){
        if ((row >= 0 && row <= (this.rows - 1)) && (col >= 0 && col <= (this.cols -1))){
            return true;
        }
        else return false; 
    }

    getCell(row, col){
        const inside = this.isInside(row,col);
        if(inside){
            return this.cells[row][col];
        }
        else{
            return null;
        }
    }

    getNeighbors(row, col){
        const neighbors = [];
        for (let r = -1; r <= 1; r++){
            for(let c = -1; c <= 1; c++ ){
                if(r === 0 && c ===0){
                    continue;
                }
                
                const cell = this.getCell(row + r, col + c);
                
                if(cell !== null){
                    neighbors.push(cell);
                }
            }
        }
        return neighbors;
    }

    placeMines(safeRow, safeCol){
        let count = 0;
        const safeCell = this.getCell(safeRow, safeCol);
        while (count < this.quanMines){
            const randomRow = Math.floor(Math.random() * this.rows);
            const randomCol = Math.floor(Math.random()* this.cols);
            const randomCell = this.getCell(randomRow, randomCol);

            if (randomCell === safeCell || randomCell.hasMine === true ){
                continue;
            }
            else{
                randomCell.hasMine = true;

            }
            count ++;
           
        }
        this.minesPlaced = true;
    }

    calculateAdjacentMines(){
        for (let r = 0; r < this.rows; r++ ){
            for (let c = 0; c < this.cols; c++){
                let count = 0;
                const cell = this.getCell(r, c);
                const neighbors = this.getNeighbors(r,c);
                for (const n of neighbors){
                    if (n.hasMine === true){
                        count ++; 
                    }
                    

                }
                cell.adjacentMines = count;
            }
        }
    }

    floodFill(row, col){
        const cell = this.getCell(row, col);
        if (cell === null || cell.state !== CellState.HIDDEN){
            return;
        }
        cell.reveal();
        const neighbors = this.getNeighbors(row, col);
        if(cell.adjacentMines === 0){
            for (let c of neighbors){
                this.floodFill(c.row, c.col);
            }
        }
    }

    revealAllMines(){
        for (let r=0; r<this.rows; r++){
            for (let c = 0; c<this.cols; c++){
                const cell = this.getCell(r,c);
                if (cell.hasMine === true){
                    cell.reveal();
                }
            }
        }
    }

}

export default Board;