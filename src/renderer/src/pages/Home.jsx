import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <h2>Home</h2>
      <Link to={'/about'}>About</Link>
    </>
  )
}

export default Home
