import React, {useContext} from 'react';
import './field.css';


import FieldHeader from './components/header/header';
import Grid from './components/grid/grid';
import Modal from '../../../modal-window/modal-window';
import GameOver from '../game-over/game-over';
import {GameContext} from '../../context/game-context';

const Field = ()=>{
    const {isGameOver} = useContext(GameContext);

    return (
        <div className="fieldRoot">
            <Modal isOpen={isGameOver} modalContainerStyle={{backgroundColor: '#404040'}}>
                <GameOver />
            </Modal>
            <FieldHeader />
            <Grid />
        </div>
    );
}

export default Field;