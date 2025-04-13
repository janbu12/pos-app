import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/Products.css'

function Products() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const data = await window.api.getProducts()
    setProducts(data)
  }

  const handleDelete = async (id) => {
    console.log(id)
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')
    if (!confirmDelete) return
    await window.api.deleteProduct(id)
    fetchProducts()
  }

  const handleUpdate = (id) => {
    navigate(`/product/edit/${id}`)
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Products</h1>
        <Link to="/product/add" className="add-button">
          Add Product
        </Link>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>Rp {product.price}</td>
                <td>{product.description}</td>
                <td>
                  <button onClick={() => handleUpdate(product.id)} className="btn edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="btn delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Products
