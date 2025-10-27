import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"


function DepartmentList() {
    const [departments, setDepartment] = useState([])

    async function getAllDepartments() {
        // used authRequest insted of  axios.get
        const response = await authRequest({method:'get', url: 'http://127.0.0.1:8000/api/departments/'})

        console.log(response.data);
        setDepartment(response.data)
        
    } 
 useEffect(()=> {
getAllDepartments()
      }, [] )

  return (
    <div>
        <h1>Departments </h1>
        {
            departments.length?
            departments.map((department)=> {
                return (
                    <p key={department.id}> {department.name} {department.description} </p>
                )
            }) 
            :
            <h2>No Department. Start by creating a new Department</h2>
        }
      
    </div>
  )
}

export default DepartmentList
