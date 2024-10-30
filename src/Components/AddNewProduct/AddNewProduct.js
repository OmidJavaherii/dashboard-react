import React, { useState } from 'react'
import './AddNewProduct.css'
import { AiOutlineDollarCircle, AiOutlineAlignRight, AiOutlineCamera, AiOutlineBarcode, AiOutlineSmile, AiOutlineFire, AiOutlineFormatPainter } from "react-icons/ai";

export default function AddNewProduct({ getAllProducts }) {


    const [newProductTitle, setNewProductTitle] = useState('')
    const [newProductPrice, setNewProductPrice] = useState('')
    const [newProductCount, setNewProductCount] = useState('')
    const [newProductImg, setNewProductImg] = useState('')
    const [newProductPopularity, setNewProductPopularity] = useState('')
    const [newProductSale, setNewProductSale] = useState('')
    const [newProductColors, setNewProductColors] = useState('')
    // const [newProductDesc, setNewProductDesc] = useState('')

    const newProductInfos = {
        // productDesc: newProductDesc,
        title: newProductTitle,
        price: newProductPrice,
        count: newProductCount,
        img: 'img/' + newProductImg,
        popularity: newProductPopularity,
        sale: newProductSale,
        colors: newProductColors,
    }

    function emptyNewProductValue() {
        setNewProductTitle('')
        setNewProductPrice('')
        setNewProductCount('')
        setNewProductImg('')
        setNewProductPopularity('')
        setNewProductSale('')
        setNewProductColors('')
    }

    const addNewProduct = (event) => {

        event.preventDefault()

        fetch(`http://localhost:8000/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProductInfos)
        }).then(res => res.json())
            .then(result => {
                // console.log(result);
                emptyNewProductValue()
                getAllProducts()
            })
    }


    return (
        <div className='products-main'>
            <h1 className='products-title'>افزودن محصول جدید</h1>
            <form action="#" className='add-products-form'>
                <div className="add-products-form-wrap">
                    <div className="add-products-form-group">
                        <AiOutlineAlignRight />
                        <input type="text"
                            placeholder='اسم محصول را بنویسید'
                            className='add-products-input'
                            value={newProductTitle}
                            onChange={(e) => setNewProductTitle(e.target.value)}
                        />
                    </div>
                    <div className="add-products-form-group">
                        <AiOutlineDollarCircle />
                        <input type="number"
                            placeholder='قیمت محصول را بنویسید'
                            className='add-products-input'
                            value={newProductPrice}
                            onChange={(e) => setNewProductPrice(e.target.value)}
                        />
                    </div>
                    <div className="add-products-form-group">
                        <AiOutlineBarcode />
                        <input type="number"
                            placeholder='موجودی محصول را بنویسید'
                            className='add-products-input'
                            value={newProductCount}
                            onChange={(e) => setNewProductCount(e.target.value)}
                        />
                    </div>
                    <div className="add-products-form-group">
                        <AiOutlineCamera />
                        <input type="text"
                            placeholder='آدرس عکس محصول را بنویسید'
                            className='add-products-input'
                            value={newProductImg}
                            onChange={(e) => setNewProductImg(e.target.value)}
                        />
                    </div>
                    <div className="add-products-form-group">
                        <AiOutlineSmile />
                        <input type="number"
                            placeholder='میزان محبوبیت محصول را بنویسید'
                            className='add-products-input'
                            value={newProductPopularity}
                            onChange={(e) => setNewProductPopularity(e.target.value)}
                        />
                    </div>
                    <div className="add-products-form-group">
                        <AiOutlineFire />
                        <input type="number"
                            placeholder='میزان فروش محصول را بنویسید'
                            className='add-products-input'
                            value={newProductSale}
                            onChange={(e) => setNewProductSale(e.target.value)}
                        />
                    </div>
                    <div className="add-products-form-group">
                        <AiOutlineFormatPainter />
                        <input type="number"
                            placeholder='تعداد رنگ بندی محصول را بنویسید'
                            className='add-products-input'
                            value={newProductColors}
                            onChange={(e) => setNewProductColors(e.target.value)}
                        />
                    </div>
                    {/* <div className="add-products-form-group">
                        <AiOutlineFormatPainter />
                        <input type="text"
                            placeholder='توضیحات محصول را بنویسید'
                            className='add-products-input'
                            value={newProductDesc}
                            onChange={(e) => setNewProductDesc(e.target.value)}
                        />
                    </div> */}
                </div>
                <button
                    className="add-products-submit"
                    onClick={addNewProduct}>
                    ثبت محصول
                </button>
            </form>
        </div>
    )
}
