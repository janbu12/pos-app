import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Transactions.css'

function Transactions() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    const result = await window.api.getAllTransactions()
    setTransactions(result)
    console.log(transactions)
  }

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h1>Daftar Transaksi</h1>
        <Link to="/transaction/add" className="add-button">
          + Tambah Transaksi
        </Link>
      </div>

      <table className="transactions-table">
        <thead>
          <tr>
            <th>No Faktur</th>
            <th>Tanggal</th>
            <th>Total</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.date}</td>
              <td>Rp {tx.total.toLocaleString()}</td>
              <td>
                <Link className="btn detail" to={`/transaction/${tx.id}`}>
                  Detail
                </Link>
              </td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan="4" className="no-data">
                Tidak ada transaksi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions
