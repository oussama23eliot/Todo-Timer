import React, { useState,useEffect, useContext } from 'react'
import TimeSelector from '../components/TimeSelector'
import ButtonDialog from '../components/ButtonDialog'
import Modal from '../components/Modal'
import BaseTimer from '../components/BaseTimer';
import TimerTable from '../components/TimerTable';
import {  TodoContext } from '../store/globalContext';
import PubliLayout from '../layouts/PubliLayout';
export default function Timer() {
    const timertasks = useContext(TodoContext);

    const [tasks, setTasks] = useState([]);
    const [playQueue, setPlayQueue] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [inAction,setInAction]= useState([]);
    const handleStorage= () => {
        let temp=[];
        for (let i = 0; i<localStorage.length; i++) {
            let check = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(check[3]=='timer'){
                temp.push(check);
            }
        }
        temp.sort((a,b)=> a[0]-b[0]);
        setTasks(temp);
    }
    useEffect(()=>{
        handleStorage();
    },[])
    useEffect(()=>{
        if(tasks.length){
            timertasks.dispatchTodoItems({'type':"ADD","payload": tasks[startIndex]})
        }

    },[tasks])
    const changeIds=(id1,id2)=>{
        let t1 = JSON.parse((localStorage.getItem(id1)))
        let t2 = JSON.parse((localStorage.getItem(id2)))
        localStorage.setItem(id1,JSON.stringify([id1,  t2[1],  t2[2], t2[3], t2[4],t2[5]]));
        localStorage.setItem(id2,JSON.stringify([id2,  t1[1],  t1[2], t1[3], t1[4],t1[5]]));
        handleStorage();  
    }
    const handleOpen = () => {
        window.my_modal_1.showModal();
    }
    const handleClose = () => {
        window.my_modal_1.close();
    };    
    return (
        <div className='flex flex-col'>
        <div className="px-10 pt-4 ">
            <ButtonDialog handleOpen={handleOpen} />
            <dialog id='my_modal_1' className="modal">
                <Modal handleClose={handleClose} timer handleStorage={handleStorage}/>
            </dialog>
        </div>
        <div className='w-full sm:w-4/6  flex flex-col  items-center mx-auto'>
            <BaseTimer tasks={tasks} playQueue={playQueue}  handleStorage={handleStorage} startIndex={startIndex} setStartIndex={setStartIndex} />
            <div className=" w-5/6 sm:w-full overflow-x-auto mt-8">
                <div className="flex flex-row gap-2 text-left w-full mt-10"><label htmlFor="toggle">Play Queue : </label><input name="toggle" type="checkbox" className="toggle toggle-info toggle-md" checked={playQueue} onClick={()=>{setPlayQueue(prev=> !prev)}}/></div>
                <TimerTable tasks={tasks} setStartIndex={setStartIndex} handleStorage={handleStorage} changeIds={changeIds} playQueue={playQueue}/>
            </div>
        </div>
        </div>
    )
}
