import React from 'react'

export default function FiltersList({ handleStorage, ...attrs }) {
    return (
        <div className="join my-3 ">
            <input className="join-item btn" type="radio" name="options"  aria-label="All" onClick={()=>handleStorage()} defaultChecked={true} />
            <input className="join-item btn" type="radio" name="options"  onClick={()=>handleStorage("done")} aria-label="Done" />
            <input className="join-item btn" type="radio" name="options"  onClick={()=>handleStorage("todo")} aria-label="Todo" />
        </div>
    )
}