import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { authRequest, getUserFromToken } from "../../lib/auth"

import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation'
import {Trash} from 'react-feather'
function TaskList() {
    const [tasks, setTasks] = useState([])
    const user = getUserFromToken()
    const isAdmin = user && (user.role === 'ADMIN' || user.is_superuser)
    const [taskToDelete, setTaskToDelete] = useState(null)

    async function getAllTasks() {
        try {
            const response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/tasks/' })
            console.log(response.data);
            setTasks(response.data)
        } catch (error) {
            console.log('Failed to fetch Tasks', error);

        }

    }
    useEffect(() => {
        getAllTasks()
    }, [])

    async function handleConfirmDelete() {
        if (!taskToDelete) return
        try {
            await authRequest({
                method: 'delete',
                url: `http://127.0.0.1:8000/api/tasks/${taskToDelete.id}/`
            })
            getAllTasks()
            setTaskToDelete(null)
        } catch (error) {
            console.log('Failed to delete a task', error);

        }
    }
    async function handleChangeStatus(task) {
        try {
            await authRequest({
                method: 'patch',
                url: `http://127.0.0.1:8000/api/tasks/${task.id}/`,
                data: { is_completed: !task.is_completed }
            })
            getAllTasks()
        } catch (error) {
            console.log('Failed to update a task', error);

        }
    }
    return (
        <div>
            <div>
                <h2>{isAdmin ? 'All Tasks' : 'My Tasks'}</h2>
                {isAdmin && <Link to='/tasks/add'>
                    <button>
                        + Add Task
                    </button>
                </Link>
                }
            </div>
            {tasks.length === 0 ? (
                <p>No tasks found. </p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Title </th>
                            <th>Status </th>
                            <th>Assignee </th>
                            <th>Department </th>
                            <th>Due Date </th>
                            <th>Actions </th>
                        </tr>
                    </thead>

                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>
                                    {isAdmin ? (
                                        <span>{task.is_completed ? 'Complete✅' : 'Uncomplete☐'}</span>
                                    ) : (
                                        <button onClick={() => handleChangeStatus(task)}>
                                            {task.is_completed ? 'Complete✅' : 'Uncomplete☐'}
                                        </button>
                                    )}
                                </td>

                                <td>{task.assignee_name}</td>
                                <td>{task.department_name || 'No Department'}</td>
                                <td>{task.due_date || '---'}</td>
                                <td>
                                    {isAdmin && (
                                        <>
                                            <Link to={`/tasks/${task.id}/edit`} >
                                                <button>
                                                    ✏️
                                                </button>
                                            </Link>
                                            <button onClick={() => setTaskToDelete(task)}>
                                                <Trash size={16} />
                                            </button>
                                        </>
                                    )}
                                    <Link to={`/tasks/${task.id}/view`} >
                                        <button>
                                            view
                                        </button>
                                    </Link>


                                </td>



                            </tr>
                        ))}
                    </tbody>
                </table>

            
            )
            }

<DeleteConfirmation
itemType='task'
open={taskToDelete != null}
onClose={() => setTaskToDelete(null)}
onConfirm={handleConfirmDelete}
/>
        </div>
    )
}

export default TaskList
