import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import NavBar from './components/NavBar/NavBar'
import DepartmentList from './components/DepartmentList/DepartmentList'

import Login from './components/Auth/Login'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import { getUserFromToken } from './lib/auth'




function App() {
  const [user, setUser] = useState(getUserFromToken());

  return (
    <>
   <Router>
  < NavBar user={user} setUser={setUser} />
<Routes>
  <Route path='/login' element={<Login setUser={setUser} />} />
  <Route path='/departments/' element= {
    <ProtectedRoute>
   <DepartmentList />
    </ProtectedRoute>
 
    
    } />

</Routes>
   </Router>
    </>
  )
}

export default App
