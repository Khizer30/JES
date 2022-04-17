import React, { useState } from "react" ;
import { useAuth } from "/src/auth.jsx" ;
import { signInWithEmailAndPassword } from "firebase/auth" ;
import { auth } from "/src/firebase.js" ;
import styles from "/src/styles.module.css" ;

// LogIn Component
function LogIn()
{
  // Variables
  const [inputs, setInputs] = useState({}) ;
  const admin = useAuth() ;
  // ...
  const [error, setError] = useState("") ;
  const [errType, setErrType] = useState("") ;
  const [showErr, setShowErr] = useState(false) ;

  // Title
  document.title = "JES - Log In" ;

  // Check Input
  const checkInput = (it, len, reg) =>
  {
    var pattern = new RegExp(reg) ;

    if (it !== "" && it !== undefined)
    {
      if (pattern.test(it))
      {
        if (it.length <= len)
        {
          return true ;
        }
        else
        {
          setError("Don't Leave Any Field Empty") ;
          setErrType("alert-danger") ;
          setShowErr(true) ;
          return false ;
        }
      }
      else
      {
        setError("Invalid Input") ;
        setErrType("alert-danger") ;
        setShowErr(true) ;
        return false ;
      }
    }
    else
    {
      setError("Don't Leave Any Field Empty") ;
      setErrType("alert-danger") ;
      setShowErr(true) ;
      return false ;
    }
  }

  // Handle Change
  const handleChange = (event) =>
  {
    setInputs(values => ({ ...values, [event.target.name]: event.target.value })) ;
  }
  
  // Handle Bug
  const handleSubmit = (event) =>
  {
    event.preventDefault() ;
  }

  // Sign In
  const signIn = (email, password) =>
  {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>
    {
      const user = JSON.stringify(userCredential.user) ;
      admin.login(user) ;
    })
    .catch((err) =>
    {
      let message = err.message ;

      if (message == "Firebase: Error (auth/user-not-found).")
      {
        setError(email + " Not Found") ;
      }
      else if (message == "Firebase: Error (auth/wrong-password).")
      {
        setError("Invalid Password") ;
      }
      else
      {
        setError(err.message) ;
      }

      setErrType("alert-danger") ;
      setShowErr(true) ;
    })
  }

  // Check Email & Password
  const checkCred = () =>
  {
    setShowErr(false) ;

    if (checkInput(inputs.email, 320, "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|info)\\b")
    && checkInput(inputs.password, 30, "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&=])[A-Za-z\\d@$!%*#?&=]{8,}$"))
    {
      signIn(inputs.email, inputs.password) ;
    }
  }

  let html =
  (
  <>
    <section className={ "d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center login-clean " + styles.LogInSec }>
    <form action="" method="post" target="_self" encType="application/x-www-form-urlencoded" 
    autoComplete="off" noValidate onSubmit={ handleSubmit }>
        <div className="illustration">
          <img src="/img/home_logo.png" className={ styles.LogInImg } />
        </div>

        <div role="alert" className={ (showErr ? styles.vis : styles.displayNone) + " " + styles.error + " alert " + errType}>
          <span> { error } </span>
        </div>

        <div className="mb-3">
          <input 
            name="email" 
            type="email"
            maxLength="320"
            inputMode="email"
            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|info)\b"
            required
            autoFocus
            placeholder="Enter Your Email"
            className={ "form-control " + styles.LogInInput } 
            onChange={ handleChange }
            value={ inputs.email || "" }
          />
        </div>

        <div className="mb-3">
          <input 
            name="password" 
            type="password"
            maxLength="30"
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&=])[A-Za-z\d@$!%*#?&=]{8,}$"
            required
            placeholder="Enter Your Password"
            className={ "form-control " + styles.LogInInput } 
            onChange={ handleChange }
            value={ inputs.password || "" }
          />
        </div>

        <div className="mb-3">
          <button type="button" onClick={ checkCred } className={ "btn btn-primary d-block w-100 " + styles.LogInInput }> Log In </button>
        </div>

      </form>
    </section>
  </>
  ) ;

  return html ;
}

// Export LogIn
export default LogIn ;