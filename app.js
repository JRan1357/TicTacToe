"use strict";


const Main = function () {
    const x = 1;

    const getX = () => {
        return x;
    }

    return {
        getX
    };
}

const Game = function (board) {


    //function to add marker
    const addMarker = (marker, position) => {
        console.log("adding marker!");
        board.splice(position, 1, markers[marker])
    }
    //check collison

    // add marker to board array
    
    // check win

    // utility functions
    
    return {
        addMarker,
    };
};


const Player = function () {
    const createPlayer = (name, marker) => {
        
    }
}

const Board = function () {
    const markers = {
        'naught': 'o',
        'cross': 'x'
    };

    let markerBoards = {
        'naught': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        'cross': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    }

    let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
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

    const addMarker = (marker, position) => {
        console.log(`adding ${marker} at ${position}`);
        if (positionFree(position)) {
            markerBoards[marker].splice(position, 1, markers[marker]);
            drawToBoard(position, marker);
        } else {
            console.log('Position already occupied!');
        }
        checkWin(marker);
    }

    const drawToBoard = (position, marker) => {
        board.splice(position, 1, markers[marker]);
    }
    
    const getBoard = () => {
        return board
    }

    const getMarkerBoards = () => {
        return markerBoards
    }

    const positionFree = (position) => {
        if (board[position] == ' ') {
            return true
        } else {
            return false
        }
    }

    const checkWin = (marker) => {
        console.log('marker: ', marker);
        console.log('board: ', markerBoards[marker]);
        winConditions.forEach((array) => {
            let count = 0;
            array.forEach((item, index) => {
                
                if (item == 'c' && markerBoards[marker][index] != ' ') {
                    count++
                }
                if (count == 3) {
                    console.log(`${marker} wins!`);
                    process.exit();
                    
                }
            })
        })
    }

    return {
        getBoard,
        getMarkerBoards,
        addMarker,
        checkWin,

    };
}

const main = Main();
const board = Board();
const game = Game(board);
const player = Player();

board.addMarker('naught', 0);
console.log(board.getBoard());
board.addMarker('cross', 5);
console.log(board.getBoard());
board.addMarker('naught', 2);
console.log(board.getBoard());
board.addMarker('cross', 7);
console.log(board.getBoard());
board.addMarker('naught', 1);
console.log(board.getBoard());


