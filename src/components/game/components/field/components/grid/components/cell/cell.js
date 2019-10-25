import React from 'react';
import './cell.css';

const units = {
    'snake': {backgroundColor: 'red', borderColor: 'red'},
    'apple': {backgroundColor: 'green', borderRadius: '100%', borderColor: 'transparent'},
    0: {backgroundColor: 'transparent', opacity: '0.2',},
}

const Cell = ({val})=>{

    const style = units[val];
    //console.log(style, units, val, units[val]);
    return (
        <div style={style} className="cell">
            <div style={style}></div>
        </div>
    );
}

export default Cell;