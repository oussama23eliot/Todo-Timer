import React from 'react'

export default function ButtonDialog({ handleOpen, ...attrs }) {
    return (
        <div>
            <div className="tooltip tooltip-bottom mx-3 my-3 text-right float-right" data-tip="Add Task">
                <button className="btn btn-circle btn-outline" onClick={handleOpen}>
                    <svg className="w-6 h-6 " stroke="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
