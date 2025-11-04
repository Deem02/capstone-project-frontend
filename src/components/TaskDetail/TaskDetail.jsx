import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { authRequest } from "../../lib/auth"
import './TaskDetail.scss'
import { ArrowLeft } from 'react-feather'

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
        <div className='task-wrapper'>
            <div className='task-container'>
                <h2 className='task-title'>{task.title} </h2>
                <div className='task-info'>
                    <p>
                        <strong>Status:</strong> {task.is_completed ? 'Complete✅' : 'Uncomplete'}
                    </p>

                    <p> <strong>Description:</strong>  {task.description || 'No Description'}</p>
                    <p> <strong>Assignee:</strong>   {task.assignee_name} </p>
                    <p> <strong>Department:</strong>   {task.department_name || 'No Department'} </p>
                    <p> <strong>Due Date:</strong>   {task.due_date || 'No due date'} </p>

                    <div className='task-actions'>
                        <button className='btn btn-cancel' onClick={() => navigate('/tasks')}>
                            <ArrowLeft size={18} />
                        </button></div>
                </div>
            </div></div>
    )
}

export default TaskDetail
