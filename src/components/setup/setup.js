import React, {useState} from 'react';
import Game from '../game/game';
import GameHeader from './components/game-header/game-header';
import {SetupOptions, Options} from './context/options';
import './setup.css';

const gameModeList = [
    {id: 1, title: 'Easy', active: false, alias: 'easy'},
    {id: 2, title: 'Medium', active: true, alias: 'medium'},
    {id: 3, title: 'Hard', active: false, alias: 'hard'},
];

const Setup = ()=>{
    const [CurrentGameMode, setGameMode, gameModes] = useGameModes(gameModeList);
    const [gameStarted, setGameStarted] = useState(false);

    return(
    <>
         
        {!gameStarted?
            <SetupOptions.Provider value={{gameModes, setGameMode, startGame: ()=>setGameStarted(true)}}>
                <GameHeader />
            </SetupOptions.Provider>
            :
            <Options.Provider value={{gameMode: CurrentGameMode, exitGame: ()=>setGameStarted(false)}}>
                <Game />
            </Options.Provider>
        }
    </>
    );
}

const useGameModes = (gameModesList)=>{

    const [gameModes, setGameModes] = useState(gameModesList);

    const setGameMode = (id)=>{
        setGameModes([
            ...gameModes.map(gameMode=>{
                return {
                    ...gameMode,
                    active: gameMode.id==id,
                };
            })
        ]);
    }

    const getActiveGameMode = ()=>{
        return gameModes.find(gameMode=>gameMode.active);
    }

    return [getActiveGameMode(), setGameMode, gameModes];

}

export default Setup;