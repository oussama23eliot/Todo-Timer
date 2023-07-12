import React from 'react'
import Grid from '../components/Grid'
import Modal from '../components/Modal'
import ButtonDialog from '../components/ButtonDialog'

export default function Todo({ content, ...attrs }) {
    const handleOpen = () => {
        window.my_modal_1.showModal();
    }
    const handleClose = () => {
        window.my_modal_1.close();
    }
    return (
        <>
            <ButtonDialog handleOpen={handleOpen} />
            <dialog id='my_modal_1' className="modal">
                <Modal handleClose={handleClose} />
            </dialog>
            <Grid />
        </>
    )
}
