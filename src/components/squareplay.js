import React from 'react';
import '../styles/index.css';

const STATUS_HIT = "hit";
const STATUS_MISS = "miss";
const STATUS_SUNK = "sunk";
const STATUS_AFLOAT = "afloat";
const NO_STATUS = "none";

function SquarePlay (props) {
    let value = "";
    const id = `square${props.coords}`
    const square = props.square
    let currentClassList;

    //if square.status === hit, miss or sunk
        //then display 'square square.status' as class
        //and disable onMouseOver, onMouseOut and onClick
            //if miss, then value = X

    if(square.status === STATUS_HIT || square.status === STATUS_MISS || square.status === STATUS_SUNK){
        currentClassList = `${square.classlist[0]} ${square.classlist[1]}`;
    } else {
        currentClassList = square.classlist[0];
    }

    if(square.status === STATUS_MISS){
        value = 'x';
    }

    //if square.status === active or none
        //then display class only as 'square'
        //and enable onClick, onMouseOver, onMouseOut


    return(
        <div
            id={id}
            className={currentClassList}
            coords={props.coords}
            onClick={props.onClick}
            // onMouseOver={}
            // onMouseOut={}
        >{value}</div>
    );

}

export default SquarePlay;
