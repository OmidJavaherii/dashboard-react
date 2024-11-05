import React, { useEffect, useState } from 'react'
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from '../DeleteModal/DeleteModal';
import DetailsModal from '../DetailsModal/DetailsModal';
import './Orders.css'

export default function Orders() {

  const [orders, setOrders] = useState([])
  const [mainOrderID, setMainOrderID] = useState([])
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [mainOrderInfos, setMainOrderInfos] = useState({})
  const [orderNewIsActive, setOrderNewIsActive] = useState('')
  const [isShowSituationModal, setIsShowSituationModal] = useState(false);



  useEffect(() => {
    getAllOrders()
  }, [])

  function getAllOrders() {
    fetch('http://localhost:8000/api/orders')
      .then(res => res.json())
      .then(orders => {
        setOrders(orders)
      })
  }
  const removeOrder = () => {
    setIsShowDeleteModal(false);
    fetch(`http://localhost:8000/api/order/${mainOrderID}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((result) => {
        getAllOrders()
        setMainOrderID(null)
      });
  };

  const closeDeleteModal = () => setIsShowDeleteModal(false);

  const closeDetailsModal = () => setIsShowDetailsModal(false);

  const changeOrderIsActive = () => {
    let changeActive = orderNewIsActive ? 0 : 1
    
    fetch(`http://localhost:8000/api/orders/active-order/${mainOrderID}/${changeActive}`, {
      method: 'PUT',
    })
      .then(res => {
        res.json()
      })
      .then(result => {
        setIsShowSituationModal(false)
        getAllOrders()
        setMainOrderID(null)
      })

  }
  const closeChangeModal = () => setIsShowSituationModal(false);


  return (
    <div className='cms-main'>
      <h1 className='cms-title'>لیست سفارشات</h1>
      {orders.length ? (
        <table className='cms-table'>
          <thead>
            <tr>
              <th>اسم کاربر</th>
              <th>اسم محصول</th>
              <th>مبلغ</th>
              <th>تعداد</th>
              <th>تخفیف</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.userID}</td>
                <td>{order.productID}</td>
                <td>{order.price}</td>
                <td>{order.count}</td>
                <td>{order.off}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsShowDeleteModal(true)
                      setMainOrderID(order.id)
                    }}
                  >
                    حذف</button>
                  <button
                    onClick={() => {
                      setIsShowDetailsModal(true)
                      setMainOrderInfos(order)
                    }}
                  >جزئیات</button>

                  <button
                    onClick={() => {
                      setMainOrderID(order.id)
                      setIsShowSituationModal(true)
                      setOrderNewIsActive(order.isActive)
                    }}
                  >{order.isActive ? 'پذیرش' : 'رد'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg={'هیچ سفارشی یافت نشد'} />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title='آیا از حذف سفارش اطمینان دارید؟'
          submitAction={removeOrder}
          cancelAction={closeDeleteModal}
        />
      )}
      {isShowDetailsModal && (
        <DetailsModal
          onHide={closeDetailsModal}>
          <table className='cms-table'>
            <thead>
              <tr>
                <th>تاریخ</th>
                <th>ساعت</th>
                <th>امتیاز</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainOrderInfos.date}</td>
                <td>{mainOrderInfos.hour}</td>
                <td>{mainOrderInfos.popularity}</td>
              </tr>
            </tbody>
          </table>
          <button className='text-modal-close-btn'
            onClick={closeDetailsModal}>بستن</button>
        </DetailsModal>
      )}

      {isShowSituationModal && (
        <DeleteModal
          title='آیا از تایید سفارش اطمینان دارید؟'
          submitAction={changeOrderIsActive}
          cancelAction={closeChangeModal}
        />
      )}
    </div>
  )
}
