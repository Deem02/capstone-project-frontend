import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from "react-router";

import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"


function DepartmentList() {
    const [departments, setDepartments] = useState([])
    const navigate = useNavigate()

    async function getAllDepartments() {
        // used authRequest insted of  axios.get
        try {
            const response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/departments/' })
            console.log(response.data);
            setDepartments(response.data)
        } catch (error) {
            console.log('Failed to fetch departments', error);

        }

    }
    useEffect(() => {
        getAllDepartments()
    }, [])

    async function handleDelete(departmentId){
        try{
       await authRequest({ 
        method: 'delete',
         url: `http://127.0.0.1:8000/api/departments/${departmentId}/` })
         getAllDepartments()
        } catch (error){
        console.log('Failed to delete departments', error);

        }

    }

    return (
        <div>
            <h2>Departments </h2>

            <Link to='/departments/add'>
                <button>
                    + Add Department
                </button>
            </Link>

            {departments.length ?
                departments.map((department) => {
                    return (
                        <div key={department.id}>
                            <p> <strong>{department.name}  </strong> {department.description} </p>

                            <Link to={`/departments/${department.id}/edit`} >
                                <button>
                                    ✏️
                                </button>
                            </Link>
                            <button onClick={()=> handleDelete(department.id)}>
                              delete  
                            </button>

                        </div>
                    )
                })
                :
                <h2>No Department. Start by creating a new Department.</h2>
            }


        </div>
    )
}

export default DepartmentList
