import React, { lazy } from "react" ;
import ReactDOM from "react-dom" ;
import database from "/src/firebase.js" ;
import { BrowserRouter, Routes, Route } from "react-router-dom" ;

import Navbar from "/src/pages/Navbar.jsx" ;
import Home from "/src/pages/Home.jsx" ;
const Print = lazy(() => import("/src/pages/Print.jsx")) ;
const Add = lazy(() => import("/src/pages/Add.jsx")) ;
const Delete = lazy(() => import("/src/pages/Delete.jsx")) ;
import styles from "/src/styles.module.css" ;

// HTML DOM Element
const app = document.getElementById("app") ;

function App()
{
  let html =
  (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navbar /> }>
          <Route index element={ <Home /> } />
            <Route path="print" element={ <React.Suspense fallback={ <div className={ styles.myAni }></div> }> <Print /> </React.Suspense> } />
            <Route path="add" element={ <React.Suspense fallback={ <div className={ styles.myAni }></div> }> <Add /> </React.Suspense> } />
            <Route path="delete" element={ <React.Suspense fallback={ <div className={ styles.myAni }></div> }> <Delete /> </React.Suspense> } />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
  ) ;

  return html ;
}

// React Render
ReactDOM.render(<App />, app) ;