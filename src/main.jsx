import React, { lazy } from "react" ;
import ReactDOM from "react-dom" ;
import loadable from "@loadable/component" ;
import { BrowserRouter, Routes, Route } from "react-router-dom" ;
import database from "/src/firebase.js" ;

import MyAni from "/src/pages/MyAni.jsx" ;
const Navbar = loadable(() => import("/src/pages/Navbar.jsx"), { fallback: <MyAni /> }) ;
const Home = loadable(() => import("/src/pages/Home.jsx"), { fallback: <MyAni /> }) ;
const Print = loadable(() => import("/src/pages/Print.jsx"), { fallback: <MyAni /> }) ;
const Add = loadable(() => import("/src/pages/Add.jsx"), { fallback: <MyAni /> }) ;
const Delete = loadable(() => import("/src/pages/Delete.jsx"), { fallback: <MyAni /> }) ;

// HTML DOM Element
const app = document.getElementById("app") ;

// App Component
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