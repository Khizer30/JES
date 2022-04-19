import React, { useState } from "react" ;
import { ref, remove } from "firebase/database" ;
import { database, getData } from "/src/firebase.js" ;
import styles from "/src/styles.module.css" ;

// Delete Component
function Delete()
{
  // Fetch Data from Firebase
  getData() ;

  // Get Data from Storage
  let data = JSON.parse(localStorage.getItem("data")) ;

  // Get Student Names
  const getNames = () =>
  {
    let names = [] ;
    for (var x in data)
    {
      names.push(x) ;
    }

    return names ;
  }

  // Variables
  const [student, setStudent] = useState("") ;
  let names = getNames() ;
  // ...
  const [error, setError] = useState("") ;
  const [errType, setErrType] = useState("") ;
  const [showErr, setShowErr] = useState(false) ;

  // Title
  document.title = "JES - Remove Student from Database" ;

  // Delete Student
  const delStudent = () =>
  {
    setShowErr(false) ;

    if (student == "")
    {
      setError("Select a Student to Delete") ;
      setErrType("alert-danger") ;
      setShowErr(true) ;
    }
    else
    {
      let theRef = ref(database, "/" + student + "/") ;
      remove(theRef) ;
  
      setError(student + " Deleted!") ;
      setErrType("alert-success") ;
      setShowErr(true) ;

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
      <div role="alert" className={ (showErr ? styles.vis : styles.displayNone) + " " + styles.error + " alert " + errType}>
        <span> { error } </span>
      </div>
            
      <form action="" method="post" target="_self" encType="application/x-www-form-urlencoded" 
      autoComplete="off" noValidate onSubmit={ handleSubmit }>

        <div className="form-floating mb-3 mt-3">
          <select name="student" value={ student } onChange={ handleChange } autoFocus className="form-select">
            <option value="" disabled required className={ styles.hidden }> Select a Student </option>
            {
              names.map(mapper)
            }
          </select>
          <label htmlFor="student"> Name </label>
        </div>

        <button onClick={ delStudent } type="button" className={ "btn btn-primary " + styles.button }> Submit </button>

      </form>
    </div>
  </>
  ) ;

  return html ;
}

// Export Delete
export default Delete ;