import React, { useState } from 'react'
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from '../DeleteModal/DeleteModal';

export default function OffsTable({ allOffs, getAllOffs, getDate }) {

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowSituationModal, setIsShowSituationModal] = useState(false);
    const [mainOffsID, setMainOffsID] = useState([])
    const [offNewIsActive, setoffNewIsActive] = useState('')

    const removeOffs = () => {
        setIsShowDeleteModal(false);
        fetch(`http://localhost:8000/api/offs/${mainOffsID}`, {
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then((result) => {
                getAllOffs()
                setMainOffsID(null)
            });
    };
    const closeDeleteModal = () => setIsShowDeleteModal(false);


    const changeOff = () => {
        let changeActive = offNewIsActive ? 0 : 1

        fetch(`http://localhost:8000/api/offs/active-off/${mainOffsID}/${changeActive}`, {
            method: 'PUT',
        })
            .then(res => {
                res.json()
            })
            .then(result => {
                setIsShowSituationModal(false)
                getAllOffs()
                setMainOffsID(null)
            })
    }

    const closeAcceptModal = () => setIsShowSituationModal(false);

    return (
        <div className='cms-main'>
            <h1 className='cms-title'>لیست تخفیفات</h1>
            {allOffs.length ? (
                <table className='cms-table'>
                    <thead>
                        <tr>
                            <th>کد تخفیف</th>
                            <th>درصد تخفیف</th>
                            <th>زمان تخفیف</th>
                            <th>محصول تخفیف</th>
                            <th>ادمین تخفیف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOffs.map(off => (
                            <tr key={off.id}>
                                <td>{off.code}</td>
                                <td>{off.percent}</td>
                                <td>{off.date}</td>
                                <td>{off.productID}</td>
                                <td>{off.adminID}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setIsShowDeleteModal(true)
                                            setMainOffsID(off.id)
                                        }}
                                    >
                                        حذف</button>
                                    <button
                                        onClick={() => {
                                            setIsShowSituationModal(true)
                                            setMainOffsID(off.id)
                                            setoffNewIsActive(off.isActive)
                                        }}
                                    >{off.isActive ? 'فعال' : 'غیرفعال'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <ErrorBox msg={'هیچ تخفیفی یافت نشد'} />
            )}
            {isShowDeleteModal && (
                <DeleteModal
                    title='آیا از حذف تخفیف اطمینان دارید؟'
                    submitAction={removeOffs}
                    cancelAction={closeDeleteModal}
                />
            )}
            {isShowSituationModal && (
                <DeleteModal
                    title='آیا از تغییر وضعیت تخفیف اطمینان دارید؟'
                    submitAction={changeOff}
                    cancelAction={closeAcceptModal}
                />
            )}
        </div>
    )
}
