import {useState, useEffect, useRef} from 'react';

const useListener = (callback, object, eventName)=>{
    const cureCallback = useRef();

    useEffect(()=>{
        cureCallback.current = callback;
    })

    useEffect(()=>{
        const eventListener = (e)=>cureCallback.current(e);
        
        object.addEventListener(eventName, eventListener);
        return ()=>object.removeEventListener(eventName, eventListener);
    }, []);
}

export {useListener};