import CellState from "./CellState.js";
class GameRules{
    checkWin(board){
        for (let r =0; r<board.rows; r++){
            for (let c = 0; c<board.cols; c++){
                const cell = board.getCell(r,c);
                if (cell.hasMine === false && cell.state !== CellState.REVEALED ){
                    return false;
                }
            }
        }
        return true;

    }

    checkLoss(cell){
        if (cell.hasMine === true){
            return true;
        }
        else{
            return false;
        }
    }
}

export default GameRules;

