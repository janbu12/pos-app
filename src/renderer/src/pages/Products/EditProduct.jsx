import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../styles/EditProduct.css'

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', price: '', quantity: 0, description: '' })

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await window.api.getProductById(id)
      setFormData({
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        description: data.description
      })
    }
    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await window.api.updateProduct(id, formData)
      if (response.success) {
        alert('Berhasil update!!')
        navigate('/products')
      } else {
        alert('Gagal update: ' + response.error)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      alert('Terjadi error saat mengupdate produk.')
    }
  }

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
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
            Update
          </button>
          <button type="button" onClick={() => navigate('/products')} className="btn cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
