import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../../styles/Transaction.css'

function Transaction() {
  const [transaction, setTransaction] = useState(null)
  const [details, setDetails] = useState([])
  const { id } = useParams()

  useEffect(() => {
    fetchTransaction()
  }, [])

  const fetchTransaction = async () => {
    const data = await window.api.getTransactionById(id)
    setTransaction(data.transaction)
    setDetails(data.details)
  }

  if (!transaction) {
    return <p className="loading">Memuat transaksi...</p>
  }

  return (
    <div className="transaction-container">
      <h2 className="title">Detail Transaksi</h2>

      <p>
        <strong>No Faktur:</strong> {transaction.id}
      </p>
      <p>
        <strong>Tanggal:</strong> {transaction.date}
      </p>
      <p>
        <strong>Total:</strong> Rp {transaction.total.toLocaleString()}
      </p>

      <h3 className="subtitle">Produk</h3>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Jumlah</th>
            <th>Harga</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {details.map((item, i) => (
            <tr key={i}>
              <td>{item.product_name}</td>
              <td>{item.quantity}</td>
              <td>Rp {item.price.toLocaleString()}</td>
              <td>Rp {(item.quantity * item.price).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/transactions" className="back-button">
        ← Kembali
      </Link>
    </div>
  )
}

export default Transaction
