import React from 'react'

import { BsCurrencyDollar, BsTypeItalic } from "react-icons/bs";

import './AddNewProduct.css'
import { IoBagOutline } from 'react-icons/io5';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { IoIosColorPalette } from 'react-icons/io';

export default function AddNewProduct() {
  return (
    <div className='products-main'>
    <h1 className='products-title'>افزودن محصول جدید</h1>
    <form action="#" className='add-products-form'>
        <div className="add-products-form-wrap">
            <div className="add-products-form-group">
            <BsTypeItalic />
                <input type="text" placeholder='اسم محصول را بنویسید' className='add-products-input'/>
            </div>
            <div className="add-products-form-group">
            <BsCurrencyDollar />
                <input type="text" placeholder='قیمت محصول را بنویسید' className='add-products-input'/>
            </div>
            <div className="add-products-form-group">
            <IoBagOutline />
                <input type="text" placeholder='موجودی محصول را بنویسید' className='add-products-input'/>
            </div>
            <div className="add-products-form-group">
            <HiOutlinePhoto />
                <input type="text" placeholder='آدرس عکس محصول را بنویسید' className='add-products-input'/>
            </div>
            <div className="add-products-form-group">
            <HiOutlinePhoto />
                <input type="text" placeholder='میزان محبوبیت محصول را بنویسید' className='add-products-input'/>
            </div>
            <div className="add-products-form-group">
            <HiOutlinePhoto />
                <input type="text" placeholder='میزان فروش محصول را بنویسید' className='add-products-input'/>
            </div>
            <div className="add-products-form-group">
            <IoIosColorPalette />
                <input type="text" placeholder='تعداد رنگ بندی محصول را بنویسید' className='add-products-input'/>
            </div>
        </div>
        <button className="add-products-submit">ثبت محصول</button>
    </form>
    </div>
  )
}
