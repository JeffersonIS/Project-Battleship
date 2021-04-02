import React from 'react';
import '../styles/index.css';

const POSSIBLE_HITS = 21;

function GameStats (props) {
    let numGuesses = props.player.numGuesses;
    let numHits = props.player.numHits;
    let numMisses = numGuesses - numHits
    let hitPercentage;
    let colorHitClass;
    let colorPercentClass;
    let size = props.player.boatsSunk.size;

    numGuesses === 0 ? hitPercentage = 0 : hitPercentage = Math.round((numHits/numGuesses)*100);

    numHits > 0 ? colorHitClass = "green" : colorHitClass = "red";
    if(hitPercentage > 45){
        colorPercentClass = "rgb(0, 192, 0)";
    } else if (hitPercentage > 20){
        colorPercentClass = "orange";
    } else {
        colorPercentClass = "red";
    }

    return (
        <div className="game-stats-container">
            <span className="game-stat-item">Hits: <span style={{color:`${colorHitClass}`}}>{numHits}</span>/{POSSIBLE_HITS}</span>
            <span className="game-stat-item" >Misses: {numMisses}</span>
            <span  className="game-stat-item">Hit Percentage: <span style={{color:`${colorPercentClass}`}}>{hitPercentage}</span>%</span>
            <span  className="game-stat-item">Sinks: {size}</span>

        </div>
    )
}
export default GameStats;