import React, { useState,useEffect, useContext } from 'react'

import {  TodoContext } from '../store/globalContext';

let timerId=null;
export default function BaseTimer({tasks,playQueue,handleStorage,startIndex,setStartIndex,...attrs}) {
  const timertasks = useContext(TodoContext);
  const [timeRemaining, setTimeRemaining] = useState({minutes:timertasks.todoItems[4],seconds:timertasks.todoItems[5]});
  const [isPausing, setIsPausing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isStopped, setStopped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(startIndex+1);

  const [progress, setProgress] = useState(100)
  const resumeTimer=()=>{ 
    startTimer();
    setIsPausing(false);
  }
  const pauseTimer=()=>{
    clearInterval(timerId)
    setIsPausing(true);
  }
  const stopTimer=()=>{
    setTimeRemaining(prev=>({...prev,minutes:timertasks.todoItems[4],seconds:timertasks.todoItems[5]}));
    setIsPausing(true);
    // setHasStarted(false);
    // setStopped(true);
    clearInterval(timerId)
    timerId=null;
  }
  useEffect(()=>{
    setTimeRemaining(prev=>({...prev,minutes:timertasks.todoItems[4],seconds:timertasks.todoItems[5]}));
    if(!isPausing)
    setTimeRemaining(prev=>({...prev,minutes:timertasks.todoItems[4],seconds:timertasks.todoItems[5]}));
    if(tasks.length>1&&playQueue&&currentIndex<tasks.length){
      timertasks.dispatchNextItems({'type':"ADD","payload": tasks[currentIndex]})
    }
    else{
      timertasks.dispatchNextItems({'type':"ADD","payload": ["None",  "None",  "", "timer", "--","--"]})
    }
  },[timertasks.todoItems,tasks,isStopped,currentIndex,playQueue]);
  useEffect(()=>{
    setCurrentIndex(startIndex+1);
    setTimeRemaining(prev=>({...prev,minutes:timertasks.todoItems[4],seconds:timertasks.todoItems[5]}));
  },[startIndex])
  const handleQueue=()=>{
    if((currentIndex<=tasks.length)&&playQueue&&!isStopped&&timeRemaining.minutes==0&&timeRemaining.seconds==0&&timerId){
      setCurrentIndex(prev => prev + 1)
    }
  }
  const handleNext=()=>{
    setStartIndex(prev => prev + 1 )
    timertasks.dispatchTodoItems({'type':"ADD","payload": tasks[currentIndex]})
    stopTimer()
  }
  const handlePrevious=()=>{
    setStartIndex(prev => prev - 1 )
    timertasks.dispatchTodoItems({'type':"ADD","payload": tasks[startIndex -1]})
    stopTimer()
  }
  useEffect(()=>{
    handleQueue()
    if(timeRemaining.minutes==0&&timeRemaining.seconds==0&&!isStopped){
      setIsPausing(false);
      setHasStarted(false);
      clearInterval(timerId)
        if(playQueue&&!isStopped){
          if(currentIndex>=tasks.length){return;}
          else{
          timertasks.dispatchTodoItems({'type':"ADD","payload": tasks[currentIndex]})
          setTimeRemaining(prev=>({...prev,minutes:timertasks.todoItems[4],seconds:timertasks.todoItems[5]}));  
          resumeTimer();
          setIsPausing(false);
          setHasStarted(true);
          }
        }
    }
    handleProgress();
  },[timeRemaining])
  const startTimer=()=>{
    setIsPausing(false);
    setHasStarted(true);
    timerId = setInterval(()=>{
    setTimeRemaining(prev=>({
        ...prev,
        minutes : prev.minutes>0&&prev.seconds==0 ? prev.minutes -  1 : prev.minutes==0? 0 : prev.minutes,
        seconds : prev.minutes>=0&&prev.seconds>0 ? prev.seconds -  1 : prev.seconds==0? prev.minutes==0 ? 0 : prev.seconds + 59  : 0 ,
    }))
    },1000)
  }
  const handleProgress=()=>{
    setProgress(Math.floor(((parseInt(timeRemaining.minutes)+parseInt(timeRemaining.seconds)/60)/(parseInt(timertasks.todoItems[4])+parseInt(timertasks.todoItems[5])/60))*100))
  }
  return (
        <div className="w-5/6 sm:w-full  flex flex-col items-center mr-3 ml-3">
                <div className="w-full flex flex-row items-left justify-between">
                    <div>
                    <p className='label-text text-gray-500'>Up Next : <span className='text-xl font-semibold'>{timertasks.nextItems[1]}</span></p>
                    <p className='label-text-alt text-gray-500'>Duration : <span className='label-text text-gray-500'>{timertasks.nextItems[4]}:{timertasks.nextItems[5]}</span></p>
                    <h1 className='text-3xl'>{timertasks.todoItems[1]}</h1>
                    </div>
                    <div className="w-fit flex flex-col-reverse  justify-center sm:flex-row items-center gap-4 sm:gap-8">
                        <span className="countdown text-center font-semibold text-4xl ">
                            <span style={{"--value":timeRemaining.minutes}}></span>:
                            <span style={{"--value":timeRemaining.seconds}}></span>
                        </span>
                        <div className='flex flex-row gap-2 justify-center'>
                        <button disabled={currentIndex<=1} onClick={handlePrevious}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={currentIndex>1?"w-5 h-5":"w-5 h-5 text-gray-500"}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
                        </svg>
                        </button>
                        {isPausing||!hasStarted ?
                            <button onClick={resumeTimer}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                            </svg>
                            {/* I> */}
                            </button>
                            :<button onClick={pauseTimer}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                            </svg>
                            {/* || */}
                            </button>
                             
                        }
                        <button onClick={stopTimer}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                        </svg>
                        </button>
                        <button disabled={currentIndex>tasks.length-1} onClick={handleNext}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={currentIndex<=tasks.length-1?"w-5 h-5":"w-5 h-5 text-gray-500"}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                        </svg>
                        </button>
                        </div>
                    </div>
                </div>
                <progress className="progress progress-primary w-full mt-4" value={progress} max="100"></progress>
        </div>
  )
}
