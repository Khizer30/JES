import React from "react" ;
import ReactDOM from "react-dom" ;
import { BrowserRouter, Routes, Route } from "react-router-dom" ;
import loadable from "@loadable/component" ;
import { AuthProvider, useAuth } from "/src/auth.jsx" ;
import { RequireAuth } from "/src/checkAuthState.jsx" ;

import MyAni from "/src/pages/MyAni.jsx" ;
const Navbar = loadable(() => import("/src/pages/Navbar.jsx"), { fallback: <MyAni /> }) ;
const Home = loadable(() => import("/src/pages/Home.jsx"), { fallback: <MyAni /> }) ;
const LogIn = loadable(() => import("/src/pages/LogIn.jsx"), { fallback: <MyAni /> }) ;
const Print = loadable(() => import("/src/pages/Print.jsx"), { fallback: <MyAni /> }) ;
const Edit = loadable(() => import("/src/pages/Edit.jsx"), { fallback: <MyAni /> }) ;
const Add = loadable(() => import("/src/pages/Add.jsx"), { fallback: <MyAni /> }) ;
const Delete = loadable(() => import("/src/pages/Delete.jsx"), { fallback: <MyAni /> }) ;
const NoPage = loadable(() => import("/src/pages/NoPage.jsx"), { fallback: <MyAni /> }) ;

// HTML DOM Element
const app = document.getElementById("app") ;

// Root Component
function Root()
{
  // Variable
  const auth = useAuth() ;

  let html =
  (
  <>
  { auth.user &&
  <>
    <Home />
  </>
  }
  { !auth.user &&
  <>
    <LogIn />
  </>
  }
  </>
  ) ;

  return html ;
}

// App Component
function App()
{
  let html =
  (
  <>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={ <Navbar /> }>
            <Route index element={ <Root /> } />

            <Route path="print" element={ <RequireAuth> <Print /> </RequireAuth> } />
            <Route path="edit" element={ <RequireAuth> <Edit /> </RequireAuth> } />
            <Route path="add" element={ <RequireAuth> <Add /> </RequireAuth> } />
            <Route path="delete" element={ <RequireAuth> <Delete /> </RequireAuth> } />

            <Route path="*" element={ <NoPage /> } />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </>
  ) ;

  return html ;
}

// React Render
ReactDOM.render(<App />, app) ;