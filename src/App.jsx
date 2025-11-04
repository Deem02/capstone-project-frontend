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
import AdminOnlyRoute from './components/Auth/AdminOnlyRoute'
import { getUserFromToken } from './lib/auth'


function App() {
  const [user, setUser] = useState(getUserFromToken());

  return (
    <>
      <Router>
        < NavBar user={user} setUser={setUser} />
        < main className='app-container'>
          <Routes>
            <Route path='/login' element={<Login setUser={setUser} />} />

            <Route element={<AdminOnlyRoute />}>
              < Route path='/departments' element={<DepartmentList />} />
              < Route path='/departments/add' element={<DepartmentForm />} />
              <Route path='/departments/:departmentId/edit' element={<DepartmentForm />} />
              <Route path='/employees' element={<EmployeeList />} />
              <Route path='/employees/:employeeId/edit' element={<EmployeeForm />} />
              <Route path='/employees/add' element={<EmployeeForm />} />
              <Route path='/tasks/add' element={<TaskForm />} />
              <Route path='/tasks/:taskId/edit' element={<TaskForm />} />

            </Route>
            <Route element={<ProtectedRoute />} >
              <Route path='/tasks/' element={<TaskList />} />
              <Route path='/tasks/:taskId/view' element={<TaskDetail />} />
            </Route>

          </Routes>
        </main>
      </Router >
    </>
  )
}

export default App
