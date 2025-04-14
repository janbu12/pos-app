import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/AddTransaction.css'
import Alert from '../../components/Alert'

function AddTransaction() {
  const [transactionId, setTransactionId] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [products, setProducts] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)

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
    const id = `TR${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()}${pad(now.getHours())}${pad(now.getMinutes())}`
    setTransactionId(id)
  }

  const fetchProducts = async () => {
    const result = await window.api.getProducts()
    setProducts(result)
  }

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { product_id: '', quantity: 1, price: 0 }])
  }

  const handleRemoveItem = (index) => {
    const updatedItems = [...selectedItems]
    updatedItems.splice(index, 1)
    setSelectedItems(updatedItems)
  }


  const handleItemChange = (index, field, value) => {
    const updated = [...selectedItems]

    if (field === 'product_id') {
      const selectedProduct = products.find((p) => p.id === value)
      if (selectedProduct) {
        updated[index].product_id = selectedProduct.id
        updated[index].price = selectedProduct.price
        updated[index].quantity = 1
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
      setShowAlert(true)
      navigate('/transactions')
    } else {
      alert('Gagal menyimpan transaksi: ' + result.error)
    }
  }

  return (
    <div className="add-transaction-container">
      <h2 className="title">Tambah Transaksi</h2>
      <p>
        <strong>ID Transaksi:</strong> {transactionId}
      </p>
      <p>
        <strong>Tanggal:</strong> {date}
      </p>

      <div className="section">
        <button className="add-button" onClick={handleAddItem}>
          + Tambah Produk
        </button>

        {selectedItems.map((item, idx) => (
          <div key={idx} className="item-row">
            <select
              value={item.product_id}
              onChange={(e) => handleItemChange(idx, 'product_id', e.target.value)}
              className="select"
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
              className="input"
              placeholder="Qty"
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(idx, 'price', e.target.value)}
              className="input"
              placeholder="Harga"
              disabled
            />
            <button className="remove-button" onClick={() => handleRemoveItem(idx)}>
              Batal
            </button>
          </div>
        ))}
      </div>

      <div className="section">
        <p className="total">Total: Rp {total.toLocaleString()}</p>
        <button className="save-button" onClick={handleSaveTransaction}>
          Simpan Transaksi
        </button>
        <Link to="/transactions" className="back-link">
          ← Kembali
        </Link>
      </div>
      {showAlert && (
        <Alert
          type="success"
          title="Transaction Created"
          timer={1500}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  )
}

export default AddTransaction
