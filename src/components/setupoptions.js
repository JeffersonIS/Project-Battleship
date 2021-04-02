import React from 'react';
import '../styles/index.css';

function SetupOptions (props) {

    return(
        <div className="setup-options-container">
            <input type="radio" name="axis-placement" id="vertical-axis" value="vertical" defaultChecked={true}
                    onClick={props.axisPlacementClick}></input>
            <label htmlFor="vertical-axis">Vertical</label>

            <input type="radio" name="axis-placement" id="horizontal-axis" value="horizontal"
                    onClick={props.axisPlacementClick}></input>
            <label htmlFor="horizonal-axis">Horizontal</label>

            <div>
                <button className="btn btn-clear-boats"
                        onClick={props.resetClick}>
                Clear Boats</button>
                <button className="btn btn-play"
                        onClick={props.buttonEvent}
                    >{props.buttonMessage}</button>
            </div>

        </div>
    )
}

export default SetupOptions;