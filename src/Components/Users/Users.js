import React, { useEffect, useState } from 'react'
import './Users.css'
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from '../DeleteModal/DeleteModal';

export default function Users() {


  const [users, setUsers] = useState([])
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [mainUserID, setMainUserID] = useState([])


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


  return (
    <div className='cms-main'>
      <h1 className='cms-title'>لیست کاربران</h1>
      {users.length ? (
        <table className='cms-table'>
          <thead>
            <th>نام و نام خانوادگی</th>
            <th>یوزرنیم</th>
            <th>پسورد</th>
            <th>شماره تماس</th>
            <th>ایمیل</th>
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
                  <button>جزئیات</button>
                  <button>ویرایش</button>
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
    </div>
  )
}
