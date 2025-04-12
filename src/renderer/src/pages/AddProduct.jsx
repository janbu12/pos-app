import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/EditProduct.css' // gunakan style yang sama dengan EditProduct

function AddProduct() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, description, price, quantity } = formData

    if (!name || !description || !price || !quantity) {
      alert('Please fill all fields.')
      return
    }

    try {
      const result = await window.api.addProduct(formData)
      if (result?.success === false) {
        alert('Failed to add product: ' + result.error)
      } else {
        alert('Product added successfully!')
        navigate('/products')
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      alert('Something went wrong while adding the product.')
    }
  }

  return (
    <div className="edit-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </label>
        <div className="buttons">
          <button type="submit" className="btn update">
            Add
          </button>
          <button type="button" onClick={() => navigate('/products')} className="btn cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
