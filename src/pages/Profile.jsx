import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

function Profile() {
    const navigate = useNavigate();

    const { verifyToken } = useContext(AuthContext)

    const handleLogout = () => {
      localStorage.removeItem("authToken")
  
      // ! ...
      verifyToken() // verificar un token que no existe para reiniciar los estados
  
      navigate("/login")
    }


  return (
    <div>
        <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Profile