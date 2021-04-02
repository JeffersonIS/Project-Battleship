import React from 'react';
import Square from './square'
import '../styles/index.css';

class BoardSetup extends React.Component {
    constructor(props){
        super(props)
    }

    render(){

        //Building out the board with JSX
        const myBoard = this.props.boardArray.map((rowArray, rowIndex) =>{
            return (
                //NEEDSWORK: Needs a key property

                <div className="board-row" key={rowIndex}
                >{rowArray.map((squareValue, columnIndex) => {
                    return (
                        <Square
                            key={rowIndex,columnIndex} //kind of just put this here. Not sure if there will be errors in the
                            onMouseOver={this.props.onMouseOver}
                            onMouseOut={this.props.onMouseOut}
                            square={squareValue}
                            coords={[rowIndex,columnIndex]}
                            onClick={this.props.onClick}
                            ></Square>
                    )
                })}</div>
            );
        })

        return(
            <div className="center">
                <div className="board-container">{myBoard}</div>
            </div>
        );
    }
}

export default BoardSetup;