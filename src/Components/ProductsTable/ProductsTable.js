import React, { Children, useState } from 'react'
import './ProductsTable.css'
import DeleteModal from '../DeleteModal/DeleteModal'
import DetailsModal from '../DetailsModal/DetailsModal'
import EditModal from '../EditModal/EditModal'
import { AiOutlineDollarCircle } from 'react-icons/ai'

export default function ProductsTable() {

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowDetailModal, setIsShowDetailModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)

    const deleteModalCalncelAction = () => {
        setIsShowDeleteModal(false)
    }
    const deleteModalSubmitAction = () => {
        setIsShowDeleteModal(false)
    }
    const closeDetailModal = () => {
        setIsShowDetailModal(false)
    }
    const updateProductInfos = (event) => {
        event.preventDefault()
        console.log('edited');
    }

    return (
        <>
            <table className='products-table'>
                <thead>
                    <tr className='products-table-heading-tr'>
                        <th>عکس</th>
                        <th>اسم</th>
                        <th>قیمت</th>
                        <th>موجودی</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='products-table-tr'>
                        <td>
                            <img src="/img/oil.jpeg" alt="oil" className='products-table-img' />
                        </td>
                        <td>روغن سرخ کردنی</td>
                        <td>92000 تومان</td>
                        <td>82</td>
                        <td>
                            <button className="products-table-btn" onClick={() => setIsShowDetailModal(true)}>جزییات</button>
                            <button className="products-table-btn" onClick={() => setIsShowDeleteModal(true)}>حذف</button>
                            <button className="products-table-btn" onClick={() => setIsShowEditModal(true)}>ویرایش</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {isShowDeleteModal &&
                <DeleteModal
                    submitAction={deleteModalSubmitAction}
                    cancelAction={deleteModalCalncelAction} />}
            {isShowDetailModal &&
                <DetailsModal onHide={closeDetailModal} />}
            {isShowEditModal &&
                <EditModal
                    onClose={() => setIsShowEditModal(false)}
                    onSubmit={updateProductInfos}
                >

                    {/* {Children} */}

                    <div className='edit-product-form-group'>
                        <span>
                            <AiOutlineDollarCircle />
                        </span>
                        <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-product-input'/>
                    </div>
                    <div className='edit-product-form-group'>
                        <span>
                            <AiOutlineDollarCircle />
                        </span>
                        <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-product-input'/>
                    </div>
                    <div className='edit-product-form-group'>
                        <span>
                            <AiOutlineDollarCircle />
                        </span>
                        <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-product-input'/>
                    </div>
                    <div className='edit-product-form-group'>
                        <span>
                            <AiOutlineDollarCircle />
                        </span>
                        <input type="text" placeholder='عنوان جدید را وارد کنید' className='edit-product-input'/>
                    </div>

                </EditModal>}

        </>
    )
}
