import LogOutButton from '../Auth/LogOutButton'
import { Link } from 'react-router'
import './NavBar.scss'
function NavBar({ user, setUser }) {
  const isAdmin = user && (user.role === 'ADMIN' || user.is_superuser)
  return (
    <nav className='navbar'>
      <div className='navbar-container' >
        <div className='navbar-links'>
          {
            user ? (
              isAdmin ? (
                <>
                  <Link to={'/departments'}> Department </Link>
                  <Link to={'/employees'}> Employees </Link>
                  <Link to={'/tasks'}> Tasks </Link>
                </>
              ) : (
                <>
                  <Link to={'/tasks'}>My Tasks</Link>
                  <Link to={'/profile'}>My Profile</Link>
                </>
              )
            ) : (
              <span className='navbar-brand'>Management System</span>
            )}
        </div>
        <div className='navbar-auth'>
          {user ? (
            <>
              <LogOutButton setUser={setUser} />
            </>
          ) : (
            < Link to={'/login'}>Log In</Link>
          )}
        </div>
      </div>

    </nav>
  )
}


export default NavBar