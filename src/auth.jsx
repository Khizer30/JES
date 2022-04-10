import React, { useState, useContext, createContext } from "react" ;
import { useNavigate } from "react-router-dom" ;

// Variable
const AuthContext = createContext(undefined) ;

// useAuth Hook
function useAuth()
{
  return useContext(AuthContext) ;
}

// AuthProvider Component
function AuthProvider({ children })
{
  // Variables
  const [user, setUser] = useState(localStorage.getItem("user")) ;
  const navigate = useNavigate() ;

  // Log In
  const login = (x) =>
  {
    setUser(x) ;
    localStorage.setItem("user", x) ;
    navigate("/", { replace: true }) ;
  }

  // Log Out
  const logout = () =>
  {
    setUser(undefined) ;
    localStorage.clear() ;
    navigate("/", { replace: true }) ;
  }

  let html =
  (
  <>
    <AuthContext.Provider value={{ user, login, logout }}>
      { children }
    </AuthContext.Provider>
  </>
  ) ;

  return html ;
}

// Export AuthProvider & useAuth
export { AuthProvider, useAuth } ;