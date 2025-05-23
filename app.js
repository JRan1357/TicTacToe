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
    //function to add marker

    //check collison 

    // add marker to board array
    
    // check win
};

const player = function () {
    createPlayer = (name, marker) => {
        
    }
}

const board = function () {
    let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    let naughts = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    let crosses = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    let winConditions = [
        // horizontal
        ['c', 'c', 'c',
         ' ', ' ', ' ',
         ' ', ' ', ' '],
        
        [' ', ' ', ' ',
         'c', 'c', 'c',
         ' ', ' ', ' '],

        [' ', ' ', ' ',
         ' ', ' ', ' ',
         'c', 'c', 'c'],

        //vertical
        ['c', ' ', ' ',
         'c', ' ', ' ',
         'c', ' ', ' '],

        [' ', 'c', ' ',
         ' ', 'c', ' ',
         ' ', 'c', ' '],

        [' ', ' ', 'c',
         ' ', ' ', 'c',
         ' ', ' ', 'c'],
        
        // diagonal
        ['c', ' ', ' ',
         ' ', 'c', ' ',
         ' ', ' ', 'c'],
        
        [' ', ' ', 'c',
         ' ', 'c', ' ',
         'c', ' ', ' '],
    ]

    getBoard = () => {
        return board
    }

    return {
        getBoard,
    };
}

Board = board();
console.log(Board.getBoard());