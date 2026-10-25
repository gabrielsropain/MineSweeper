import Difficulty from "./Difficulty.js";
import Game from "./Game.js";
import GameView from  "./GameView.js";

class GameController{
    constructor(){
        const difficulty = new Difficulty("Beginner", 9,9,10);
        this.game = new Game(difficulty);
        this.view = new GameView(this.game);
        this.view.board.addEventListener("click", this.handleClick.bind(this));
        this.view.board.addEventListener("contextmenu", this.handleRightClick.bind(this));
        this.view.restartButton.addEventListener("click", this.handleRestart.bind(this));
        setInterval(this.view.updatePanel.bind(this.view), 500);
    }
    
    
    refresh(){
        this.view.renderBoard();
        this.view.updatePanel();
    }

    handleRestart(){
        this.game.restart();
        this.refresh();
    }

    handleClick(event){
        const element = event.target.closest(".cell");
        if (element === null){
            return;
        }
        const row = Number(element.dataset.row);
        const col = Number(element.dataset.col);
        this.game.reveal(row, col);
        this.refresh();
    }

    handleRightClick(event){
        event.preventDefault();
        const element = event.target.closest(".cell");
        if (element === null){
            return;
        }
        const row = Number(element.dataset.row);
        const col = Number(element.dataset.col);
        this.game.toggleFlag(row, col);
        this.refresh();
    }
}

export default GameController;