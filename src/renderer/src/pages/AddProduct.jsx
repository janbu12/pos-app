import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddProduct() {
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  })

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }))
  }

  // Kirim data produk ke main process melalui IPC
  const handleAddProduct = async () => {
    if (product.name && product.description && product.price && product.quantity) {
      await window.api.addProduct(product)
      alert('Product added successfully!')
      navigate('/products')
    } else {
      alert('Please fill all the fields!')
    }
  }

  return (
    <div>
      <h2>Add Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Product Description"
        value={product.description}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={product.quantity}
        onChange={handleInputChange}
      />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default AddProduct
