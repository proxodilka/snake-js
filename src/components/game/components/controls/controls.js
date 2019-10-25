import React, {useContext, useEffect, useRef, useState} from 'react';
import {useInterval} from '../../../../hooks/useInterval';
import {useListener} from '../../../../hooks/useListener';

const LEFT_ARROW = 37,
      UP_ARROW = 38,
      RIGHT_ARROW = 39,
      DOWN_ARROW = 40;


const useControls = (ControlContext)=>{

    const {
        snake:{snake, setSnake},
        field:{fieldSize}, 
        apples:{appleCoords, setAppleCoords}, 
        score:{increaseScore},
        gameControl:{finishGame},
        isGameOver,
        game:{speed, withBounds}
    } = ControlContext;

    const endGame = ()=>{
        console.log('finish game');
        finishGame();
        pauseInterval();
    }

    const move = ()=>{

        const nextDirrection = {...snake.dirrection};
        const oldHeadPosition = {...snake.coords[snake.coords.length-1]};

        const nextHeadPosition = {
            x: (oldHeadPosition.x+nextDirrection.x),
            y: (oldHeadPosition.y+nextDirrection.y)
        };


        if (nextHeadPosition.x<0) {
            if (!withBounds)
                nextHeadPosition.x=fieldSize.w-1;
            else{
                endGame();
                return;
            }  
        }

        if (nextHeadPosition.y<0) {
            if (!withBounds)
                nextHeadPosition.y=fieldSize.h-1;
            else{
                endGame();
                return;
            }
        }

        if (nextHeadPosition.x>=fieldSize.w) {
            if (!withBounds)
                nextHeadPosition.x%=fieldSize.w;
            else{
                endGame();
                return;
            }  
        }

        if (nextHeadPosition.y>=fieldSize.h) {
            if (!withBounds)
                nextHeadPosition.y%=fieldSize.h;
            else{
                endGame();
                return;
            }  
        }

        const {gonnaGrow} = snake;

        setSnake({
            ...snake,
            coords: [...snake.coords.slice((gonnaGrow?0:1), snake.coords.length), nextHeadPosition],
            gonnaGrow: false,
        });
    }

    useEffect(()=>{
        const head = snake.coords[snake.coords.length-1];
        if (!snake.gonnaGrow){             
            const appleIndex = appleCoords.findIndex(apple=>apple.x==head.x && apple.y==head.y);
            const apple = appleCoords[appleIndex];
            if (apple){
                growSnake();
                increaseScore();
                setAppleCoords(
                    [...appleCoords.slice(0, appleIndex-1),
                    ...appleCoords.slice(appleIndex+1),
                    {
                        x: Math.floor(Math.random()*1000)%fieldSize.w,
                        y: Math.floor(Math.random()*1000)%fieldSize.h
                    }]
                );
            }
        }

        const collision = snake.coords.slice(0, snake.coords.length-2).find(el=>el.x==head.x && el.y==head.y);
        if (collision!=null){
            endGame();
        }

    }, [snake]);

    const growSnake = ()=>{
        setSnake({
            ...snake,
            gonnaGrow: true,
        })
    }

    const changeDirrection = (newDirrection)=>{
        let nextDirrection = {};
        
        switch (newDirrection){
            case 'down': {
                nextDirrection = {x: 1, y: 0};
                break;
            }
            case 'up': {
                nextDirrection = {x: -1, y: 0};
                break;
            }
            case 'left': {
                nextDirrection = {x: 0, y: -1};
                break;
            }
            case 'right': {
                nextDirrection = {x: 0, y: 1};
                break;
            }
        }

        if (Math.abs(nextDirrection.x)==Math.abs(snake.dirrection.x) || Math.abs(nextDirrection.y)==Math.abs(snake.dirrection.y)){
            return;
        }

        setSnake({
            ...snake,
            dirrection: nextDirrection
        });
    }

    const {pauseInterval, resumeInterval} = useInterval(move, speed);

    if (!isGameOver){
        resumeInterval();
    }

    const keyPressed = (e)=>{
        console.log('key pressed', snake);
        const keyCode = e.keyCode;
        switch (keyCode){
            case LEFT_ARROW: {changeDirrection('left'); break;}
            case UP_ARROW: {changeDirrection('up'); break;}
            case RIGHT_ARROW: {changeDirrection('right'); break;}
            case DOWN_ARROW: {changeDirrection('down'); break;}
        }
    }

    useListener(keyPressed, window, 'keydown');

    return(
        <>
            <button onClick={()=>changeDirrection('down')}>down</button>
            <button onClick={()=>changeDirrection('up')}>up</button>
            <button onClick={()=>changeDirrection('left')}>left</button>
            <button onClick={()=>changeDirrection('right')}>right</button>
            <button onClick={()=>growSnake()}>grow</button>
        </>
    );
}

export {useControls};