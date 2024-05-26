import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './DetailsModal.css'

export default function DetailsModal({ onHide }) {

    useEffect(() => {
        const checkKey = (event) => {
            // console.log(event);
            if (event.keyCode === 27) {
                onHide()
            }
        }
        window.addEventListener('keydown', checkKey)

        return () => window.removeEventListener('keydown', checkKey)
    })

    return ReactDOM.createPortal(
        <div className="modal-parent active">
            <div className="details-modal">
                <table className='cms-table'>
                    <thead>
                        <tr>
                            <th>اسم</th>
                            <th>قیمت</th>
                            <th>محبوبیت</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>لپتاپ</td>
                            <td>12.000.000</td>
                            <td>91</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>, document.getElementById('modals-parent')
    )
}
