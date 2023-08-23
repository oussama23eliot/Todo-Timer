import React, { useState } from 'react'
export default function ({updateDuration,...attrs}) {
  const updateMinutes = (event) => {
    handleDuration(event.target.value,null);
  }
  const updateSeconds= (event) => {
    handleDuration(null,event.target.value);

  }
  const handleDuration = (a,b) => {
    updateDuration((prev)=>({...prev,minutes:a||prev.minutes,seconds:b||prev.seconds}));
  }
  return (
    <div className='flex flex-row items-center gap-3'>
        <div className="flex flex-col justify-start">
        <p>Minutes</p>
        <input onChange={updateMinutes} type="number" className='w-12 bg-transparent border rounded-md pl-1 border-white' step="1" max="60" min="0" defaultValue={"00"}/>
        </div>
        <p>:</p>
        <div className="flex flex-col justify-start">
        <p>Seconds</p>
        <input  onChange={updateSeconds} type="number" className='w-12 bg-transparent border rounded-md pl-1 border-white' step="1" max="60" min="0" defaultValue={"00"}/>
        </div>
    </div>
  )
}
