import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router";
import { authRequest } from "../../lib/auth"
import { Save, ArrowLeft } from 'react-feather';

function TaskForm() {
    const navigate = useNavigate()
    const { taskId } = useParams()
    console.log(taskId);
    // State for the dropdowns
    // const [departments, setDepartments] = useState([])
    const [employees, setEmployees] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due_date: '',
        assignee: '',
    })
    async function getSingleTask() {
        try {         
            const response = await authRequest({
                method: 'get',
                url: `http://127.0.0.1:8000/api/tasks/${taskId}/`
            })
            console.log(response.data);
            const taskData = response.data
            setFormData({
                title: taskData.title,
                description: taskData.description,
                due_date: taskData.due_date || '',
                assignee: taskData.assignee, 
            
            })
        } catch (error) {
            console.log('Failed to fetch a task', error);

        }
    }
    useEffect(() => {
        async function getData() {
            try {
                // const deptResponse = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/departments/` })
                // setDepartments(deptResponse.data)
                const empResponse = await authRequest({ method: 'get', url: `http://127.0.0.1:8000/api/employees/` })
                setEmployees(empResponse.data)
                if(taskId){
                    getSingleTask()
                }
            } catch (error) {
                console.log('Failed to fetch data', error);
            }
        }
        getData()
    },
        [taskId])

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name] : value
        }))

    }

            async function handleSubmit(event) {
            event.preventDefault()
            const request = {
                method: taskId? 'put' : 'post',
                url: taskId?
                `http://127.0.0.1:8000/api/tasks/${taskId}/` 
                :
                'http://127.0.0.1:8000/api/tasks/',
                data:{
                    ...formData,
                    due_date: formData.due_date || null
                }
    
            }
            try {
            const response = await authRequest(request)
            if(response.status===201 || response.status===200){
                navigate('/tasks')
            }
        } catch (err) {
            console.log('Failed to save a task',err)
    
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
          <h1 className='form-title' > {taskId ? `Edit Task ` : 'Add New Task'} </h1>
          <div>
                <label htmlFor="title">Title</label>
                <input value={formData.title} onChange={handleChange} id='title' name='title' type="text" required />
            </div>
          <div>
                <label htmlFor="description">Description</label>
                <textarea value={formData.description} onChange={handleChange} id='description' name='description'/>
            </div>
                      <div>
                <label htmlFor="due_date">Due Date</label>
                <input value={formData.due_date} onChange={handleChange} id='due_date' name='due_date' type="date" />
            </div>
            <div>
                <label htmlFor="assignee">Assignee </label>
                <select value={formData.assignee} onChange={handleChange} id='assignee' name='assignee' required>
                 <option value="" disabled>Select an employee</option>  
                 {employees.map(employee => (
                 <option key={employee.id} value={employee.user_id}> {employee.first_name} {employee.last_name}   </option>

                 ))} 
                </select>
            </div>
            {/* <div>
                <label htmlFor="department">Department </label>
                <select value={formData.department || ''} onChange={handleChange} id='department' name='department'>
                 <option value="" >No Department</option>  
                 {departments.map(department => (
                 <option key={department.id} value={department.id}> {department.name}   </option>

                 ))} 
                </select> */}
            {/* </div> */}
    
                <div className='form-actions'>
                <button type='submit' className='btn btn-save' >
                    <Save size={18} />
                   Save
                     </button>
                <button type='button' className='btn btn-cancel' onClick={() => navigate('/tasks')} >
                    Cancel 
                    </button>
            </div>
</form>
        </div>
    )
}

export default TaskForm
