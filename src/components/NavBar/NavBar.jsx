import LogOutButton from '../Auth/LogOutButton'
import { Link } from 'react-router'
function NavBar({ user, setUser }) {
  return (
    <nav>
      {
        user
          ?
          <LogOutButton setUser={setUser} />
          :
          <>
            {/* <Link to={'/signup'}>Sign Up</Link> */}
            <Link to={'/login'}>Log In</Link>
          </>
      }
      <Link to={'/departments'}> department </Link>
      <Link to={'/employees'}> employees </Link>
      {/* <Link to={'/departments/new'}>Add A department</Link> */}
    </nav>
  )
}

export default NavBar