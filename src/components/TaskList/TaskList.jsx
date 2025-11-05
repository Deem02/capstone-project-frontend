import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { authRequest, getUserFromToken } from "../../lib/auth"
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation'
import '../../styles/listTable.scss'
import { Trash, Edit, Eye } from 'react-feather'
function TaskList() {
    const [tasks, setTasks] = useState([])
    const user = getUserFromToken()
    console.log(user);
    
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
            <div className='title-header'>
                <h2>{isAdmin ? 'All Tasks' : 'My Tasks'}</h2>
            {isAdmin && <Link to='/tasks/add' className='btn-add'>
                + Add Task
            </Link>
            }
            </div>
            {tasks.length === 0 ? (
                <p>No tasks found. </p>
            ) : (
                <div className='table-container'>
                <table className='table-data'>
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
                                    {(!isAdmin || task.assignee == user.user_id) ? (
                                          <button onClick={() => handleChangeStatus(task)}>
                                            {task.is_completed ? 'Complete✅' : 'Uncomplete☐'}
                                        </button> 
                                    ) : (
                <span>{task.is_completed ? 'Complete✅' : 'Uncomplete'}</span>

                                    )}
                                </td>

                                <td>{task.assignee_name}</td>
                                <td>{task.department_name || 'No Department'}</td>
                                <td>{task.due_date || '----'}</td>
                                <td>
                                    {isAdmin && (
                                        <>
                                            <Link to={`/tasks/${task.id}/edit`} >
                                                <button className='btn-icon btn-edit'>
                                                    <Edit size={17} />
                                                </button>
                                            </Link>
                                            <button className='btn-icon btn-delete'
                                                onClick={() => setTaskToDelete(task)}>
                                                <Trash size={17} />
                                            </button>
                                        </>
                                    )}
                                    <Link to={`/tasks/${task.id}/view`} >
                                        <button className='btn-icon btn-view'>
                                            <Eye size={17} />
                                        </button>
                                    </Link>


                                </td>



                            </tr>
                        ))}
                    </tbody>
                </table>
</div>

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
