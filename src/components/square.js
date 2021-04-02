import React from 'react';
import '../styles/index.css';

function Square (props) {

    let id = `square${props.coords}`
    let activeClassList;
    let nonActiveClassList;
    let currentClassList;

    if(props.square.boatLength){
        currentClassList = props.square.classlist;
        if(currentClassList.length > 0){
            activeClassList = "";
            for(let i=0; i<currentClassList.length; i++){
                activeClassList += `${currentClassList[i]} `;
            }
        }
        return(
            <div
                className={activeClassList}
                id={id}
                onMouseOver={props.onMouseOver}
                onMouseOut={props.onMouseOut}
                coords={props.coords}
                onClick={props.onClick}
                >
                </div>
        );
    } else {
        nonActiveClassList = props.square.classlist[0];
        return(
            <div
                className={nonActiveClassList}
                id={id}
                onMouseOver={props.onMouseOver}
                onMouseOut={props.onMouseOut}
                coords={props.coords}
                onClick={props.onClick}
                ></div>
        );
    }
}

export default Square;
