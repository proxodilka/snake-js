import React, {useState, useContext, useEffect} from 'react';
import {Options} from '../setup/context/options';
import {GameContext} from './context/game-context';
import GameField from './components/field/field';
import {useControls} from './components/controls/controls';
import {useGame} from './logic';

const Game = ()=>{
    const {gameMode, exitGame} = useContext(Options);

    const [isNewGame, setNewGame] = useState(true);
    const [score, setScore] = useState(0);
    const [isGameOver, setGameOver] = useState(false);

    const increaseScore = (value=1)=>{
        setScore(score+value);
    }

    const gameController = useGame({
        w: 20,
        h: 20,
        isNewGame,
        setNewGame,
        gameMode,
        score,
    });

    const finishGame = ()=>setGameOver(true);
    const retry = ()=>{
        setGameOver(false);
        setNewGame(true);
        setScore(0);
    };

    useControls({
        ...gameController,
        score: {score, increaseScore},
        gameControl: {finishGame},
        isGameOver,
    });

    return (
        <GameContext.Provider value={{
            field: gameController.field,
            score,
            exitGame,
            retry,
            isGameOver,
            game: gameController.game,
        }}>
            <GameField />
        </GameContext.Provider>
    )
}

export default Game;