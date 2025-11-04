import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { authRequest} from "../../lib/auth"
import { Trash, Edit, User } from 'react-feather'
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation'
import './DepartmentList.scss'


function DepartmentList() {
    const [departments, setDepartments] = useState([])
    const [deptToDelete, setDeptToDelete] = useState(null)
    async function getAllDepartments() {
        // used authRequest insted of  axios.get
        try {
            const response = await authRequest({ method: 'get', url: 'http://127.0.0.1:8000/api/departments/' })
            console.log(response.data);
            setDepartments(response.data)
        } catch (error) {
            console.log('Failed to fetch departments', error);

        }

    }
    useEffect(() => {
        getAllDepartments()
    }, [])

    async function handleConfirmDelete(){
        try{
       await authRequest({ 
        method: 'delete',
         url: `http://127.0.0.1:8000/api/departments/${deptToDelete.id}/` 
        })
         getAllDepartments()
         setDeptToDelete(null)
        } catch (error){
        console.log('Failed to delete departments', error);

        }

    }

    return (
        <div>
            <div className='title-header'> 
            <h2>Departments </h2>

            <Link to='/departments/add'  className='btn-add'>
                    + Add Department
            </Link>
            </div>

            {departments.length ? (
            <div className='dept-grid'> 
                {departments.map((department) => (

                        <div className='dept-card' key={department.id}>
                            <div className='dept-card-header'>
                                   {department.name} 
                            </div>
                          <div className='dept-card-body'>
                            <p className='dept-description' >
                                    {department.description}  </p>  
                             <div className='dept-count'>
                                <span className='count'>
                                <User size={17} />
                                {department.employee_count} Employees
                                </span>
                                </div>         
                                                   
                          </div>
                          <div className='dept-card-actions'>                   
                            <Link to={`/departments/${department.id}/edit`} >
                                <button className='btn-icon btn-edit'>
                                                    <Edit size={17} />
                                </button>
                            </Link>
                            <button  className='btn-icon btn-delete'
                            onClick={()=> setDeptToDelete(department)}>
                                <Trash size={17} />  
                            </button>
                         </div>
                        </div>
                                
                     ))}
                       </div>  
               ) : (
                <h3>No Department. Start by creating a new Department.</h3>
                )
         }

            <DeleteConfirmation
                itemType='department'
                open={deptToDelete != null}
                onClose={() => setDeptToDelete(null)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
}

export default DepartmentList
