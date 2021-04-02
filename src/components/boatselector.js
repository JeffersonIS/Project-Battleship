import React from 'react';
import SetupOptions from './setupoptions'
import BoatSelectorItem from './boatselectoritem';
import '../styles/index.css';

function BoatSelector (props) {

        const myBoats = props.boatsArray.map((item, count) => {
            let id = `${item.name}-selector`
            let classList = `boat-selector-item boat-selector-${item.status}`
            return (
                <BoatSelectorItem classList={classList}
                    onClick={props.onClick}
                    boatlength={item.length}
                    key={item.name}
                    id={id}
                    length={item.length}
                    boat={item}
                    ></BoatSelectorItem>
            );
        })

        return(
              <div className="boat-selector-container">
                   <SetupOptions
                        axisPlacementClick={props.axisPlacementClick}
                        resetClick={props.resetClick}
                        buttonEvent={props.buttonEvent}
                        buttonMessage={props.buttonMessage}>
                    </SetupOptions>
                    <div>{myBoats}</div>
                </div>


        );

}

export default BoatSelector;