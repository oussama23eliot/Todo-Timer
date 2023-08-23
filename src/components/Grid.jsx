import React, { useContext, useState, useEffect } from 'react'
import ItemCard from './ItemCard'
import { TodoContext } from '../store/globalContext';
import Modal from './Modal';


export default function Grid({tasks,handleStorage,...attrs}) {
    const [Edit, setEdit] = useState(false);
    const [cont, setcont] = useState('')
    const [addTimer,setAddTimer] =useState(false);
    const handleEditComponent = (itemid,timer=false) => {
        setEdit(true);
        handleItemId(itemid);
        setAddTimer(timer);
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
        setcont(JSON.parse((localStorage.getItem(itemId))));
    }
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-10  my-8 mx-9 text-center" >
                {tasks.map((task) => <ItemCard key={task[0]} task={task}  onClickEdit={handleEditComponent} handleStorage={handleStorage}/>)}
            </div>
            <dialog id='modal_item' className="modal">
                <Modal content={{ update: true }} data={cont} handleClose={handleClose} handleStorage={handleStorage} timer={addTimer} />
            </dialog>
        </>
    )
}
