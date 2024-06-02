import React, { useState,useRef } from 'react'
import ResultModal from './ResultModal';

function TimerChallenge({title, targetTime}) {
    
    const timer = useRef();
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    function handleStart(){
        timer.current = setInterval(()=>{
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining-10);
        },10)
    }
    if(timeRemaining <= 0){
        clearInterval(timer.current);
        setTimeRemaining(targetTime * 1000)
        dialog.current.open();
    }
    function handleReset(){
        setTimeRemaining(targetTime * 1000)
    }

    function handleStop(){
        clearInterval(timer.current)
    }

    return (
        <>
        <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/>
        <section className='challenge'>
            <h2>{title}</h2>
            <p className='challenge-time'>
                {targetTime} Second{targetTime > 1 ? 's' : ''}
            </p>
            <button onClick={timerIsActive? handleStop : handleStart}>
                {timerIsActive? 'Stop' : 'Start'} Challenges
            </button>
            <p className={timerIsActive? 'active' : undefined}>
                {timerIsActive? 'Time is running...' : 'Timer inactive'}
            </p>
        </section>
        </>

    )
}

export default TimerChallenge
