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

const Game = function () {
    const markers = {
        'naught': 'o',
        'cross': 'x'
    };

    //function to add marker
    const addMarker = (marker, position) => {
        board.marker.splice(position, 1, markers[marker])
    }
    //check collison

    // add marker to board array
    
    // check win
    
    return {
        addMarker,
    };
};


const Player = function () {
    const createPlayer = (name, marker) => {
        
    }
}

const Board = function () {
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

const board = Board();
console.log(Game.markers);
console.log(board);
game.addMarker('cross', 2);
console.log(Board.board)