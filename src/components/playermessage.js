import React from 'react';
import '../styles/index.css';

function PlayerMessage (props) {

    return (
        <div className="player-message">{props.message}</div>
    )
}

export default PlayerMessage;