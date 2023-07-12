import React, { useContext, useState, useEffect } from 'react'
import ItemCard from './ItemCard'
import { TodoContext } from '../store/globalContext';
import Modal from './Modal';


export default function Grid() {
    const tasks = useContext(TodoContext);
    const [Edit, setEdit] = useState(false);
    const [cont, setcont] = useState('')
    const handleEditComponent = (itemid) => {
        setEdit(true);
        handleItemId(itemid);
    }

    useEffect(() => {
        if (Edit == true) {
            window.modal_item.close()
            window.modal_item.showModal();
        }

    }, [Edit])
    const handleOpen = () => {
        window.modal_item.showModal();
    }
    const handleClose = () => {
        window.modal_item.close();
        setEdit(false);
    }
    const handleItemId = (itemId) => {
        setcont(tasks.todoItems.filter((item) => item.id === itemId))
    }

    return (
        <>
            <div className="grid grid-cols-3 gap-3  my-10 mx-10 text-center" >
                {tasks.todoItems.map((task) => <ItemCard key={task.id} task={task} onClickEdit={handleEditComponent} />)}
            </div>
            <dialog id='modal_item' className="modal">
                <Modal content={{ update: true }} data={cont} handleClose={handleClose} />
            </dialog>
        </>
    )
}
