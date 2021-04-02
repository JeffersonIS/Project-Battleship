import React from 'react';
import Board from './boardsetup'
import '../styles/index.css';
import PlayContainer from './playcontainer';

function Play (props) {

    const players = [props.player2,props.player1];

    const boardDisplay = players.map((player, count) => {

        return(
            <div class="column" key={count}>

                <PlayContainer
                    player={player}
                    currentPlayer={props.currentPlayer}
                    guessClick={props.guessClick}
                    player1Name={props.player1Name}
                    player2Name={props.player2Name}
                ></PlayContainer>
            </div>
        );
    });

    return(
        <div class="row center">
            {boardDisplay}
        </div>
    )
}

export default Play;