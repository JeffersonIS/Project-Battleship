import React from 'react';
import BoardSetup from './boardsetup';
import BoatSelector from'./boatselector'
import { useState } from 'react';
import { useHistory } from 'react-router';
import '../styles/index.css';

function Setup (props) {
        let player;
        let buttonMessage;
        let buttonEvent;
        const history = useHistory();

        if(props.player1.status === "setup"){
            player = props.player1;
            buttonMessage = "Next Player"
            buttonEvent = props.advanceToNextPlayer;
        } else if (props.player2.status === "setup"){
            player = props.player2;
            buttonMessage = "Play";
            buttonEvent = props.advanceToPlay
        } else{
            //this is the only way I could get it to stop throwing an error when
            //advancing to /play
            player = props.player1;
            history.push('/play');
        }

        return (

            <div className="center column" style={{border: "none"}}>
                {/* <div className="game-header"><b>{player.id}</b> place boats</div> */}
                <BoatSelector
                    boatsArray={player.boats}
                    onClick={props.boatSelectorClick}
                    axisPlacementClick={props.axisPlacementClick}
                    resetClick={props.resetClick}
                    buttonEvent={buttonEvent}
                    buttonMessage={buttonMessage}
                ></BoatSelector>
                <br></br>
                <BoardSetup
                    boardArray={player.board}
                    onMouseOver={props.onMouseOver}
                    onMouseOut={props.onMouseOut}
                    onClick={props.squareSelectorClick}/>
                <br></br>
            </div>
        );
}

export default Setup;