import { createContext, useEffect, useState } from "react";
import service from "../services/service.config"


const AuthContext = createContext()

function AuthWrapper(props) {

  const [ isUserActive, setIsUserActive ] = useState(false)
  const [ activeUserId, setActiveUserId ] = useState(null)
  const [ isPageLoading, setIsPageLoading ] = useState(true)
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    verifyToken()
  }, [])

  const verifyToken = async () => {
    
    setIsPageLoading(true)

    try {
      
      const response = await service.get("/auth/verify")
      console.log(response)

      setIsUserActive(true)
      setActiveUserId(response.data._id)
      setUserRole(response.data.role);
      setIsPageLoading(false)

    } catch (error) {
      console.log(error)
      setIsUserActive(false)
      setActiveUserId(null)
      setIsPageLoading(false)
    }
  }

  const passedContext = {
    verifyToken,
    isUserActive,
    activeUserId,
    userRole,
  }


  if (isPageLoading === true) {
    return <h3>... Validando credenciales</h3>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthWrapper
}