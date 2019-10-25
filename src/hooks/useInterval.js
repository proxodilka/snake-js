import {useState, useEffect, useRef} from 'react';

const useInterval = (callback, interval)=>{
    const cureCallback = useRef();
    const intervalId = useRef(0);
    const [isIntervalPaused, setIntervalPaused] = useState(false);
    const [prevIntervalValue, setPrevIntervalValue] = useState(interval);

    useEffect(()=>{
        cureCallback.current = callback;

        if (interval!=prevIntervalValue){
            clearInterval(intervalId.current);

            const newIntervalId = setInterval(()=>cureCallback.current(), interval);
            intervalId.current = newIntervalId;
            setPrevIntervalValue(interval);
        }
    })

    useEffect(()=>{
        const newIntervalId = setInterval(()=>cureCallback.current(), interval);
        intervalId.current = newIntervalId;

        return ()=>clearInterval(intervalId.current);
    }, []);

    const pauseInterval = ()=>{
        if (isIntervalPaused)
            return;
        clearInterval(intervalId.current);
        setIntervalPaused(true);
    }

    const resumeInterval = ()=>{
        if (!isIntervalPaused)
            return;
        const newIntervalId = setInterval(()=>cureCallback.current(), interval);
        intervalId.current = newIntervalId;
        setIntervalPaused(false);
    }

    return {
        intervalId: intervalId.current,
        pauseInterval,
        resumeInterval,
    };
}

export {useInterval};