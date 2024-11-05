import React, { useState } from 'react'
import './AddOffs.css'
import { AiOutlineDollarCircle, AiOutlineAlignRight } from "react-icons/ai";

export default function AddOffs({ getAllOffs, getDate }) {

    const [newOffsCode, setNewOffsCode] = useState('')
    const [newOffsPercent, setNewOffsPercent] = useState('')


    const newOffsInfos = {
        code: newOffsCode,
        percent: newOffsPercent,
        date: getDate(),
        isActive: true,
    }

    function emptyNewOffValue() {
        setNewOffsCode('')
        setNewOffsPercent('')
    }

    const addNewOffs = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8000/api/offs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOffsInfos)
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                emptyNewOffValue()
                getAllOffs()
            })
    }


    return (
        <div className='offs-main'>
            <h1 className='offs-title'>افزودن کد تخفیف جدید</h1>
            <form action="#" className='add-offs-form'>
                <div className="add-offs-form-wrap">
                    <div className="add-offs-form-group">
                        <AiOutlineAlignRight />
                        <input type="text"
                            placeholder='کد تخفیف را بنویسید'
                            className='add-offs-input'
                            value={newOffsCode}
                            onChange={(e) => setNewOffsCode(e.target.value)}
                        />
                    </div>
                    <div className="add-offs-form-group">
                        <AiOutlineDollarCircle />
                        <input type="number"
                            placeholder='درصد تخفیف را بنویسید'
                            className='add-offs-input'
                            value={newOffsPercent}
                            min={0.5}
                            max={100}
                            onChange={(e) => setNewOffsPercent(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className="add-offs-submit"
                    onClick={addNewOffs}>
                    ثبت کد تخفیف
                </button>
            </form>
        </div>
    )
}
