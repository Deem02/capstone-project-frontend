import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import NavBar from './components/NavBar/NavBar'
import DepartmentList from './components/DepartmentList/DepartmentList'
import DepartmentForm from './components/DepartmentForm/DepartmentForm'
import EmployeeList from './components/EmployeeList/EmployeeList'

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

          <Route path='/departments' element=
            {<ProtectedRoute>
              <DepartmentList />
            </ProtectedRoute>
            } />
          <Route path='/departments/add' element={
            <ProtectedRoute>
              <DepartmentForm />
            </ProtectedRoute>
          } />
          <Route path='/departments/:departmentId/edit' element={
            <ProtectedRoute>
              <DepartmentForm />
            </ProtectedRoute>
          } />
          <Route path='/employees' element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          } />



        </Routes>
      </Router>
    </>
  )
}

export default App
