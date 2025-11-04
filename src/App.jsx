import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import NavBar from './components/NavBar/NavBar'
import DepartmentList from './components/DepartmentList/DepartmentList'
import DepartmentForm from './components/DepartmentForm/DepartmentForm'
import EmployeeList from './components/EmployeeList/EmployeeList'
import EmployeeForm from './components/EmployeeForm/EmployeeForm'
import TaskList from './components/TaskList/TaskList'
import TaskForm from './components/TaskForm/TaskForm'
import TaskDetail from './components/TaskDetail/TaskDetail'
import Login from './components/Auth/Login'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import { getUserFromToken } from './lib/auth'


function App() {
  const [user, setUser] = useState(getUserFromToken());

  return (
    <>
      <Router>
        < NavBar user={user} setUser={setUser} />
       < main className ='app-container'>
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
          <Route path='/employees/:employeeId/edit' element={
            <ProtectedRoute>
              <EmployeeForm />
            </ProtectedRoute>
          } />
          <Route path='/employees/add' element={
            <ProtectedRoute>
              <EmployeeForm />
            </ProtectedRoute>
          } />
          <Route path='/tasks/' element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          } />
          <Route path='/tasks/add' element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          } />
          <Route path='/tasks/:taskId/edit' element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          } />
          <Route path='/tasks/:taskId/view' element={
            <ProtectedRoute>
              <TaskDetail />
            </ProtectedRoute>
          } />



        </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
