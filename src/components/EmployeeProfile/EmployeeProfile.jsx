import React from 'react'
import { useEffect, useState } from 'react'
import { authRequest } from "../../lib/auth"
import './EmployeeProfile.scss'
function EmployeeProfile() {
    const [employee, setEmployee] = useState(null)

    async function getSingleEmployee() {
        try {
            const response = await authRequest({
                method: 'get',
                url: `http://127.0.0.1:8000/api/profile/`
            })
            console.log(response.data);
            const employeeData = response.data
            setEmployee(employeeData)
        } catch (error) {
            console.log('Failed to fetch an employee', error);

        }
    }

    useEffect(() => {

        getSingleEmployee()

    }, [])

    if (!employee) {
        return <p> Loading Profile </p>
    }
    return (
        <div className='profile-wrapper' >
            <div className='profile-container'>
                <h1 className='profile-title'> My Profile </h1>
                <div>
                    <p> <strong> Full Name: </strong> {employee.user.first_name} {employee.user.last_name}  </p>
                    <p> <strong> Username: </strong> {employee.user.username}  </p>
                    <p> <strong> Email: </strong> {employee.user.email}  </p>
                    <p> <strong> Role: </strong> {employee.role}  </p>
                    <p> <strong> Department: </strong> {employee.department || 'No Department'}  </p>

                </div>
            </div>
        </div>
    )
}

export default EmployeeProfile
