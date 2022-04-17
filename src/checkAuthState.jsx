import React from "react" ;
import { useAuth } from "/src/auth.jsx" ;
import { Navigate } from "react-router-dom" ;

// RequireAuth Component
function RequireAuth({ children })
{
  // Variable
  const auth = useAuth() ;

  if (!auth.user)
  {
    return <Navigate to="*" /> ;
  }
  else
  {
    return children ;
  }
}

// Export RequireAuth
export { RequireAuth } ;