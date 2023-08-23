import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal';
import { useContext } from 'react'
import { TodoContext } from '../store/globalContext';


export default function ItemCard({ task, onClickEdit,handleStorage, ...attrs }) {

    const handleEditAction = () => {
        onClickEdit(task[0]);
    }
    const handleDelete = (event) => {
        event.preventDefault();
        localStorage.removeItem(task[0]);
        handleStorage()
    }
    const handleDone = (event) => {
        event.preventDefault();
        localStorage.setItem(task[0],JSON.stringify( [task[0], task[1]  , task[2] , "done"]));
        handleStorage()
    }
    const handleDuration = (event) => {
        event.preventDefault();
        onClickEdit(task[0],true);
    }
    return (
        <div className="card  max-w-sm bg-neutral text-neutral-content text-left">
            <div className="card-body indicator w-full">
                {task[3]=="done"&&<span className="indicator-item badge p-4 text-white-500 bg-green-800">Done</span>}
                <h2 className="card-title line-clamp-1 ">{task[1]}</h2>
                <p className="line-clamp-3 ">{task[2]}</p>
                <div className="card-actions flex flex-row justify-end ">
                    {task[3]=="todo"&&
                        <div className="lg:tooltip tooltip-info" data-tip="Mark as Done">
                        <button  onClick={handleDone} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>
                        </div>
                    }
                    <div className="lg:tooltip tooltip-info" data-tip="Edit Task">
                    <button  onClick={handleEditAction}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                    </div>
                    <div className="lg:tooltip tooltip-info" data-tip="Delete Task">
                    <button  onClick={handleDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                    </div>
                    <div className="lg:tooltip tooltip-info" data-tip="Add To Timer">
                    {task[3]!="timer"&&<button  onClick={handleDuration}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>}
                    </div>
                </div>
            </div >
        </div >
    )
}
