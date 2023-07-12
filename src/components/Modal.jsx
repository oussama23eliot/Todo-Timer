import { v4 as uuidv4 } from 'uuid';
import React, { useContext, useId, useState, useEffect } from 'react'
import { TodoContext } from '../store/globalContext';


export default function Modal({ content, data, handleClose, ...attrs }) {
    const items = useContext(TodoContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const updateTitle = (event) => {
        setTitle(event.target.value);
    }
    const updateDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleAdd = (event) => {
        event.preventDefault();
        items.dispatchTodoItems({
            type: 'ADD', payload: { id: uuidv4(), title, description }
        });
        // localStorage.setItem('data' + uuidv4(), [uuidv4(), title, description]);
        setTitle('');
        setDescription('');
        window.my_modal_1.close();
    }
    const handleUpdate = (event) => {
        event.preventDefault();
        console.log(title)
        items.dispatchTodoItems({
            type: 'UPDATE', payload: { id: data[0].id, title: title || data[0].title, description: description || data[0].description }
        });
        // console.log(items.todoItems)
        // localStorage.setItem('data' + uuidv4(), [uuidv4(), title, description]);
        setTitle('');
        setDescription('');
        handleClose();
    }
    return (
        <>
            <form className="modal-box flex flex-col justify-center" onSubmit={data ? handleUpdate : handleAdd}>
                <h3 className="font-bold text-lg">Add Task</h3>
                <label htmlFor="title">Title  : </label>
                {data ? <input type="text" onChange={updateTitle} id="title" placeholder="Type title" className="input input-bordered input-md w-full max-w-xs" defaultValue={data[0].title} /> : <input type="text" onChange={updateTitle} id="title" placeholder="Type title" className="input input-bordered input-md w-full max-w-xs" />}

                <label htmlFor="description" >Description  : </label>
                {data ? <textarea onChange={updateDescription} id='description' className="textarea textarea-bordered" placeholder="Type description" defaultValue={data[0].description}></textarea> : <textarea onChange={updateDescription} className="textarea textarea-bordered" id='description' placeholder="Type description"></textarea>}
                <div className="modal-action">
                    {data ? <button className='px-2' type='submit' >Update</button> : <button type='submit'>Add</button>}
                    <button type='reset' onClick={handleClose} >Close</button>
                </div>
            </form>
        </>
    )
}
