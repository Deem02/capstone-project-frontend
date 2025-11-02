import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from "react-router";
import { authRequest } from "../../lib/auth"

function EmployeeList() {
    const [employees, setEmployees] = useState([])

    async function getAllEmployees() {
        // used authRequest insted of  axios.get
        try {
            const response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/employees/' })
            console.log(response.data);
            setEmployees(response.data)
        } catch (error) {
            console.log('Failed to fetch Employees', error);

        }

    }

    useEffect(() => {
        getAllEmployees()
    }, [])
        async function handleDelete(employeeId){
        try{
       await authRequest({ 
        method: 'delete',
         url: `http://127.0.0.1:8000/api/employees/${employeeId}/` })
         getAllEmployees()
        } catch (error){
        console.log('Failed to delete an emplyee', error);

        }

    }

    return (
        <div>
            <div>
                <h2>Employees</h2>

                <Link to='/employees/add'>
                    <button>
                        + Add Employee
                    </button>
                </Link>
            </div>

            {employees.length === 0 ? (
                <p> No employees found. </p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                     {employees.map((employee)=>(
                      <tr key={employee.id}>
                        <td>{employee.first_name} {employee.last_name}</td>
                        <td>{employee.email} </td>
                        <td>{employee.department || 'No Department'} </td>
                        <td>{employee.role} </td>
                        <td>
                <Link to={`/employees/${employee.id}/edit`} >
                                <button>
                                    ✏️
                                </button>
                            </Link>
                            <button onClick={()=> handleDelete(employee.id)}>
                            delete</button>
                        </td>

                      </tr>  


                     ))}   
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default EmployeeList
