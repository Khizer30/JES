import React, { Suspense, lazy } from "react" ;
import ReactDOM from "react-dom" ;
import { BrowserRouter, Routes, Route } from "react-router-dom" ;
const Navbar = lazy(() => import("/src/pages/Navbar.jsx")) ;
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
      <Suspense fallback={ <div className={ styles.myAni }></div> }>
        <Routes>
          <Route path="/" element={ <Navbar /> }>
            <Route index element={ <Print /> } />
            <Route path="add" element={ <Add /> } />
            <Route path="delete" element={ <Delete /> } />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </>
  ) ;

  return html ;
}

// React Render
ReactDOM.render(<App />, app) ;