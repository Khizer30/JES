import React from "react" ;
import { Outlet, NavLink } from "react-router-dom" ;
import { useAuth } from "/src/auth.jsx" ;
import styles from "/src/styles.module.css" ;

// Image
import logo from "/img/logo.png" ;

// Navbar Component
function Navbar()
{
  // Variable
  const auth = useAuth() ;

  // Log Out
  const handleLogOut = () =>
  {
    auth.logout() ;
  }

  let html =
  (
  <>
  { auth.user &&
  <>
    <nav className={ "navbar navbar-light navbar-expand-md " + styles.navbar }>
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <img src={ logo } alt="JES Logo" className={ styles.logo } />
        </NavLink>
        <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1">
          <span className="visually-hidden"> Toggle Navigation </span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navcol-1" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="print" className="nav-link"> Print Challan </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="edit" className="nav-link"> Edit Student </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="add" className="nav-link"> Add Student </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="delete" className="nav-link"> Delete Student </NavLink>
            </li>
              <li className="nav-item">
                <p onClick={ handleLogOut } className={ "nav-link " + styles.cursor }> Log Out </p>
              </li>
          </ul>
        </div>
      </div>
    </nav>

    <Outlet />
  </>
  }
  { !auth.user &&
  <>
    <Outlet />
  </>
  }
  </>
  ) ;

  return html ;
}

// Export Navbar
export default Navbar ;