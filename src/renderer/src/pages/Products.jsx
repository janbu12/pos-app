import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    window.api.getProducts().then(setProducts)
  }, [])
  return (
    <>
      <div>Products</div>
      <Link to={'/product/add'}>Add Product</Link>
      {products.map((product, index) => (
        <div key={index}>{product.name}</div>
      ))}
    </>
  )
}

export default Products
