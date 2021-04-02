import React from 'react';
import '../styles/index.css';

class SquareSegment {
    constructor(status = "empty", boatLength = 0, classlist = ["square"]){
        this.status = status;
        this.boatLength = boatLength;
        this.classlist = classlist;
    }
}

export default SquareSegment;

