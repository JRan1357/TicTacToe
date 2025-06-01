"use strict";

const Utility = function () {
    const changeText = (text, targetID) => {
        console.log('target id:', targetID, '\ntext: ', text);
        let html = document.getElementById(targetID);
        html.textContent = text;
    };

    const updateScoreBoard = (marker, score) => {
        console.log('updating ', marker, 'score, to ', score);
        changeText(score, marker);
    }

    return {
        changeText,
        updateScoreBoard,
    };
};

const Game = function (board, utility, players) {
    let turnCount = 0;
    let marker = 'naught';
    // check if new game
    console.log('Score is: ', players.getScore('naught'), players.getScore('cross'))
    if (players.getScore('naught') == 0 && players.getScore('cross') == 0) {
        console.log('Setting names');
        players.setNames();
    }
    

    // draws markers on board, and updates scores
    const drawBoard = (id) => {
        console.log('board: ', board.getBoard());
        utility.changeText(board.getBoard()[id], id)

        utility.updateScoreBoard('naught', players.getScore('naught'));
        utility.updateScoreBoard('cross', players.getScore('cross'));
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

const Players = function (utility) {
    let score = {
        'naught': 0,
        'cross': 0
    };

    let playerNames = {

    }

    const addPoint = (marker) => {
        console.log('adding point to: ', marker);
        score[marker]++;
    };

    const getScore = (marker) => {
        return score[marker];
    };

    const setNames = () => {
        playerNames.name1 = prompt("Player 1 Name:");
        playerNames.name2 = prompt("Player 2 Name:");
        utility.changeText(playerNames.name1, 'name1');
        utility.changeText(playerNames.name2, 'name2');
    }

    const getNames = () => {
        return playerNames
    }

    return {
        getScore,
        addPoint,
        setNames,
        getNames,
    };
};
    
const Board = function (players, utility) {
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

    const setBoard = () => {
        console.log('RESETTING BOARD');
        board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        board.forEach((item, index) => {
            utility.changeText(item, index);
        })

        markerBoards = {
            'naught': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            'cross': [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        };
    }

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
                    // reset board
                    
                    setBoard();
                    count = 0;
                }
            })
        })
    };



    return {
        getBoard,
        setBoard,
        getMarkerBoards,
        addMarker,
        checkWin,

    }
};
const utility = Utility();
const players = Players(utility);
const board = Board(players, utility);
const game = Game(board, utility, players);

