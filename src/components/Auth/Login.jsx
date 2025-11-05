// src/Login.js
import React, { useState } from "react"
import axios from "axios"
import { saveTokens, getUserFromToken } from "../../lib/auth"
import { useNavigate } from "react-router"
import '../../styles/login.scss'
export default function Login({ setUser }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", { username, password })
      saveTokens(res.data.access, res.data.refresh)
      const user = getUserFromToken()
       setUser(getUserFromToken())
      if (user.role == 'ADMIN'|| user.is_superuser) {
         navigate("/departments")
      } else {
        navigate('/tasks')
      }
    
     
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="login-wrapper" > 
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
      <button type="submit">Login</button>
    </form>
    </div>
  )
}