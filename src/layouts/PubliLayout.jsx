import React from 'react'
import Navbar from '../components/navbar'


export default function PubliLayout({ children, ...attr }) {
    return (
        <div className='scroll-smooth'>
            <Navbar />
            {children}
        </div>

    )
}
