"use strict";

const Utility = function () {
    const changeText = (text, targetID) => {
        console.log('target id:', targetID, '\ntext: ', text);
        let html = document.getElementById(targetID);
        html.textContent = text;
    };

    return {
        changeText
    };
};

const Game = function (board, utility) {
    let turnCount = 0;
    let marker = 'naught';

    const drawBoard = (id) => {
        console.log('board: ', board.getBoard());
        utility.changeText(board.getBoard()[id], id)
    };

    const inputMarker = (id) => {
        // switches marker between turns
        if (turnCount % 2 == 0) {
            marker = 'naught';
        } else {
            marker = 'cross';
        };
        
        board.addMarker(marker, parseInt(id))
        console.log(board.getBoard());

        turnCount++
        drawBoard(id, board);
    };

    return {
        inputMarker,
    }
 };

const Players = function () {
    let score = {
        'naught': 0,
        'cross': 0
    };

    const addPoint = (marker) => {
        console.log('adding point to: ', marker);
        score[marker]++;
    };

    const getScore = (marker) => {
        return score[marker];
    };

    return {
        getScore,
        addPoint
    };
};
    
const Board = function (players) {
    const markers = {
        'naught': 'o',
        'cross': 'x'
    };

    let markerBoards = {
        'naught': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        'cross': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    };

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
        };
        checkWin(marker, players);
    };

    const drawToBoard = (position, marker) => {
        board.splice(position, 1, markers[marker]);
        console.log(board);
    };
    
    const getBoard = () => {
        return board
    };

    const getMarkerBoards = () => {
        return markerBoards
    };

    const positionFree = (position) => {
        if (board[position] == ' ') {
            return true
        } else {
            return false
        };
    };

    const checkWin = (marker, players) => {
        console.log('players: ', players);
        console.log('marker: ', marker);
        winConditions.forEach((array) => {
            let count = 0;
            array.forEach((item, index) => {
                
                if (item == 'c' && markerBoards[marker][index] != ' ') {
                    count++
                };
                if (count == 3) {
                    console.log(`${marker} wins!`);
                    players.addPoint(marker);
                    alert(marker, "wins!")
                }
            })
        })
    };

    return {
        getBoard,
        getMarkerBoards,
        addMarker,
        checkWin,

    }
};
const players = Players();
const utility = Utility();
const board = Board(players);
const game = Game(board, utility);

