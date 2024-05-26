import React from 'react'
import './Products.css'
import Errorbox from '../Errorbox/Errorbox'
import AddNewProduct from '../AddNewProduct/AddNewProduct'
import ProductsTable from '../ProductsTable/ProductsTable'

export default function Products() {
  return (
    <div>
      <Errorbox msg={'هیچ محصولی یافت نشد'}/>
      <AddNewProduct />
      <ProductsTable />
    </div>
  )
}
