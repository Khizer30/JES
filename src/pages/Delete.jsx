import React, { useState } from "react" ;
import { ref, remove } from "firebase/database" ;
import database from "/src/firebase.js" ;
import styles from "/src/styles.module.css" ;

// Get Student Names
function getNames()
{
  let data = JSON.parse(sessionStorage.data) ;
  let names = [] ;
  for (var x in data)
  {
    names.push(x) ;
  }

  return names ;
}

function Delete()
{
  // Variables
  const [student, setStudent] = useState("") ;
  const [names, setNames] = useState(getNames) ;
  // ...
  const [error, setError] = useState("") ;
  const [message, setMes] = useState("") ;
  const [showErr, setShowErr] = useState(false) ;
  const [showMes, setShowMes] = useState(false) ;

  // Title
  document.title = "JES - Remove Student" ;

  // Delete Student
  const delStudent = () =>
  {
    setShowErr(false) ;
    setShowMes(false) ;

    if (student == "")
    {
      setError("Select a Student to Delete") ;
      setShowErr(true) ;
    }
    else
    {
      let theRef = ref(database, "/" + student + "/") ;
      remove(theRef) ;
  
      setMes(student + " Deleted!") ;
      setShowMes(true) ;
      setTimeout(15000, location.reload()) ;
    }
  }

  // Map Options
  const mapper = (x) =>
  {
    let html =
    (
      <>
        <option value={ x } key={ x }> { x } </option>
      </>
    ) ;

    return html ;
  }

  // Get Input
  const handleChange = (event) =>
  {
    setStudent(event.target.value) ;
  }

  // Handle Bug
  const handleSubmit = (event) =>
  {
    event.preventDefault() ;
  }  

  let html =
  (
  <>
    <div className="container-fluid">
      <h1 className={ styles.heading }> Remove Student from Database </h1>
    </div>

    <div className={ "container-fluid " + styles.mainContainer }>
      { showErr &&
        <div role="alert" className={ "alert alert-danger " + styles.error }>
          <span> { error } </span>
        </div>
      }

      { showMes &&
        <div role="alert" className={ "alert alert-success " + styles.error }>
          <span> { message } </span>
        </div>
      }
            
      <form action="" method="post" target="_self" encType="application/x-www-form-urlencoded" 
      autoComplete="off" noValidate onSubmit={ handleSubmit }>

        <select value={ student } onChange={ handleChange } className="form-select">
          <option value="" disabled className={ styles.hidden }> Select a Student </option>
          {
            names.map(mapper)
          }
        </select>

        <button onClick={ delStudent } type="button" className={ "btn btn-primary " + styles.button }> Submit </button>

      </form>
    </div>
  </>
  ) ;

  return html ;
}

// Export Delete
export default Delete ;