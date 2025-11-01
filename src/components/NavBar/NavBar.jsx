import LogOutButton from '../Auth/LogOutButton'
import { Link } from 'react-router'
function NavBar({ user, setUser }) {
  const isAdmin = user && (user.role === 'ADMIN' || user.is_superuser)
  return (
    <nav>
      {
        user ? (
          <>
            <LogOutButton setUser={setUser} />
            {
              isAdmin ? (
                <>
                  <Link to={'/departments'}> department </Link>
                  <Link to={'/employees'}> employees </Link>
                  <Link to={'/tasks'}> tasks </Link>
                </>
              ) : (
                <>
                  <Link to={'/tasks'}>My Tasks</Link>
                  <Link to={'/profile'}>My Profile</Link>
                </>

              )}
          </>
        ) : (
          <>
            <Link to={'/login'}>Log In</Link>
          </>
        )}

    </nav>
  )
}

export default NavBar