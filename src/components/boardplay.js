import React from 'react';
import SquarePlay from './squareplay'
import '../styles/index.css';


function BoardPlay (props) {
    const myBoard = props.board.map((rowArray, rowIndex) =>{
        return (
            <div className="board-row" key={rowIndex}
            >{rowArray.map((square, columnIndex) => {
                return (
                    <SquarePlay
                        key={rowIndex,columnIndex}
                        // onMouseOver={this.props.onMouseOver}
                        // onMouseOut={this.props.onMouseOut}
                        square={square}
                        coords={[rowIndex,columnIndex]}
                        overlay={props.overlay}
                        onClick={props.guessClick}
                        ></SquarePlay>
                )
            })}</div>
        );
    })

    return(
        <div className="center">
            <div className="board-container">
                {myBoard}
                <div className={props.overlay}>
                    <div className="player-overlay-text">{props.overlayText}</div>
                </div>
            </div>
        </div>
    );
}

export default BoardPlay;


{/* <div className="center">
<div className="board-container">
    <div className="board-shadow">
    {myBoard}
        <div className={props.overlay}>
            <div className="player-overlay-text">{props.overlayText}</div>
        </div>
    </div>
    <GameStats
    player={props.player}
></GameStats>
</div>
</div> */}