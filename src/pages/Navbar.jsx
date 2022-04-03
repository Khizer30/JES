import React from "react" ;
import { Outlet, Link } from "react-router-dom" ;
import styles from "/src/styles.module.css" ;

function Navbar()
{
  let html =
  (
  <>
    <nav className={ "navbar navbar-light navbar-expand-md " + styles.navbar }>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src="/img/logo.png" alt="JES Logo" className={ styles.logo } />
        </Link>
        <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1">
          <span className="visually-hidden"> Toggle Navigation </span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navcol-1" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link"> Print Challan </Link>
            </li>
            <li className="nav-item">
              <Link to="add" className="nav-link"> Add Student </Link>
            </li>
            <li className="nav-item">
              <Link to="delete" className="nav-link"> Delete Student </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <Outlet />
  </>
  ) ;

  return html ;
}

// Export Navbar
export default Navbar ;