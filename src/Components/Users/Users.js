import React, { useEffect, useState } from 'react'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from '../DeleteModal/DeleteModal';
import EditModal from '../EditModal/EditModal';
import DetailsModal from '../DetailsModal/DetailsModal';
import './Users.css'


export default function Users() {


  const [users, setUsers] = useState([])
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [mainUserInfos, setMainUserInfos] = useState({})
  const [mainUserID, setMainUserID] = useState([])
  const [userNewFirstName, setUserNewFirstName] = useState('')
  const [userNewLastName, setUserNewLastName] = useState('')
  const [userNewUsername, setUserNewUsername] = useState('')
  const [userNewPassword, setUserNewPassword] = useState('')
  const [userNewPhone, setUserNewPhone] = useState('')
  const [userNewCity, setUserNewCity] = useState('')
  const [userNewEmail, setUserNewEmail] = useState('')
  const [userNewAddress, setUserNewAddress] = useState('')
  const [userNewScore, setUserNewScore] = useState('')
  const [userNewBuy, setUserNewBuy] = useState('')


  useEffect(() => {
    getAllUsers()
  }, [])

  function getAllUsers() {
    fetch('http://localhost:8000/api/users')
      .then(res => res.json())
      .then(users => setUsers(users))
  }

  const removeUser = () => {
    setIsShowDeleteModal(false);
    fetch(`http://localhost:8000/api/users/${mainUserID}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((result) => {
        getAllUsers()
        setMainUserID(null)
      });
  };
  const closeDeleteModal = () => setIsShowDeleteModal(false);

  const closeDetailsModal = () => setIsShowDetailsModal(false);

  const closeEditModal = () => setIsShowEditModal(false);

  const updateUser = (e) => {
    e.preventDefault()

    const userNewInfos = {
      firsname: userNewFirstName,
      lastname: userNewLastName,
      username: userNewUsername,
      password: userNewPassword,
      phone: userNewPhone,
      city: userNewCity,
      email: userNewEmail,
      address: userNewAddress,
      score: userNewScore,
      buy: userNewBuy,
    }
    fetch(`http://localhost:8000/api/users/${mainUserID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userNewInfos)
    }).then(res => res.json())
      .then(result => {
        getAllUsers()
        setIsShowEditModal(false)
        setMainUserID(null)
      })
  }



  return (
    <div className='cms-main'>
      <h1 className='cms-title'>لیست کاربران</h1>
      {users.length ? (
        <table className='cms-table'>
          <thead>
            <tr>
              <th>نام و نام خانوادگی</th>
              <th>یوزرنیم</th>
              <th>پسورد</th>
              <th>شماره تماس</th>
              <th>ایمیل</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.firsname} {user.lastname}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsShowDeleteModal(true)
                      setMainUserID(user.id)
                    }}
                  >
                    حذف</button>
                  <button
                    onClick={() => {
                      setIsShowDetailsModal(true)
                      setMainUserInfos(user)
                    }}
                  >جزئیات</button>
                  <button
                    onClick={() => {
                      setIsShowEditModal(true)
                      setMainUserID(user.id)
                      setUserNewFirstName(user.firsname)
                      setUserNewLastName(user.lastname)
                      setUserNewUsername(user.username)
                      setUserNewPassword(user.password)
                      setUserNewPhone(user.phone)
                      setUserNewCity(user.city)
                      setUserNewEmail(user.email)
                      setUserNewAddress(user.address)
                      setUserNewScore(user.score)
                      setUserNewBuy(user.buy)
                    }}
                  >ویرایش</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg={'هیچ کاربری یافت نشد'} />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title='آیا از حذف کاربر اطمینان دارید؟'
          submitAction={removeUser}
          cancelAction={closeDeleteModal}
        />
      )}
      {isShowEditModal && (
        <EditModal
          onClose={closeEditModal}
          onSubmit={updateUser}
        >
          <div className='edit-user-info-input-group'>
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className='edit-user-info-input'
              placeholder='مقدار جدید را وارد نمایید'
              value={userNewFirstName}
              onChange={(e) => setUserNewFirstName(e.target.value)}
            />
          </div>
          <div className='edit-user-info-input-group'>
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className='edit-user-info-input'
              placeholder='مقدار جدید را وارد نمایید'
              value={userNewLastName}
              onChange={(e) => setUserNewLastName(e.target.value)}
            />
          </div>
          <div className='edit-user-info-input-group'>
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className='edit-user-info-input'
              placeholder='مقدار جدید را وارد نمایید'
              value={userNewUsername}
              onChange={(e) => setUserNewUsername(e.target.value)}
            />
          </div>
          <div className='edit-user-info-input-group'>
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className='edit-user-info-input'
              placeholder='مقدار جدید را وارد نمایید'
              value={userNewPassword}
              onChange={(e) => setUserNewPassword(e.target.value)}
            />
          </div>
          <div className='edit-user-info-input-group'>
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="email"
              className='edit-user-info-input'
              placeholder='مقدار جدید را وارد نمایید'
              value={userNewEmail}
              onChange={(e) => setUserNewEmail(e.target.value)}
            />
          </div>
          <div className='edit-user-info-input-group'>
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="number"
              className='edit-user-info-input'
              placeholder='مقدار جدید را وارد نمایید'
              value={userNewPhone}
              onChange={(e) => setUserNewPhone(e.target.value)}
            />
          </div>
          <div className='edit-user-info-input-group'>
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className='edit-user-info-input'
              placeholder='مقدار جدید را وارد نمایید'
              value={userNewCity}
              onChange={(e) => setUserNewCity(e.target.value)}
            />
          </div>
          <div className='edit-user-info-input-group'>
            <span>
              <AiOutlineDollarCircle />
            </span>
            <textarea
              className='edit-user-info-input'
              placeholder='مقدار جدید را وارد نمایید'
              value={userNewAddress}
              onChange={(e) => setUserNewAddress(e.target.value)}
            >
            </textarea>
          </div>
          <div className='edit-user-info-input-group'>
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="number"
              className='edit-user-info-input'
              placeholder='مقدار جدید را وارد نمایید'
              value={userNewScore}
              onChange={(e) => setUserNewScore(e.target.value)}
            />
          </div>
          <div className='edit-user-info-input-group'>
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="number"
              className='edit-user-info-input'
              placeholder='مقدار جدید را وارد نمایید'
              value={userNewBuy}
              onChange={(e) => setUserNewBuy(e.target.value)}
            />
          </div>
        </EditModal>
      )}
      {isShowDetailsModal && (
        <DetailsModal
          onHide={closeDetailsModal}>
          <table className='cms-table'>
            <thead>
              <tr>
                <th>شهر</th>
                <th>آدرس</th>
                <th>امتیاز</th>
                <th>میزان خرید</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainUserInfos.city}</td>
                <td>{mainUserInfos.address}</td>
                <td>{mainUserInfos.score}</td>
                <td>{mainUserInfos.buy}</td>
              </tr>
            </tbody>
          </table>
          <button className='text-modal-close-btn'
            onClick={closeDetailsModal}>بستن</button>
        </DetailsModal>
      )}
    </div>
  )
}
