"use strict";

const Utility = function () {
    const changeText = (text, targetID) => {
        let html = document.getElementById(targetID);
        html.textContent = text;
    }

    return {
        changeText
    }
}




const Game = function (board, utility) {
    // track current player

    // switch player after placement

    // send marker position to Board module

    // draw board from board index

    const mainLoop = () => {
        const player = 'naughts'

        // display current player
    }

    const displayPlayer = (player) => {

    }

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
        console.log(board);
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
        winConditions.forEach((array) => {
            let count = 0;
            array.forEach((item, index) => {
                
                if (item == 'c' && markerBoards[marker][index] != ' ') {
                    count++
                }
                if (count == 3) {
                    console.log(`${marker} wins!`);
                    
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

const utility = Utility();
const board = Board();
const game = Game(board);
const player = Player();

utility.changeText('yert', 'currentPlayer');

// board.addMarker('naught', 0);
// board.addMarker('cross', 5);
// board.addMarker('naught', 2);
// board.addMarker('cross', 7);
// board.addMarker('naught', 1);

