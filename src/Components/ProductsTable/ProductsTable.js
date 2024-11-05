import React, { useState } from "react";
import "./ProductsTable.css";
import DeleteModal from "./../DeleteModal/DeleteModal";
import DetailsModal from "./../DetailsModal/DetailsModal";
import EditModal from "./../EditModal/EditModal";
import { AiOutlineDollarCircle, AiOutlineAlignRight, AiOutlineCamera, AiOutlineBarcode, AiOutlineSmile, AiOutlineFire, AiOutlineFormatPainter } from "react-icons/ai";
import ErrorBox from "../ErrorBox/ErrorBox";


export default function ProductsTable({ allProducts, getAllProducts }) {
    
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
    const [isShowEditModal, setIsShowEditModal] = useState(false);
    const [productId, setProductId] = useState(null)
    const [mainProductInfos, setMainProductInfos] = useState({})
    const [productNewTitle, setProductNewTitle] = useState("");
    const [productNewPrice, setProductNewPrice] = useState("");
    const [productNewCount, setProductNewCount] = useState("");
    const [productNewImg, setProductNewImg] = useState("");
    const [productNewPopularity, setProductNewPopularity] = useState("");
    const [productNewSale, setProductNewSale] = useState("");
    const [productNewColors, setProductNewColors] = useState("");


    const deleteModalCancelAction = () => {
        // console.log("مدال کنسل شد");
        setIsShowDeleteModal(false);
    };

    const deleteModalSubmitAction = () => {
        setIsShowDeleteModal(false);

        fetch(`http://localhost:8000/api/products/${productId}`, {
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then((result) => {
                getAllProducts()
                setProductId(null)
            });
        // console.log("مدال تایید شد");

    };

    const closeDetailsModal = () => {
        setIsShowDetailsModal(false);
        // console.log("مدال جزییات بسته شد");
    };

    const updateProductInfos = (event) => {
        event.preventDefault();

        const productsNewInfos = {
            title: productNewTitle,
            price: productNewPrice,
            count: productNewCount,
            img: productNewImg,
            popularity: productNewPopularity,
            sale: productNewSale,
            colors: productNewColors,
        }

        fetch(`http://localhost:8000/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(productsNewInfos)
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log(result);
                getAllProducts()
                setProductId(null)
                setIsShowEditModal(false)
            });
        // console.log("محصول ویرایش شد");
    };

    return (
        <div className="cms-main">
            <h1 className='cms-title'>لیست محصولات</h1>
            {allProducts.length ? (
                <table className="cms-table products-table">
                    <thead className="products-table-heading-tr">
                        <th>عکس</th>
                        <th>اسم</th>
                        <th>قیمت</th>
                        <th>موجودی</th>
                    </thead>
                    <tbody>
                        {allProducts.map((product) => (
                            <tr key={product.id} className="products-table-tr">
                                <td>
                                    <img
                                        src={product.img}
                                        alt={product.title}
                                        className="products-table-img"
                                    />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.price} تومان</td>
                                <td>{product.count}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setIsShowDetailsModal(true)
                                            setMainProductInfos(product)
                                        }}
                                    >
                                        جزییات
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsShowEditModal(true)
                                            setMainProductInfos(product)
                                            setProductId(product.id)
                                            setProductNewTitle(product.title)
                                            setProductNewPrice(product.price)
                                            setProductNewCount(product.count)
                                            setProductNewImg(product.img)
                                            setProductNewPopularity(product.popularity)
                                            setProductNewSale(product.sale)
                                            setProductNewColors(product.colors)
                                        }}
                                    >
                                        ویرایش
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsShowDeleteModal(true)
                                            setProductId(product.id)
                                        }}
                                    >
                                        حذف
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <ErrorBox msg="هیچ محصولی یافت نشد" />
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
                <table className='cms-table'>
                    <thead>
                        <tr>
                            <th>محبوبیت</th>
                            <th>فروش</th>
                            <th>رنگبندی</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{mainProductInfos.popularity}%</td>
                            <td>{mainProductInfos.sale}</td>
                            <td>{mainProductInfos.colors}</td>
                        </tr>
                    </tbody>
                </table>
                <button className='text-modal-close-btn'
                    onClick={closeDetailsModal}>بستن</button>
            </DetailsModal>
            )}
            {isShowEditModal && (
                <EditModal
                    onClose={() => setIsShowEditModal(false)}
                    onSubmit={updateProductInfos}
                >
                    <div className="edit-proructs-form-group">
                        <span>
                            <AiOutlineAlignRight />
                        </span>
                        <p>عنوان</p>
                        <input
                            type="text"
                            placeholder={mainProductInfos.title}
                            className="edit-product-input"
                            onChange={(event) => {
                                let newValue = event.target.value
                                newValue ? setProductNewTitle(newValue) : setProductNewTitle(mainProductInfos.title)
                            }}
                        />
                    </div>
                    <div className="edit-proructs-form-group">
                        <span>
                            <AiOutlineDollarCircle />
                        </span>
                        <p>قیمت</p>
                        <input
                            type="number"
                            placeholder={mainProductInfos.price}
                            className="edit-product-input"
                            onChange={(event) => {
                                let newValue = event.target.value
                                newValue ? setProductNewPrice(newValue) : setProductNewPrice(mainProductInfos.price)
                            }}
                        />
                    </div>
                    <div className="edit-proructs-form-group">
                        <span>
                            <AiOutlineBarcode />
                        </span>
                        <p>موجودی</p>
                        <input
                            type="number"
                            placeholder={mainProductInfos.count}
                            className="edit-product-input"
                            onChange={(event) => {
                                let newValue = event.target.value
                                newValue ? setProductNewCount(newValue) : setProductNewCount(mainProductInfos.count)
                            }}
                        />
                    </div>
                    <div className="edit-proructs-form-group">
                        <span>
                            <AiOutlineCamera />
                        </span>
                        <p>آدرس کاور</p>
                        <input
                            type="text"
                            placeholder={mainProductInfos.img}
                            className="edit-product-input"
                            onChange={(event) => {
                                let newValue = event.target.value
                                newValue ? setProductNewImg(newValue) : setProductNewImg(mainProductInfos.img)
                            }}
                        />
                    </div>
                    <div className="edit-proructs-form-group">
                        <span>
                            <AiOutlineSmile />
                        </span>
                        <p>محبوبیت</p>
                        <input
                            type="number"
                            placeholder={mainProductInfos.popularity}
                            className="edit-product-input"
                            onChange={(event) => {
                                let newValue = event.target.value
                                newValue ? setProductNewPopularity(newValue) : setProductNewPopularity(mainProductInfos.popularity)
                            }}
                        />
                    </div>
                    <div className="edit-proructs-form-group">
                        <span>
                            <AiOutlineFire />
                        </span>
                        <p>میزان فروش</p>
                        <input
                            type="number"
                            placeholder={mainProductInfos.sale}
                            className="edit-product-input"
                            onChange={(event) => {
                                let newValue = event.target.value
                                newValue ? setProductNewSale(newValue) : setProductNewSale(mainProductInfos.sale)
                            }}
                        />
                    </div>
                    <div className="edit-proructs-form-group">
                        <span>
                            <AiOutlineFormatPainter />
                        </span>
                        <p>تعداد رنگ بندی</p>
                        <input
                            type="number"
                            placeholder={mainProductInfos.colors}
                            className="edit-product-input"
                            onChange={(event) => {
                                let newValue = event.target.value
                                newValue ? setProductNewColors(newValue) : setProductNewColors(mainProductInfos.colors)
                            }}
                        />
                    </div>
                </EditModal>
            )}
        </div>
    );
}
