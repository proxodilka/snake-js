import React, {useState, useContext} from 'react';
import './header.css';
import {GameContext} from '../../../../context/game-context';

const Header = ()=>{

    const {score, exitGame} = useContext(GameContext);

    return (
        <div className="headerRoot">
            <div className="statusRow">
                <div className="score">score: {score}</div>
                <div className="buttonsContainer">
                    <button className="btn btn-danger" onClick={()=>exitGame()}>exit</button>
                </div>
            </div>
        </div>
    );
}

export default Header;