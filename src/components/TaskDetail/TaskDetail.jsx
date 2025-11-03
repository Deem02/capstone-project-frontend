import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { authRequest } from "../../lib/auth"

function TaskDetail() {
    const { taskId } = useParams()
    const navigate = useNavigate()
    const [task, settask] = useState({})


    async function getSingletask() {
        try {

            const response = await authRequest({
                method: 'get',
                url: `http://127.0.0.1:8000/api/tasks/${taskId}`
            })
            console.log(response.data);
            settask(response.data)
        } catch (error) {
            console.log('Failed to fetch a task', error);
    

        }

    }

    useEffect(() => {
        getSingletask()
    }, [])


    return (
        <div>
            <div>
                <h2>{task.title} </h2>
                <div>
                   <strong>Status:</strong> <span>{task.is_completed ? 'Complete✅' : 'Uncomplete☐'}</span>
                       
                </div>
            </div>
            <div> 
                 <p> <strong>Description:</strong> {task.description || 'No Description'} </p>
                <p> <strong>Assignee:</strong> {task.assignee_name} </p>
                <p> <strong>Department:</strong> {task.department_name || 'No Department'}</p>
                <p> <strong>Due Date:</strong> {task.due_date || 'No due date'} </p>
            </div>
            <button onClick={()=> navigate('/tasks')}> Back </button>
        </div>
    )
}

export default TaskDetail
