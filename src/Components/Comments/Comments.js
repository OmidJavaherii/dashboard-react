import React, { useEffect, useState } from 'react'
import './Comments.css'
import ErrorBox from "../ErrorBox/ErrorBox";
import DetailsModal from '../DetailsModal/DetailsModal';
import DeleteModal from '../DeleteModal/DeleteModal'
import EditModal from '../EditModal/EditModal';

export default function Comments() {


  const [allComments, setAllComments] = useState([])
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [mainCommentBody, setMainCommentBody] = useState('')
  const [commentID, setCommentID] = useState(null)


  useEffect(() => {
    getAllComments()
  }, [])

  function getAllComments() {
    fetch("http://localhost:8000/api/comments/")
      .then((res) => res.json())
      .then((comments) => {
        setAllComments(comments)
        // console.log(comments);
      });
  }
  const closeDetailsModal = () => setIsShowDetailsModal(false);


  const acceptComment = () => {
    fetch(`http://localhost:8000/api/comments/accept/${commentID}`, {
      method: 'POST',
    })
      .then(res => {
        res.json()
      })
      .then(result => {
        // console.log(result);
        setIsShowAcceptModal(false)
        getAllComments()
      })
  }
  const closeAcceptModal = () => setIsShowAcceptModal(false);


  const rejectComment = () => {

    fetch(`http://localhost:8000/api/comments/reject/${commentID}`, {
      method: 'POST'
    }).then(res => res.json())
      .then(result => {
        // console.log(result);
        setIsShowRejectModal(false)
        getAllComments()
      })
  };
  const closeRejectModal = () => setIsShowRejectModal(false);


  const updateComment = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: mainCommentBody
      })
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        setIsShowEditModal(false);
        getAllComments()
      })
  };
  const closeEditModal = () =>setIsShowEditModal(false);


  const deleteModalSubmitAction = () => {
    setIsShowDeleteModal(false);

    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((result) => {
        getAllComments()
        setCommentID(null)
      });
    // console.log("مدال تایید شد");
  };
  const deleteModalCancelAction = () => setIsShowDeleteModal(false);


  return (
    <div className='cms-main'>
      {allComments.length ? (
        <table className='cms-table'>
          <thead>
            <tr>
              <th>اسم کاربر</th>
              <th>محصول</th>
              <th>کامنت</th>
              <th>تاریخ</th>
              <th>ساعت</th>
            </tr>
          </thead>
          <tbody>
            {allComments.map((comment => (
              <tr key={comment.id}>
                <td>{comment.userID}</td>
                <td>{comment.productID}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsShowDetailsModal(true)
                      setMainCommentBody(comment.body)
                    }}
                  >دیدن متن</button>
                </td>
                <td>{comment.date}</td>
                <td>{comment.hour}</td>
                <td className='comment-btn'>
                  <button
                    onClick={() => {
                      setIsShowDeleteModal(true)
                      setCommentID(comment.id)
                    }}
                  >حذف</button>
                  <button
                    onClick={() => {
                      setIsShowEditModal(true)
                      setMainCommentBody(comment.body)
                      setCommentID(comment.id)
                    }}
                  >ویرایش</button>
                  <button>پاسخ</button>
                  {comment.isAccept === 0 ? (
                    <button
                      onClick={() => {
                        setIsShowAcceptModal(true)
                        setCommentID(comment.id)
                      }}
                    >تایید</button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsShowRejectModal(true);
                        setCommentID(comment.id);
                      }}
                    >
                      رد
                    </button>
                  )}
                </td>
              </tr>
            )))}
          </tbody>
        </table>

      ) : (
        <ErrorBox msg={'هیچ کامنتی یافت نشد'} />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title='آیا از حذف اطمینان دارید؟'
          submitAction={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
        />
      )}
      {isShowDetailsModal && (<DetailsModal
        DetailsModal onHide={closeDetailsModal} >
        <p className='text-modal'>
          {mainCommentBody}
        </p>
        <button className='text-modal-close-btn'
          onClick={closeDetailsModal}>بستن</button>
      </DetailsModal>
      )}
      {isShowEditModal && (
        <EditModal
          onClose={closeEditModal}
          onSubmit={updateComment}
        >
          <textarea
            className='comment-body-textarea'
            value={mainCommentBody}
            onChange={e => setMainCommentBody(e.target.value)}
          >
          </textarea>
        </EditModal>
      )}
      {isShowAcceptModal && (
        <DeleteModal
          title='آیا از تایید کامنت اطمینان دارید؟'
          submitAction={acceptComment}
          cancelAction={closeAcceptModal}
        />
      )}
      {isShowRejectModal && (
        <DeleteModal
          title="آیا از رد کامنت اطمینان دارید؟"
          cancelAction={closeRejectModal}
          submitAction={rejectComment}
        />
      )}
    </div>
  )
}
