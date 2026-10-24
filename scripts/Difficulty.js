class Difficulty{
    constructor(name, rows, cols, mines){
        this._name = name;
        this._rows = rows;
        this._cols = cols;
        this._mines = mines;
    }

    getName(){
        return this._name;
    }

    getRows(){
        return this._rows;
    }

    getCols(){
        return this._cols;
    }

    getMines(){
        return this._mines;
    }
       
}

export default Difficulty;