class Timer{
    constructor(){
        this.seconds = 0;
        this.running = false;
        this.intervalId = null;
    }

    tick(){
        this.seconds++;
    }


    start(){
        if (this.running !== true){
            this.intervalId = setInterval(this.tick.bind(this), 1000);
            this.running = true;
        }
    }

    stop(){
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.running = false;;
    }

    reset(){
        this.stop();
        this.seconds = 0;
    }

    getSeconds(){
        return this.seconds;
    }
}

export default Timer;