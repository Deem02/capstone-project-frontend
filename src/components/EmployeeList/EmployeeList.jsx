import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { authRequest } from "../../lib/auth"
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation'
import '../../styles/listTable.scss'
import { Trash, Edit } from 'react-feather'
function EmployeeList() {
    const [employees, setEmployees] = useState([])
    const [employeeToDelete, setEmployeeToDelete] = useState(null)

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

    async function handleConfirmDelete() {
        if (!employeeToDelete) return
        try {
            await authRequest({
                method: 'delete',
                url: `http://127.0.0.1:8000/api/employees/${employeeToDelete.id}/`
            })
            getAllEmployees()
            setEmployeeToDelete(null)
        } catch (error) {
            console.log('Failed to delete an emplyee', error);

        }

    }

    return (
        <div>
            <div className='title-header' >
                <h2>All Employees</h2>
                <Link to='/employees/add' className='btn-add' >
                        + Add Employee
                </Link>
            </div>

            {employees.length === 0 ? (
                <p> No employees found. </p>
            ) : (
                <div className='table-container' >
                    <table className='table-data' >
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
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.first_name} {employee.last_name}</td>
                                    <td>{employee.email} </td>
                                    <td>{employee.department || 'No Department'} </td>
                                    <td>{employee.role} </td>
                                    <td>
                                        <Link to={`/employees/${employee.id}/edit`} >
                                            <button className='btn-icon btn-edit'>
                                                <Edit size={17} />
                                            </button>
                                        </Link>
                                        <button className='btn-icon btn-delete'
                                                onClick={() => setEmployeeToDelete(employee)}>
                                                <Trash size={17} /></button>
                                    </td>

                                </tr>


                            ))}
                        </tbody>
                    </table>
                </div>
            )}
                <DeleteConfirmation
                            itemType='employee'
                            open={employeeToDelete != null}
                            onClose={() => setEmployeeToDelete(null)}
                            onConfirm={handleConfirmDelete}
                        />
        </div>
    )
}

export default EmployeeList
