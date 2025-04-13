import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AddTransaction({ onBack }) {
  const [transactionId, setTransactionId] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [products, setProducts] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    generateTransactionId()
    fetchProducts()
  }, [])

  useEffect(() => {
    const totalPrice = selectedItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    setTotal(totalPrice)
  }, [selectedItems])

  const generateTransactionId = () => {
    const now = new Date()
    const pad = (n) => n.toString().padStart(2, '0')
    const id = `TR${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()}${pad(now.getMinutes())}${pad(now.getSeconds())}`
    setTransactionId(id)
  }

  const fetchProducts = async () => {
    const result = await window.api.getProducts()
    setProducts(result)
    console.log(products)
  }

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { product_id: '', quantity: 1, price: 0 }])
  }

  const handleItemChange = (index, field, value) => {
    const updated = [...selectedItems]

    if (field === 'product_id') {
      const selectedProduct = products.find((p) => p.id === value)
      if (selectedProduct) {
        updated[index].product_id = selectedProduct.id
        updated[index].price = selectedProduct.price
        updated[index].quantity = 1 // Default 1
      }
    } else if (field === 'quantity' || field === 'price') {
      updated[index][field] = parseInt(value) || 0
    }

    setSelectedItems(updated)
  }

  const handleSaveTransaction = async () => {
    const transaction = {
      id: transactionId,
      date,
      total
    }

    const result = await window.api.addTransaction(transaction, selectedItems)
    if (result.success) {
      alert('Transaksi berhasil disimpan!')
      navigate('/transactions')
    } else {
      alert('Gagal menyimpan transaksi: ' + result.error)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tambah Transaksi</h2>
      <p>ID Transaksi: {transactionId}</p>
      <p>Tanggal: {date}</p>

      <div className="mt-4">
        <button className="mb-2 px-4 py-1 bg-green-600 text-white rounded" onClick={handleAddItem}>
          + Tambah Produk
        </button>

        {selectedItems.map((item, idx) => (
          <div key={idx} className="mb-2 flex gap-2">
            <select
              value={item.product_id}
              onChange={(e) => handleItemChange(idx, 'product_id', e.target.value)}
              className="p-1 border rounded w-1/3"
            >
              <option value="">Pilih Produk</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
              className="p-1 border rounded w-1/4"
              placeholder="Qty"
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(idx, 'price', e.target.value)}
              className="p-1 border rounded w-1/4"
              placeholder="Harga"
              disabled
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="font-semibold">Total: Rp {total.toLocaleString()}</p>
        <button
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
          onClick={handleSaveTransaction}
        >
          Simpan Transaksi
        </button>
        <Link to={'/transactions'}>Kembali</Link>
      </div>
    </div>
  )
}

export default AddTransaction
