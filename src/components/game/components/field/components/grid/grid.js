import React, {useContext} from 'react';
import {GameContext} from '../../../../context/game-context';
import Cell from './components/cell/cell';
import './grid.css'

const Grid = ()=>{
    const {field: {field}, game:{withBounds}} = useContext(GameContext);
    let style={};
    if (withBounds){
        style = {border: 'solid 2px white'}
    }

    return (
        <div style={style} className="gridRoot">
            {
                field.map(arr=>
                    <div className="fieldRow">{arr.map(x=><Cell val={x} />)}</div>
                )
            }
        </div>
    );
}

export default Grid;