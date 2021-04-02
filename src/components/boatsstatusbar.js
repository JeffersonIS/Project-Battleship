import React from 'react';
import BoatSelectorItem from './boatselectoritem'
import '../styles/index.css';


function BoatsStatusBar (props) {

    const statusBar = props.boats.map((boat) => {
        let classList = `boat-status-bar-item boat-selector-${boat.status}`

        return(
            <BoatSelectorItem
                boat={boat}
                classList={classList}
                key={boat.name}
            ></BoatSelectorItem>
        );
    });

    return (
        <div className="boat-status-bar">
           {statusBar}
        </div>
    )
}

export default BoatsStatusBar;