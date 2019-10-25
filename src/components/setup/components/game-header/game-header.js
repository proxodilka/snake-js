import React, {useRef, useState, useContext} from 'react';
import {SetupOptions} from '../../context/options';
import './game-header.css';

import SearchFilter from '../search-filter/search-filter';

const GameHeader = ()=>{
    const {gameModes, setGameMode, startGame} = useContext(SetupOptions);

    return(
        <div className="setupRoot">
            <div className="setupTitleRoot">
                <h1>SNAKE</h1>
            </div>

            <div className="settingsRoot">
                <button className="btn btn-success" onClick={()=>startGame()}>PLAY!</button>
                <SearchFilter style={{marginTop: '10px'}} options={gameModes} onChange={setGameMode}/>
            </div>
        </div>
    );
}

export default GameHeader;