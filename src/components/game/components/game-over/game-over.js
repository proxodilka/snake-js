import React, {useContext} from 'react';
import './game-over.css';
import {GameContext} from '../../context/game-context';

const GameOver = ()=>{
    const {exitGame, retry, score} = useContext(GameContext);

    return (
        <div className="gameOverRoot">
            <div className="scoreTitle">
                Your score is: {score}
            </div>
            <div className="highscoreTitle">
                New highscore!
            </div>
            <div className="gameOverButtonsRow">
                <button onClick={()=>retry()}className="btn btn-success">Retry</button>
                <button onClick={()=>exitGame()}className="btn btn-danger">Main menu</button>
            </div>
        </div>
    );
}

export default GameOver;