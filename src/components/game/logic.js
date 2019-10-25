import React, {useEffect, useState} from 'react';

const getField = (fieldSize, snakeCoords, appleCoords)=>{
    const result = [];

    for(let i=0; i<fieldSize.h; i++){
        result.push(Array(fieldSize.w).fill(0));
    }

    snakeCoords.forEach(({x,y}) => {
        result[x][y]='snake';
    });

    appleCoords.forEach(({x,y})=>{
        result[x][y]='apple';
    });

    return result;
}

const useGame = ({w, h, snakeStartLength=3, isNewGame, setNewGame, gameMode, score})=>{
    const fieldSize = {w, h};
    const minSpeed = 50;

    const initialSnakeValue = {
        coords: Array(snakeStartLength).fill(0).map((el, ind)=>{
            return {x: Math.round(w/2)-snakeStartLength+ind, y: Math.round(h/2)};
        }),
        dirrection: {x: 1, y: 0},
        gonnaGrow: false,
    },

    initialAppleValue = [{
        x: Math.floor(Math.random()*1000)%fieldSize.w,
        y: Math.floor(Math.random()*1000)%fieldSize.h
    }],

    initialSpeedValue = gameMode.alias=='hard'?80:100;
    const allowToChangeSpeed = gameMode.alias=='hard';
    const withBounds = gameMode.alias!='easy';

    useEffect(()=>{
        console.log('score changed');
        if (allowToChangeSpeed && score%5==0 && score!=0){
            console.log('speed changed', score);
            const newSpeedValue = speed-10;
            setSpeed( newSpeedValue<minSpeed?minSpeed:newSpeedValue );
        }
    }, [score]);
    


    const [snake, setSnake] = useState(initialSnakeValue);

    const [appleCoords, setAppleCoords] = useState(initialAppleValue);

    const [speed, setSpeed] = useState(initialSpeedValue);

    const field = getField(fieldSize, snake.coords, appleCoords);

    if (isNewGame){
        setSnake(initialSnakeValue);
        setAppleCoords(initialAppleValue);
        setSpeed(initialSpeedValue);
        setNewGame(false);
    }

    return {
        field:{
            field,
            fieldSize,
        },

        snake:{
            snake,
            setSnake,
        },

        apples:{
            appleCoords,
            setAppleCoords,
        },

        game:{
            speed,
            withBounds,
        }
    };
}

export {useGame};