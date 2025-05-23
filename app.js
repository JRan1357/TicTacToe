const main = function () {
    const x = 1;

    getX = () => {
        return x;
    }

    return {
        getX
    };
}

const game = function () {
    
};

const player = function () {
    createPlayer = (name, marker) => {
        
    }
}

const board = function () {
    let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',];
    let noughts = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',];
    let crosses = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',];

    getBoard = () => {
        return board
    }

    return {
        getBoard,
    };
}

Board = board();
console.log(Board.getBoard());