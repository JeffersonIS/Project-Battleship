import React from 'react';
// import Landing from './landing'
// import SetUp from './setup'
import Game from './game'
import Header from './header'
import Footer from './footer'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import '../styles/index.css';

function App () {

    return (
        <div>
            <Header></Header>
            <Game></Game>
            <Footer>Hello</Footer>
        </div>
    )
}

export default App;
