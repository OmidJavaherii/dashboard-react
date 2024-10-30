import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './EditModal.css'

export default function EditModal({ children, onClose, onSubmit }) {

    useEffect(() => {
        const checkKey = (event) => {
            // console.log(event);
            if (event.keyCode === 27) {
                onClose()
            }
        }
        window.addEventListener('keydown', checkKey)

        return () => window.removeEventListener('keydown', checkKey)
    })


    return ReactDOM.createPortal(
        <div className='modal-parent active'>
            <form className='edit-modal-form'>
                <h2>اطلاعات جدید را وارد نمایید</h2>

                {children}

                <button className='edit-form-submit'onClick={onSubmit}>ثبت اطلاعات جدید</button>
            </form>
        </div>, document.getElementById('modals-parent')
    )
}
