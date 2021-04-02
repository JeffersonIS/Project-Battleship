import React from 'react';
import '../styles/index.css';


function Landing (props) {

    let id, nameLabel, label;

    if(props.currentPlayer === "player1"){
        id = "p1";
        nameLabel = props.currentPlayer;
        label = "Player 1: "
    } else {
        id = "p2";
        nameLabel = props.currentPlayer;
        label = "Player 2: "
    }

    return (
        <div className="center landing column" style={{border: "none"}}>
            <p className="landing-error">{props.errorMessage}</p>
            <label ><strong>{label}</strong></label>
            <input id={id} type="text" placeholder="enter name" name={nameLabel} onBlur={props.onBlur}></input>
            <br></br>
            <br></br>
            <div>Instructions:</div>
            <p>Hover over the map and click the square where you want to place your boat. <i>Make sure the other player does not peak!</i></p>
                <p>You can clear your boats if you want to re-position them.</p>
               <p> Use the vertical/horizontal selector to place your boat either veritcally or horizontally.</p>
               <p>Click 'Next Player' for the next player to set their boats, then PLAY!</p>

        </div>
    )
}

export default Landing;