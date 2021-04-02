import React from 'react';
import BoatsStatusBar from './boatsstatusbar'
import PlayerMessage from './playermessage'
import BoardPlay from './boardplay'
import GameStats from './gamestats'
import { useState } from 'react'
import '../styles/index.css';


function PlayContainer (props) {

    //setting overlay variable based on current player
    let overlay, overlayText;
     if(props.currentPlayer === props.player.id){
        overlay = "player-overlay";
        overlayText = "Wait for next player's move."
     } else {
        overlay = "";
        overlayText = "";
     }

     let nameTag;
     props.player.id === "player1" ? nameTag = props.player2Name : nameTag = props.player1Name;

    return (
        <div style={{position: "relative"}}>
            <div className="player-name-tag">{nameTag}</div>
            <PlayerMessage  message={props.player.otherPlayerMessage}></PlayerMessage>
            <BoatsStatusBar boats={props.player.boats}></BoatsStatusBar>
            <BoardPlay
                board={props.player.board}
                overlay={overlay}
                guessClick={props.guessClick}
                overlayText={overlayText}
                player={props.player}
            ></BoardPlay>
            <GameStats
                player={props.player}
            ></GameStats>
        </div>
    )
}

export default PlayContainer;