import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal';
import { useContext } from 'react'
import { TodoContext } from '../store/globalContext';


export default function ItemCard({ task, onClickEdit, ...attrs }) {
    const items = useContext(TodoContext);

    const handleEditAction = () => {
        onClickEdit(task.id);
    }
    const handleDelete = (event) => {
        event.preventDefault();
        items.dispatchTodoItems({
            type: 'DELETE', payload: { itemId: task.id }
        });
    }
    return (
        <div className="card max-w-sm bg-neutral text-neutral-content text-left">
            < div className="card-body" >
                <h2 className="card-title line-clamp-1 ">{task.title}</h2>
                <p className="line-clamp-3 ">{task.description}</p>
                <div className="card-actions justify-end ">
                    <button className="btn" onClick={handleEditAction}>Edit</button>
                    <button className="btn" onClick={handleDelete} >Delete</button>
                </div>
            </div >
        </div >
    )
}
