import React from 'react';
import '../styles/index.css';

function PlayerMessage (props) {

    return (
        <div className="center">
            <div className="footer">
                <div>Built by Jefferson Ostler</div>
                <div className="footer-item-container">
                    <span className="footer-item">React.js</span>
                    <a className="footer-item" href="https://www.jeffersonostler.com" target="_blank">jeffersonostler.com</a>
                    <span className="footer-item">BYU MISM</span>
                </div>
            </div>
        </div>
    )
}

export default PlayerMessage;