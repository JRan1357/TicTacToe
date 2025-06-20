"use strict";

// utility module contains basic functions that may be of use anywhere
// contained functions:
    // changeText(),
    // updateScoreBoard()
    
// returns: 
    // changeText()
    // updateScoreBoard()

const Utility = function () {

    // in:
        // text (string)
        // html ID (string)
    // out: none
    // process: changes target text
    
    // functions called: 
        // document.getElementById()

    const changeText = (text, targetID) => {
        console.log('target id:', targetID, '\ntext: ', text);
        let html = document.getElementById(targetID);
        html.textContent = text;
    };

    // in:
        // marker (string): string referencing which marker is currently in play, 'naught' or 'cross'
        // score (int): object from players module, contains string key of marker, int value of current score
    // out: none
    // process: updates score text to values stored in players.score 

    // functions called: 
        // utility.changeText()

    const updateScoreBoard = (marker, score) => {
        console.log('updating ', marker, 'score, to ', score);
        changeText(score, marker);
    }

    return {
        changeText,
        updateScoreBoard,
    };
};

// game module is intended to store core functionality that doesn't fit into one of the
// more specialised modules. It also contains a small piece of code that is run on instantitiation to check
// if it is the first round, and if so, requests player names.

// contained variables:
    // turn count (int)
    // marker (string)

// contained functions:
    // drawBoard(),
    // inputMarker(),
    
// input modules:
    // board, 
    // utility
    // players
    
// returns: 
    // inputMarker

const Game = function (board, utility, players) {
    let turnCount = 0;
    let marker = 'naught';

    // check if new game
    console.log('Score is: ', players.getScore('naught'), players.getScore('cross'))
    if (players.getScore('naught') == 0 && players.getScore('cross') == 0) {
        console.log('Setting names');
        players.setNames();
    }
    

    // in:
        // id (string): string id for target html
    // out: none
    // process: retrieves board array, and accesses index referenced by ID, updates that cell in displayed board with content of index
        // also updates displayed score from players.score object
    
    // functions called:
        // utility.changeText()
        // utility.updateScoreBoard()
        
    const drawBoard = (id) => {
        console.log('board: ', board.getBoard());
        utility.changeText(board.getBoard()[id], id)

        utility.updateScoreBoard('naught', players.getScore('naught'));
        utility.updateScoreBoard('cross', players.getScore('cross'));
    };


    // in:
        // id (string): string id for target html
    // out: none
    // process: uses turnCount to determine current player
        // passes board.addMarker() id as int
        // increments turnCount
        // passes game.drawBoard(), id and board object

    // functions called:
        // board.addMarker()
        // board.getBoard()
        // game.drawBoard()
        
    const inputMarker = (id) => {
        // switches marker between turns
        if (turnCount % 2 == 0) {
            marker = 'naught';
        } else {
            marker = 'cross';
        };
        
        board.addMarker(marker, parseInt(id));
        console.log(board.getBoard());

        turnCount++
        drawBoard(id, board);
    };

    return {
        inputMarker,
    }
};
 
// Players module contains functions relating to controlling player objects
// Contained functions:
    // addPoint()
    // getScore()
    // setNames()
    // getNames()

// Contained objects:
    // playerNames
    // score

const Players = function (utility) {
    let score = {
        'naught': 0,
        'cross': 0
    };

    // empty object to store names
    let playerNames = {};

    // in:
        // marker (string)
    // out: 
        // none
    // process: 
        // increments score value of marker in score object
    
    const addPoint = (marker) => {
        console.log('adding point to: ', marker);
        score[marker]++;
    };

    // in:
        // marker (string)
    // out: 
        // score value
    // process:
        // returns score value
        
    const getScore = (marker) => {
        return score[marker];
    };

    // in: none
    // out: none
    // process: 
        // assigns name to playerNames object
        // changes displayed names to player names

    const setNames = () => {
        playerNames.name1 = prompt("Player 1 Name:");
        playerNames.name2 = prompt("Player 2 Name:");
        utility.changeText(playerNames.name1, 'name1');
        utility.changeText(playerNames.name2, 'name2');
    }

    // in: none
    // out: playerNames
    // process: 
        // returns playerNames object
        
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

// The board modules is intended to contain functions and variables
// relating to board logic, such as placement of markers, win conditions
//  and displaying markers on the board

// contained variables:
    // markers: obj containing strings, i.e key is naught, value is o
    // markerBoards: obj containing arrays representing x and o placements
    // board: array representing the main boardqw
    
    
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

