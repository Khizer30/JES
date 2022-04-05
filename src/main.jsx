import React, { lazy } from "react" ;
import ReactDOM from "react-dom" ;
import loadable from "@loadable/component" ;
import { BrowserRouter, Routes, Route } from "react-router-dom" ;
import styles from "/src/styles.module.css" ;
import database from "/src/firebase.js" ;

const Navbar = loadable(() => import("/src/pages/Navbar.jsx"), { fallback: <div className={ styles.myAni }></div> }) ;
const Home = loadable(() => import("/src/pages/Home.jsx"), { fallback: <div className={ styles.myAni }></div> }) ;
const Print = loadable(() => import("/src/pages/Print.jsx"), { fallback: <div className={ styles.myAni }></div> }) ;
const Add = loadable(() => import("/src/pages/Add.jsx"), { fallback: <div className={ styles.myAni }></div> }) ;
const Delete = loadable(() => import("/src/pages/Delete.jsx"), { fallback: <div className={ styles.myAni }></div> }) ;

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
            <Route path="print" element={ <Print /> } />
            <Route path="add" element={ <Add /> } />
            <Route path="delete" element={ <Delete /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
  ) ;

  return html ;
}

// React Render
ReactDOM.render(<App />, app) ;