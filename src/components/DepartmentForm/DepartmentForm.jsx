import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router";
import { authRequest } from "../../lib/auth"
import { Save, ArrowLeft } from 'react-feather';
function DepartmentForm() {
    const navigate = useNavigate()
    const { departmentId } = useParams()
    console.log(departmentId);


    const [formData, setFormData] = useState({
        name: '',
        description: '',

    })

    // const [error, setError] = useState(null);

    async function getSingleDepartment() {
        try {
            const response = await authRequest({
                method: 'get',
                url: `http://127.0.0.1:8000/api/departments/${departmentId}`
            })
            console.log(response.data);
            setFormData(response.data)
        } catch (error) {
            console.log('Failed to fetch a department', error);

        }
    }

    useEffect(() => {
        if (departmentId) {
            getSingleDepartment()
        }
    }, [])


    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        //  // Send a POST request to our backend with all of the form data as JSON
        const request = {
            method: departmentId ? 'put' : 'post',
            url: departmentId ?
                `http://127.0.0.1:8000/api/departments/${departmentId}/`
                :
                'http://127.0.0.1:8000/api/departments/',
            data: formData

        }
        try {
            const response = await authRequest(request)
            if (response.status === 201 || response.status === 200) {
                navigate('/departments')
            }
        } catch (err) {
            console.log('Failed to save a department', err)

        }
    }

    return (
        <div>
            < form onSubmit={handleSubmit} >
                <h1 className='form-title'> {departmentId ? `Edit Depatment ` : 'Add New Depatment'} </h1>
                <div>
                    <label htmlFor="name">Name</label>
                    <input value={formData.name} onChange={handleChange} id='name' name='name' type="text" required />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea value={formData.description} onChange={handleChange} name="description" id="description" />
                </div>

                {/* {error && (
                    <div style={{color:'red'}} > 
                        <strong>Error:</strong> {error}
                    </div>
                )} */}

                <div className='form-actions'>
                    <button type='submit' className='btn btn-save' >
                        <Save size={18} />
                        Save </button>
                    <button type='button' className='btn btn-cancel' onClick={() => navigate('/departments')} >
                        <ArrowLeft size={18} />
                        Cancel </button>
                </div>

            </form>
        </div>
    )
}

export default DepartmentForm
