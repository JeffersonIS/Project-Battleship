import React from 'react';
import '../styles/index.css';

function PlayerMessage (props) {

    return (
        <div className="winner-overlay" style={{display:`${props.displayWinner}`}}>
            <div className="winner-overlay-text center">
                {props.winnerText}
                <br></br>
                <span style={{fontSize: "26px", paddingTop: "1em"}}>YOU WON!</span>
                <br></br>
                <br></br>
                <button className="btn btn-reset"
                    onClick={() => {window.history.pushState({}, '','/project-battleship'); window.location.reload()}}>
                Restart Game</button>
            </div>
            </div>
    )
}

export default PlayerMessage;