import React, { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom'
import Todo from '../pages/Todo'


export default function Navbar() {
    const [url, setUrl] = useState('/Todo-Timer/todo')

    useEffect(()=>{
        setUrl(window.location.pathname);
    },[])
    return (
        <div className="btm-nav z-40 ">
            <Link to="/Todo-Timer/timer" className= {url=="/Todo-Timer/timer"?'active':'w-full'} onClick={()=>{setUrl('/Todo-Timer/timer');}}>
                <button className='flex flex-col justify-center items-center' >
                    <svg className="w-5 h-5 " stroke="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="btm-nav-label">TIMER</span>
                </button>
            </Link>

            <Link to="/Todo-Timer/todo" className={url=="/Todo-Timer/todo"?'active':"w-full"} onClick={()=>{setUrl('/Todo-Timer/todo');}}>
                <button className="flex  flex-col justify-center items-center" >
                    <svg className="w-5 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" width="18" height="20" fill="none" viewBox="0 0 18 20" >
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0v3H6V2m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M5 5h8m-5 5h5m-8 0h.01M5 14h.01M8 14h5" />
                    </svg>
                    <span className="btm-nav-label">TODO</span>
                </button>
            </Link>

        </div>
    )
}
