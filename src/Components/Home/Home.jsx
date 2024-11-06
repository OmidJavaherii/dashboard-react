import React, { useState, useEffect } from 'react'

export default function Home() {

  const [allAdminInfos, setAllAdminsInfos] = useState([])

  useEffect(() => {
    getAllAdminsInfos();
  }, []);

  const getAllAdminsInfos = () => {
    fetch("http://localhost:8000/api/admins/", {
      method: 'GET',
      headers: {
        'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
      }
    })
      .then((res) => res.json())
      .then((adminsInfos) => setAllAdminsInfos(adminsInfos));
  };


  return (
    <div className='cms-main'>
      <h1 className='cms-title'>مشخصات ادمین</h1>
      <table className="cms-table">
        <thead className="special-heading-tr">
            <th>عکس ادمین</th>
            <th>نام ادمین</th>
            <th>آی دی ادمین</th>
            <th>پسورد ادمین</th>
            <th>وظیفه ادمین</th>
        </thead>
          {allAdminInfos.map(admin => (
            <tbody key={admin.id} className="special-table-tr">
              <td>
                <img
                  src={admin.img}
                  alt={admin.id}
                  className="special-img"
                />
              </td>
              <td>{admin.firstname} {admin.lastname}</td>
              <td>{admin.username}</td>
              <td>{admin.password}</td>
              <td>{admin.task}</td>
            </tbody>
          ))}
      </table>
    </div>
  )
}
