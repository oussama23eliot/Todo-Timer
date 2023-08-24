import Grid from '../components/Grid'
import Modal from '../components/Modal'
import ButtonDialog from '../components/ButtonDialog'
import React, { useState,useEffect, useContext } from 'react'

import { TodoContext } from '../store/globalContext';
import FiltersList from '../components/FiltersList';
import PubliLayout from '../layouts/PubliLayout';

export default function Todo({ content, ...attrs }) {

    const [tasks, setTasks] = useState([]);
    const handleStorage=(filter=null) => {
        let temp=[];
        for (let i = 0; i<localStorage.length; i++) {
            temp[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
        if(filter&&filter!="all"){temp = temp.filter((task)=>task[3]==filter);}
        temp.sort((a,b)=> a[0]-b[0]);
        setTasks(temp);
    }
    useEffect(()=>{
        handleStorage()
    },[])
    const handleOpen = () => {
        window.my_modal_1.showModal();
    }
    const handleClose = () => {
        window.my_modal_1.close();
    }
    return (
        <>
            <div className="flex flex-row px-10 pt-4 justify-between">
                <FiltersList handleStorage={handleStorage} />
                <ButtonDialog handleOpen={handleOpen} />
            </div>
            <dialog id='my_modal_1' className="modal">
                <Modal handleClose={handleClose} handleStorage={handleStorage} />
            </dialog>
            <Grid tasks={tasks} handleStorage={handleStorage}/>
        </>
    )
}
