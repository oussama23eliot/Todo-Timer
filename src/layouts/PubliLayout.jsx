import React from 'react'
import Navbar from '../components/navbar'
import { Outlet } from 'react-router-dom'
import Todo from '../pages/Todo'


export default function PubliLayout({ children, ...attr }) {
    return (
        <div className='scroll-smooth pb-20'>
            <Navbar />
            <Outlet/>
        </div>

    )
}
