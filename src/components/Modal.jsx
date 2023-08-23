import { v4 as uuidv4 } from 'uuid';
import React, { useContext, useRef, useState, useEffect } from 'react'
import { TodoContext } from '../store/globalContext';
import TimeSelector from './TimeSelector';


export default function Modal({ content, data,timer, handleClose,handleStorage,...attrs }) {
    const [title, setTitle] = useState(data?.at(1));
    const [description, setDescription] = useState(data?.at(2));
    const [duration, setDuration] = useState(data?.at(4)||{minutes:0,seconds:0});

    const titleRef = useRef(null);

    const updateTitle = (event) => {
        setTitle(event.target.value);
    }
    const updateDescription = (event) => {
        setDescription(event.target.value)
    }
    const handleAdd = (event) => {
        event.preventDefault();
        let new_id= Date.now();
        if(timer){
            localStorage.setItem(new_id,JSON.stringify([new_id, title, description,'timer',duration.minutes,duration.seconds]));
        }
        else{
            localStorage.setItem(new_id,JSON.stringify([new_id, title, description,'todo']));
        }
        handleStorage()
        titleRef.current="";
        setTitle('');
        setDescription('');
        handleClose();
    }
    const handleUpdate = (event) => {
        event.preventDefault();
        if(timer){
            localStorage.setItem(data[0],JSON.stringify([data[0],  title||data[1]  , description||data[2],"timer",duration.minutes,duration.seconds]));
        }
        else{
            localStorage.setItem(data[0],JSON.stringify( [data[0], title||data[1]  , description||data[2],data[3] ]));
        }
        handleStorage()
        setTitle('');
        setDescription('');
        handleClose();
    }
    return (
        <>
            <form className="modal-box flex flex-col justify-center" onSubmit={data ? handleUpdate : handleAdd}>
                <h3 className="font-bold text-lg mx-auto mb-5">{timer ?"Add Task To Queue":"Add Task"}</h3>

                <label htmlFor="description" className='mb-3'>Title  : </label>
                {data ? <input type="text" onChange={updateTitle} id="title" placeholder="Type title" className="input input-bordered input-md w-full" value={title||data[1]} /> : <input type="text" onChange={updateTitle} id="title" placeholder="Type title" className="input input-bordered input-md w-full " value={title} />}

                <label htmlFor="description" className='mb-3 mt-3'>Description  : </label>
                {data ? <textarea onChange={updateDescription} id='description' className="textarea textarea-bordered" placeholder="Type description" value={description||data[2]} ></textarea> : <textarea onChange={updateDescription} className="textarea textarea-bordered" id='description' placeholder="Type description" value={description}></textarea>}
                
                {timer &&
                <>
                <label htmlFor="Duration" className='mb-3 mt-3 flex flex-row gap-2'>Duration  : <p className='text-warning'>(add the duration of this task)</p></label>
                <div className="mx-auto"><TimeSelector updateDuration={setDuration}/></div></>
                }
                
                <div className="modal-action flex flex-row gap-5">
                    {data ? <button className='' type='submit' >Update</button> : <button className='' type='submit' >Add</button>}
                    <button type='reset' onClick={handleClose} className='mr-5' >Close</button>
                </div>
            </form>
        </>
    )
}
