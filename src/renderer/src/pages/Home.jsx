import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import '../styles/Home.css'

function Home() {
  const [totalIncome, setTotalIncome] = useState(0)
  const [monthlyIncome, setMonthlyIncome] = useState(0)
  const [monthlyTransactions, setMonthlyTransactions] = useState(0)
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [topProducts, setTopProducts] = useState([])
  const [topProductsThisMonth, setTopProductsThisMonth] = useState([])

  const data = [
    { date: '2025-04-10', value: 20 },
    { date: '2025-04-11', value: 45 },
    { date: '2025-04-12', value: 30 },
  ];

  useEffect(() => {
    // Simulasi data
    const dummyData = {
      totalIncome: 125000000,
      monthlyIncome: 18500000,
      monthlyTransactions: 45,
      totalTransactions: 345,
      topProducts: [
        { id: 1, name: 'Pasir Bangunan', total_sold: 150, total_revenue: 7500000 },
        { id: 2, name: 'Semen 40kg', total_sold: 130, total_revenue: 10400000 },
        { id: 3, name: 'Batu Bata Merah', total_sold: 2000, total_revenue: 6000000 },
        { id: 4, name: 'Keramik Lantai 40x40', total_sold: 80, total_revenue: 9600000 },
        { id: 5, name: 'Cat Tembok 5kg', total_sold: 65, total_revenue: 5200000 },
        { id: 6, name: 'Pipa PVC 3 Inch', total_sold: 90, total_revenue: 4500000 },
        { id: 7, name: 'Kusen Aluminium', total_sold: 40, total_revenue: 7200000 },
        { id: 8, name: 'Genteng Beton', total_sold: 500, total_revenue: 7500000 },
        { id: 9, name: 'Triplek 9mm', total_sold: 55, total_revenue: 4950000 },
        { id: 10, name: 'Besi Beton 12mm', total_sold: 35, total_revenue: 8750000 },
      ],
      topProductsThisMonth: [
        { id: 1, name: 'Pasir Bangunan', total_sold: 50, total_revenue: 2500000 },
        { id: 2, name: 'Semen 40kg', total_sold: 60, total_revenue: 4800000 },
        { id: 3, name: 'Batu Bata Merah', total_sold: 1200, total_revenue: 3600000 },
        { id: 4, name: 'Keramik Lantai 40x40', total_sold: 40, total_revenue: 4800000 },
        { id: 5, name: 'Cat Tembok 5kg', total_sold: 45, total_revenue: 3600000 },
        { id: 6, name: 'Pipa PVC 3 Inch', total_sold: 70, total_revenue: 3500000 },
        { id: 7, name: 'Kusen Aluminium', total_sold: 25, total_revenue: 4500000 },
        { id: 8, name: 'Genteng Beton', total_sold: 300, total_revenue: 4500000 },
        { id: 9, name: 'Triplek 9mm', total_sold: 35, total_revenue: 3150000 },
        { id: 10, name: 'Besi Beton 12mm', total_sold: 30, total_revenue: 7500000 },
      ]
    }

    setTotalIncome(dummyData.totalIncome)
    setMonthlyIncome(dummyData.monthlyIncome)
    setMonthlyTransactions(dummyData.monthlyTransactions)
    setTotalTransactions(dummyData.totalTransactions)
    setTopProducts(dummyData.topProducts)
    setTopProductsThisMonth(dummyData.topProductsThisMonth)
  }, [])

  return (
    <div className="home-container">
      <h1 className="home-title">Home</h1>

      <div className="stats-grid">
        <div className="card">
          <h3>Total Penghasilan</h3>
          <p>Rp {totalIncome.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Penghasilan Bulan Ini</h3>
          <p>Rp {monthlyIncome.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Transaksi Bulan Ini</h3>
          <p>{monthlyTransactions}</p>
        </div>
        <div className="card">
          <h3>Total Transaksi</h3>
          <p>{totalTransactions}</p>
        </div>
      </div>

      <h2 className="section-title">Top 10 Produk Terlaris Secara Keseluruhan</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Produk</th>
            <th>Jumlah Terjual</th>
            <th>Total Pendapatan</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.total_sold}</td>
              <td>Rp {product.total_revenue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="section-title">Top 10 Produk Terlaris Bulan Ini</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Produk</th>
            <th>Jumlah Terjual</th>
            <th>Total Pendapatan</th>
          </tr>
        </thead>
        <tbody>
          {topProductsThisMonth.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.total_sold}</td>
              <td>Rp {product.total_revenue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="section-title">Contoh Grafik</h2>
      <div className="stats-grid">
        <div className="card">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Home
