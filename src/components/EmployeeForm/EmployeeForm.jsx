import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router";
import { authRequest } from "../../lib/auth"
import { Save, ArrowLeft } from 'react-feather';

function EmployeeForm() {
    const navigate = useNavigate()
    const { employeeId } = useParams()
    console.log();

    const [formData, setFormData] = useState({
        user: {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
        },
        role: 'USER',
        department_id: '',

    })
    // from DepartmentList componant, to hold list of deparments for the dropdwon
    const [departments, setDepartments] = useState([])
    async function getAllDepartments() {
        try {
            const response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/departments/' })
            console.log(response.data);
            setDepartments(response.data)
        } catch (error) {
            console.log('Failed to fetch departments', error);
        }
    }

    async function getSingleEmployee() {
        try {
            const response = await authRequest({
                method: 'get',
                url: `http://127.0.0.1:8000/api/employees/${employeeId}/`
            })
            console.log(response.data);
            const employeeData = response.data
            setFormData({
                ...employeeData,
                user: {
                    ...employeeData.user,
                    password: ""
                },
                role: employeeData.role,
                department_id: employeeData.department_id || ''

            })
        } catch (error) {
            console.log('Failed to fetch an employee', error);

        }
    }

    useEffect(() => {
        getAllDepartments()
        if (employeeId) {
            getSingleEmployee()
        }
    }, [])

    function handleChange(event) {
        const { name, value } = event.target
        // check if fileds belongs to user object
        if (['first_name', 'last_name', 'email', 'username', 'password'].includes(name)) {
            setFormData(prevData => ({
                ...prevData,
                user: {
                    ...prevData.user,
                    [name]: value
                }
            }))
        } else {
            // role or department_id
            setFormData(prevData => ({
                ...prevData,
                [name]: value

            }))

        }
    }

    // setFormData({ ...formData, [event.target.name]: event.target.value })


async function handleSubmit(event) {
    event.preventDefault()
    const dataToSend = {
        user: formData.user,
        role: formData.role,
        department_id: formData.department_id || null

    }


    //  // Send a POST/PUT request to our backend with all of the form data as JSON
    const request = {
        method: employeeId ? 'put' : 'post',
        url: employeeId ?
            `http://127.0.0.1:8000/api/employees/${employeeId}/`
            :
            'http://127.0.0.1:8000/api/employees/',
        data: dataToSend

    }
    try {
        const response = await authRequest(request)


        if (response.status === 201 || response.status === 200) {
            navigate('/employees')
        }
    } catch (err) {
        console.log('Failed to save an employee', err)

    }
}

return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1 className='form-title'> {employeeId ? `Edit Employee ` : 'Add New Employee'} </h1>
            <div>
                <label htmlFor="first_name">First Name</label>
                <input value={formData.user.first_name} onChange={handleChange} id='first_name' name='first_name' type="text" required />
            </div>
            <div>
                <label htmlFor="last_name">Last Name</label>
                <input value={formData.user.last_name} onChange={handleChange} id='last_name' name='last_name' type="text" required />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input value={formData.user.email} onChange={handleChange} id='email' name='email' type="email" required />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input value={formData.user.username} onChange={handleChange} id='username' name='username' type="text" required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input value={formData.user.password} onChange={handleChange} id='password' name='password' type="password" required={!employeeId} autoComplete='new-password'/>
            </div>


            <div>

                      <label htmlFor="role">Role </label>
                <select value={formData.role} onChange={handleChange} id='role' name='role' required>
                 <option value="USER">User</option>   
                  <option value="ADMIN">Admin</option>
                </select>
            </div>
            <div>
              <label htmlFor="department_id">Department</label>
                <select value={formData.department_id || ''} onChange={handleChange} id='department_id' name='department_id'>
                    <option value="">No Department</option>
                    {departments.map(department => (
                        <option key={department.id} value={department.id}>{department.name} </option>  
                    ))

                    }
                  
                
                </select>
            </div>

            <div className='form-actions'>
                <button type='submit'className='btn btn-save' >
                    <Save size={18} />
                   Save
                     </button>
                <button type='button' className='btn btn-cancel' onClick={() => navigate('/employees')}>
                    <ArrowLeft size={18} />
                    Cancel 
                    </button>
            </div>

        </form>

    </div>
)
}

export default EmployeeForm
