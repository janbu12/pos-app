import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    window.api.getUsers().then(setUsers)
  }, [])

  const handleAddUser = async () => {
    const user = { name: 'John Doe'}
    await window.api.addUser(user)
    const newUsers = await window.api.getUsers()
    setUsers(newUsers)
  }
  return (
    <>
      <h2>Home</h2>
      <Link to={'/about'}>About</Link>
      <Link to={'/products'}>Products</Link>
      <h1>User List</h1>
      <button onClick={handleAddUser}>Add User</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  )
}

export default Home
