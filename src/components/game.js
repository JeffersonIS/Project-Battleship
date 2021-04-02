import React from 'react';
import Landing from './landing';
import BoatSegment from './boatsegment';
import SquareSegment from './squaresegment';
import Setup from './setup';
import Play from './play';
import WinnerOverlay from './winneroverlay'
import '../styles/index.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const STATUS_LANDING = "landing";
const STATUS_SETUP = "setup";
const SQUARE_CLASS = "square";
const SQUARE_HOVER_CLASS = "square-hover";
const SQUARE_ACTIVE_CLASS = "square-active";
const SQUARE_MISS_CLASS = "square-miss";
const SQUARE_HIT_CLASS = "square-hit";
const SQUARE_SUNK_CLASS = "square-sunk";
const PLAYER_1 = "player1";
const PLAYER_2 = "player2"
const NO_STATUS = "none";
const STATUS_HOVER = "hover"
const STATUS_ACTIVE = "active";
const VERTICAL_AXIS = "vertical";
const HORIZONTAL_AXIS = "horizontal";
const STATUS_AFLOAT = "afloat";
const STATUS_SUNK = "sunk";
const STATUS_HIT = "hit";
const STATUS_MISS = "miss";
const STATUS_PLAYING = "playing";

function setUpBoats ()
{    const boatsSetup = [
    {"name": "boat1",
        "length": 1,
        "coordinates": [],
        "status": "active", //afloat or sunk
        "numHits": 0,
    },
    {"name": "boat2",
        "length": 2,
        "coordinates": [],
        "status": "", //afloat or sunk
        "numHits": 0,
    },
    { "name": "boat3",
        "length": 3,
        "coordinates": [],
        "status": "", //afloat or sunk
        "numHits": 0,
    },
    {  "name": "boat4",
        "length": 4,
        "coordinates": [],
        "status": "", //afloat or sunk
        "numHits": 0,
    },
    {  "name": "boat5",
        "length": 5,
        "coordinates": [],
        "status": "", //afloat or sunk
        "numHits": 0,
    },
    {  "name": "boat6",
        "length": 6,
        "coordinates": [],
        "status": "", //afloat or sunk
        "numHits": 0,
    },
    ]
    return boatsSetup;
}

function setUpBoard() {
     let boardSetup = [];
    for(let i=0;i<10;i++){
        boardSetup.push(Array(10).fill(new SquareSegment(NO_STATUS, 0, [SQUARE_CLASS])));
    }
    return boardSetup;
}

//Square Types
//hoverSquare - potential place for a boat segment
//activeSquare - where a boat segment is placed
//hitSquare - when a boat has been hit


class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: STATUS_SETUP, //status types: landing, playing, finished
            player1: {
                id: PLAYER_1,
                name: "",
                board: setUpBoard(),
                boats: setUpBoats(),
                status: STATUS_SETUP,
                otherPlayerMessage: "",
                boatsSunk: new Set(),
                numGuesses: 0,
                numHits:0,
            },
            player2: {
                id: PLAYER_2,
                name: "",
                board: setUpBoard(),
                boats: setUpBoats(),
                status: STATUS_SETUP,
                otherPlayerMessage: "Your turn first! Sink their ships.",
                boatsSunk: new Set(),
                numGuesses: 0,
                numHits:0,
            },
            boatBeingPlacedLength: 1,
            placementAxis: VERTICAL_AXIS,
            currentPlayer: PLAYER_1,
            tempboatCoords: [],
            boatsAlreadyPlaced: new Set(),
            errorMessage: "",
            displayWinner: "none",
            winnerText: "",
        }

        this.handleStartSetup = this.handleStartSetup.bind(this);
        this.handleAdvanceToSetup = this.handleAdvanceToSetup.bind(this);
        this.handlePlaceBoatHover = this.handlePlaceBoatHover.bind(this);
        this.handlePlaceBoatHoverOut = this.handlePlaceBoatHoverOut.bind(this);
        this.handlePlaceBoatClick = this.handlePlaceBoatClick.bind(this);
        this.handleSetBoatToPlace = this.handleSetBoatToPlace.bind(this);
        this.handleAxisPlacementChange = this.handleAxisPlacementChange.bind(this);
        this.getSquareElement = this.getSquareElement.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        this.updateBoats = this.updateBoats.bind(this);
        this.handleResetSetup = this.handleResetSetup.bind(this);
        this.handleAdvanceToPlay = this.handleAdvanceToPlay.bind(this)
        this.handleAdvanceToNextPlayer = this.handleAdvanceToNextPlayer.bind(this)
        this.handleGuessClick = this.handleGuessClick.bind(this)
        this.getCoords = this.getCoords.bind(this)
        this.checkGoodToPlaceHover = this.checkGoodToPlaceHover.bind(this)
        this.checkGoodToPlaceClick = this.checkGoodToPlaceClick.bind(this)
        this.handleAdvancePlayer = this.handleAdvancePlayer.bind(this)
        this.checkName = this.checkName.bind(this)

    }

    checkGoodToPlaceHover(playerBoats,coords){
        let goodToPlace = true

        playerBoats.forEach((boat) => {
            if(boat.coordinates.length > 0){
                //if coords are in boat.coordinates, don't set boatToPlace array
                    //and don't advance boatToPlace
                boat.coordinates.forEach((boatPlacedCoords) =>{
                    if(coords[0] === boatPlacedCoords[0] && coords[1] === boatPlacedCoords[1]){
                        goodToPlace = false;
                    }
                })
            }
        });
        return goodToPlace;
    }

    checkGoodToPlaceClick(playerBoats,potentialBoat){
        let goodToPlace = true;

        potentialBoat.forEach((potentialCoord) => {
            let potentialX = potentialCoord[0];
            let potentialY = potentialCoord[1];

            playerBoats.forEach((boat) =>{
                let boatLocation = boat.coordinates;

                boatLocation.forEach((coord) => {
                    if(coord[0] === potentialX && coord[1] === potentialY){
                        goodToPlace = false;
                    }

                });
            });
        });
        return goodToPlace;
    }

    checkName() {
        let playerName;

        this.state.currentPlayer === PLAYER_1 ? playerName = this.state.player1.name : playerName = this.state.player2.name;
        if(playerName === undefined || playerName === ""){
            let newErrorMessage = (`Please enter a name for ${this.state.currentPlayer}`);
            this.setState({errorMessage: newErrorMessage})
            return false;
        } else {
            return true;
        }
    }

    getSquareElement(square) { //helper function
        let squareID = square.target.attributes.id.value;
        let element = document.getElementById(squareID);
        return element;
    }

    getCoords(square){
        const element = this.getSquareElement(square);
        let coords = element.attributes.coords.value.split(",");

        if(coords.length < 1) {
            this.setState({errorMessage: "the coordinates for the square were not retrieved in handlePlaceBoatHover function in Game element"})
            return;
        } else {
            coords = [Number(coords[0]), Number(coords[1])];
        }

        return coords;
    }

    handleStartSetup (event) {

        //this one needs some help for error checking
        const name = event.target.value;
        if(name === undefined || name === ""){
            let newErrorMessage = (`Please enter a name for ${this.state.currentPlayer}`);
            this.setState({errorMessage: newErrorMessage})
            return;
        } else {
            let newErrorMessage = "";
            this.setState({errorMessage: newErrorMessage})
        }

        if(event.target.id === "p1"){
            //more checking to see if name is valid
            this.setState(prevState => {
                let player1 = Object.assign({}, prevState.player1);
                player1.name = name;
                return {player1};
            })
        } else {
            this.setState(prevState => {
                let player2 = Object.assign({}, prevState.player2);
                player2.name = name;
                return {player2};
            })
        }
    }

    handleAdvancePlayer(){
        this.state.currentPlayer === PLAYER_1 ? this.setState({currentPlayer: PLAYER_2}) : this.setState({currentPlayer: PLAYER_1})
    }

    handleAdvanceToSetup () {
        if(this.state.player1.name !== "" && this.state.player2.name !== ""){
            const newStatus = STATUS_SETUP;
            this.setState(() => ({status: newStatus}));
        }
    }

    handleAdvanceToPlay () {
        if(!this.checkName()){
            let newErrorMessage = (`Please enter a name for ${this.state.currentPlayer}`);
            this.setState({errorMessage: newErrorMessage})
            return;
        }

        if(this.state.boatsAlreadyPlaced.size < 6){
            this.setState({errorMessage: `${this.state.currentPlayer} has not set all of their boats yet`})
             return;
         }

        this.setState(prevState => {
            let player2 = Object.assign({}, prevState.player2);
            player2.status = STATUS_PLAYING;
            return {player2};
        });

        let newStatus = STATUS_PLAYING;
        this.setState(() => ({status: newStatus}));
        this.handleAdvancePlayer()
    }

    handleAdvanceToNextPlayer (){

        if(!this.checkName()){
            let newErrorMessage = (`Please enter a name for ${this.state.currentPlayer}`);
            this.setState({errorMessage: newErrorMessage})
            return;
        }

         if(this.state.boatsAlreadyPlaced.size < 6){
            this.setState({errorMessage: `${this.state.currentPlayer} has not set all of their boats yet`})
             return;
         }

        if(this.state.currentPlayer === PLAYER_1){
            this.setState(prevState => {
                let player1 = Object.assign({}, prevState.player1);
                player1.status = STATUS_PLAYING;
                return {player1};
            })
        }

        this.handleAdvancePlayer()
        this.setState({tempboatCoords: []});
        this.setState({boatsAlreadyPlaced: new Set()});
        this.setState({boatBeingPlacedLength: 1});
    }

    handlePlaceBoatHover (square) {
        //Validate coordinates. Check if already clicked. Check if it is adjacent.
        //Check which boat they are placing down. Set tempBoatstoPlace;
        const currentPlayer = this.state.currentPlayer;
        let coords = this.getCoords(square);
        let newCoordsArray = [];
        let newBoard;
        let playerBoats;

        //validating player
        if(currentPlayer === PLAYER_1){
            newBoard = this.state.player1.board;
            playerBoats = this.state.player1.boats;
        } else if(currentPlayer === PLAYER_2){
            newBoard = this.state.player2.board;
            playerBoats = this.state.player2.boats;
        }else {
            this.setState({errorMessage: "player not valid. HandlePlaceBoatHoverfunction."})
        }

        //Check if boat and axis have been selected
        //default set to boat3 and vertical
        if(this.state.placementAxis === "" || this.state.boatBeingPlaced === ""){
            //NEEDSWORK: error message to select a boat or axis
            //return;
        }

        const boatLength = this.state.boatBeingPlacedLength;
        let boatsAlreadyPlaced = this.state.boatsAlreadyPlaced;

        //disallows hovering of boats already placed
        if(boatsAlreadyPlaced.has(boatLength)){
            console.log("boat of length ", boatLength, "already placed.")
            //NEEDSWORK ^^handle the error properly above
           return;
        }

        //checks if potential boat hovering coords are overlapping currently placed boats
        let goodToPlace = this.checkGoodToPlaceHover(playerBoats,coords);

        //checking that boats fits in the bounds of hovering cursor
        //selecting temp boat coordinates based on axis placement
        //setting bounds for boat and checking those bounds
        //NEEDSWORK: don't console log the error, display it dynamically
        if(goodToPlace){
            if(this.state.placementAxis === VERTICAL_AXIS){
                const boundRange = (10 - coords[0]);
                if(boundRange < boatLength){
                    console.log("not a good boat");
                    //NEEDSWORK ^^handle the error properly above
                    return;
                } else {
                    newCoordsArray.push(coords)
                }
                for(let i=1; i<boatLength; i++){
                    let newCoords = [coords[0] + i, coords[1]];
                    newCoordsArray.push(newCoords);
                }
            } else if (this.state.placementAxis === HORIZONTAL_AXIS){
                const boundRange = (10 - coords[1])
                if(boundRange < boatLength){
                    console.log("not a good boat");
                    //NEEDSWORK ^^handle the error properly above

                    return;
                } else {
                    newCoordsArray.push(coords)
                }
                for(let i=1; i<boatLength; i++){
                    let newCoords = [coords[0], coords[1] + i];
                    newCoordsArray.push(newCoords);
                }
            }

            //validates that the
            let canPlace = true;
            newCoordsArray.forEach((item) => {
                if(newBoard[item[0]][item[1]].status === STATUS_AFLOAT){
                    canPlace = false;
                }
            });

            if(canPlace){
                newCoordsArray.forEach((item) => {
                    newBoard[item[0]][item[1]] = new BoatSegment(STATUS_HOVER, this.state.boatBeingPlacedLength, [SQUARE_CLASS, SQUARE_HOVER_CLASS]);//status: str, boat: int, classlist: arr[]
                });
            }

            this.setState(() => ({tempboatCoords: newCoordsArray}));
            this.updateBoard(newBoard);

        } else {
            this.setState(() => ({tempboatCoords: []}));
        }
    }

    handlePlaceBoatHoverOut (square){
        let newBoard
        this.state.currentPlayer === PLAYER_1 ? newBoard = this.state.player1.board : newBoard = this.state.player2.board;

        this.state.tempboatCoords.forEach((item) => {
           if(newBoard[item[0]][item[1]].status !== STATUS_AFLOAT){
                newBoard[item[0]][item[1]] = new SquareSegment(NO_STATUS, 0, [SQUARE_CLASS]);//status: str, boat: int, classlist: arr[]
            }
        })

        this.updateBoard(newBoard);
    }

    handlePlaceBoatClick (square) {
        const boatToPlaceCoords = this.state.tempboatCoords;
        const boatBeingPlaced = this.state.boatBeingPlacedLength;
        let boatsAlreadyPlaced = this.state.boatsAlreadyPlaced;
        let coords = this.getCoords(square);
        let newBoard
        let newBoats;

        //checks to see if the boat being placed is the same as a boat already placed.
        if(boatToPlaceCoords.length === boatBeingPlaced){
            if(boatToPlaceCoords.length > 0){
                if(this.state.currentPlayer === PLAYER_1){
                    newBoard = this.state.player1.board; newBoats = this.state.player1.boats
                } else {
                    newBoard = this.state.player2.board; newBoats = this.state.player2.boats;
                }

                let goodToPlace = this.checkGoodToPlaceClick(newBoats,boatToPlaceCoords);

                if(goodToPlace){
                    boatToPlaceCoords.forEach((item) => {
                        //console.log(newBoard[item[0]][item[1]].status)
                        if(newBoard[item[0]][item[1]].status !== STATUS_AFLOAT){
                            newBoard[item[0]][item[1]] = new BoatSegment(STATUS_AFLOAT, this.state.boatBeingPlacedLength, [SQUARE_CLASS, SQUARE_ACTIVE_CLASS]);//status: str, boat: int, classlist: arr[]
                        }
                    })

                    newBoats.forEach((item) => {
                        if(item.length === boatBeingPlaced){
                            item.coordinates = boatToPlaceCoords;
                            item.status = STATUS_AFLOAT;
                        }
                    })

                    if(!boatsAlreadyPlaced.has(boatBeingPlaced)){
                        boatsAlreadyPlaced.add(boatBeingPlaced);
                    }

                    //automatically set next boat to place.
                    for(let i=6; i>0; i--){
                        if(!boatsAlreadyPlaced.has(i)){
                            this.handleSetBoatToPlace(i)
                        }
                    }

                    this.updateBoard(newBoard);
                    this.updateBoats(newBoats);
                }

            }
        }
    }


    handleGuessClick (square){
        let coords = this.getCoords(square);
        let playerGuessing, targetBoard, hiddenBoats, boatsSunk, winner, message, newNumGuesses, newNumHits, playerName;

       //getting current player, player board and boats being guessed on
       if(this.state.currentPlayer === PLAYER_1){
            playerGuessing = this.state.player1.id;
            playerName = this.state.player1.name;
            targetBoard = this.state.player2.board;
            hiddenBoats = this.state.player2.boats;
            boatsSunk = this.state.player2.boatsSunk;
            newNumGuesses = this.state.player2.numGuesses;
            newNumHits = this.state.player2.numHits;
       } else {
            playerGuessing = this.state.player2.id;
            playerName = this.state.player2.name
            targetBoard = this.state.player1.board;
            hiddenBoats = this.state.player1.boats;
            boatsSunk = this.state.player1.boatsSunk;
            newNumGuesses = this.state.player1.numGuesses;
            newNumHits = this.state.player1.numHits;
       }

       let squareClicked = targetBoard[coords[0]][coords[1]];
       let boatToSink, targetBoatLength;
       newNumGuesses += 1;

       //check hit
        if(squareClicked.status === STATUS_AFLOAT){//will change no_status to 'status_afloat'
            //may need some validation here
            targetBoatLength = squareClicked.boatLength
            if(targetBoatLength > 0){
                boatToSink = hiddenBoats[targetBoatLength - 1];
            }
            boatToSink.numHits += 1;
            newNumHits += 1;

            //checks sunk
            if(boatToSink.numHits === targetBoatLength){
                boatToSink.coordinates.forEach((item) => {
                    targetBoard[item[0]][item[1]] = new BoatSegment(STATUS_SUNK, targetBoatLength, [SQUARE_CLASS, SQUARE_SUNK_CLASS])
                });
                boatToSink.status = STATUS_SUNK;
                message = `You sunk their ship #${targetBoatLength}!!`

                if(!boatsSunk.has(targetBoatLength)){
                    boatsSunk.add(targetBoatLength)
                 }

                 winner = true; //checkwin
                 for(let i=1;i<7;i++){
                     if(!boatsSunk.has(i)){
                        winner = false;
                     }
                 }

            } else { //check hit
                targetBoard[coords[0]][coords[1]] = new BoatSegment(STATUS_HIT, targetBoatLength, [SQUARE_CLASS, SQUARE_HIT_CLASS])
                boatToSink.status = STATUS_HIT;
                message = `Nice hit on boat #${targetBoatLength}!! Good guessing.`
            }

            //putting target boat back into the array
            hiddenBoats[targetBoatLength - 1] = boatToSink;

        } else if(squareClicked.status === NO_STATUS){ //check miss
            targetBoard[coords[0]][coords[1]] = new SquareSegment(STATUS_MISS, targetBoatLength, [SQUARE_CLASS, SQUARE_MISS_CLASS])
            message = `You missed. Better luck next time:)`
        }

        if(winner){
            console.log("WINNER! ", playerGuessing)
            message = `NICE JOB!! YOU WON!!!!!`
        }

        //updating State
        if(this.state.currentPlayer === PLAYER_1){
            this.setState(prevState => {
                let player2 = Object.assign({}, prevState.player2);
                player2.board = targetBoard;
                player2.boats = hiddenBoats;
                player2.boatsSunk = boatsSunk;
                player2.otherPlayerMessage = message;
                player2.numGuesses = newNumGuesses;
                player2.numHits = newNumHits;
                return {player2};
            });
        } else {
            this.setState(prevState => {
                let player1 = Object.assign({}, prevState.player1);
                player1.board = targetBoard;
                player1.boats = hiddenBoats;
                player1.boatsSunk = boatsSunk;
                player1.otherPlayerMessage = message;
                player1.numGuesses = newNumGuesses;
                player1.numHits = newNumHits;
                return {player1};
            });
        }

        if(winner){
            console.log(winner);
            let newDisplayWinner = "block";
            let newWinnerText = `Congratulations ${playerName}!`
            this.setState({displayWinner: newDisplayWinner})
            this.setState({winnerText: newWinnerText})
        }

        //switchPlayerGuessing
        this.handleAdvancePlayer()
    }

    //this is handling the change of the length of boat being placed in the boatselector.js component.
    handleSetBoatToPlace (boat){
        let boatBeingPlacedLength;
        //checking if a number or html element was passed in
        if(isNaN(boat)){
            let map = boat.target.attributes;
            if(map.length > 1){
                boatBeingPlacedLength = Number(map.boatlength.value);
            }
        } else {
            boatBeingPlacedLength = Number(boat);
        }

        this.setState(() => ({boatBeingPlacedLength: boatBeingPlacedLength}));
        //change html to show that the specific boat is being placed;
        const selectorElement = document.getElementById(`boat${boatBeingPlacedLength}-selector`);
        selectorElement.classList.add('boat-selector-active');

        for(let i=1;i<7;i++){
            if(i !== boatBeingPlacedLength){
                let tempElement = document.getElementById(`boat${i}-selector`);
                if(tempElement){
                    if(tempElement.classList){
                        tempElement.classList.remove(`boat-selector-active`);
                    }
                }
            }
        }
    }

    handleAxisPlacementChange (axis) {
        let newAxis = axis.target.attributes.value.value;
        this.setState(()=> ({placementAxis: newAxis}))
    }

    handleResetSetup (){
        let newBoard = setUpBoard();
        let newBoats = setUpBoats();
        let newLength = 1;
        let newErrorMessage = "";
        this.setState({tempboatCoords: []});
        this.setState({boatBeingPlacedLength: newLength})
        this.setState({boatsAlreadyPlaced: new Set()})
        this.updateBoard(newBoard);
        this.updateBoats(newBoats);
        this.setState({errorMessage: newErrorMessage});
    }

    //updateBoard helper function
    updateBoard (newBoard){
        if(this.state.currentPlayer === PLAYER_1){
            this.setState(prevState => {
                let player1 = Object.assign({}, prevState.player1);
                player1.board = newBoard;
                return {player1};
            })
        } else if (this.state.currentPlayer === PLAYER_2){
            this.setState(prevState => {
                let player2 = Object.assign({}, prevState.player2);
                player2.board = newBoard;
                return {player2};
            })
        }
    }

    updateBoats (newBoats){
        if(this.state.currentPlayer === PLAYER_1){
            this.setState(prevState => {
                let player1 = Object.assign({}, prevState.player1);
                player1.boats = newBoats;
                return {player1};
            })
        } else if (this.state.currentPlayer === PLAYER_2){
            this.setState(prevState => {
                let player2 = Object.assign({}, prevState.player2);
                player2.boats = newBoats;
                return {player2};
            })
        }
    }


    render () {
        return (
            <div className="game-container">
                <Router>
                    <Switch>
                        <Route path="/play">
                            <Play
                                player1={this.state.player1}
                                player2={this.state.player2}
                                player2Name={this.state.player2.name}
                                player1Name={this.state.player1.name}
                                currentPlayer={this.state.currentPlayer}
                                guessClick={(square) => {this.handleGuessClick(square)}}
                            >
                            </Play>
                            <WinnerOverlay
                                displayWinner={this.state.displayWinner}
                                winnerText={this.state.winnerText}
                            ></WinnerOverlay>
                        </Route>
                        <Route path="/">
                        {/* <div className="center setup-heading">{this.state.currentPlayer}</div> */}
                            <div className="row">
                                <Landing onBlur={this.handleStartSetup}
                                    currentPlayer={this.state.currentPlayer}
                                    onClick={this.handleAdvanceToSetup}
                                    errorMessage={this.state.errorMessage}
                                    />
                                <Setup
                                    player1={this.state.player1}
                                    player2={this.state.player2}
                                    onMouseOver={(square) => {this.handlePlaceBoatHover(square)}}
                                    onMouseOut={(square) => {this.handlePlaceBoatHoverOut(square)}}
                                    boatSelectorClick={(boat) => {this.handleSetBoatToPlace(boat)}}
                                    axisPlacementClick={(axis) => {this.handleAxisPlacementChange(axis)}}
                                    squareSelectorClick={(square) => {this.handlePlaceBoatClick(square)}}
                                    resetClick={this.handleResetSetup}
                                    advanceToPlay={this.handleAdvanceToPlay}
                                    advanceToNextPlayer={this.handleAdvanceToNextPlayer}/>
                            </div>

                        </Route>
                    </Switch>
                </Router>

            </div>
        );
    }
}

export default Game;

