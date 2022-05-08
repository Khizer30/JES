import React, { useState } from "react" ;
import { ref, remove } from "firebase/database" ;
import { database } from "/src/firebase.js" ;
import styles from "/src/styles.module.css" ;

// Delete Component
function Delete()
{
  // Get Data from Storage
  let data = JSON.parse(localStorage.getItem("data"))["Student Record"] ;

  // Variables
  const [inputs, setInputs] = useState({ student: "NULL", theClass: "NULL" }) ;
  const [students, setStudents] = useState([]) ;
  const classes = ["Playgroup", "Nursery", "KG", "Grade I", "Grade II", "Grade III", "Grade IV", "Grade V", "Grade VI"] ;
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

    if (inputs.student === "NULL" || inputs.student === undefined)
    {
      setError("Select a Student to Delete") ;
      setErrType("alert-danger") ;
      setShowErr(true) ;
    }
    else
    {
      let theRef = ref(database, "Student Record/" + inputs.theClass + "/" + inputs.student) ;
      remove(theRef) ;
  
      setError(inputs.student + " Deleted!") ;
      setErrType("alert-success") ;
      setShowErr(true) ;

      // Reset
      setInputs({ student: "NULL", theClass: "NULL" }) ;
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
    let name = event.target.name ;
    let value = event.target.value ;

    setInputs(values => ({ ...values, [name]: value })) ;

    // Get Students in Class
    if (name === "theClass")
    {
      setStudents([]) ;

      for (let x in data[value])
      {
        setStudents(values => ([  ...values, x ])) ;
      }
    }
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
          <select name="theClass" value={ inputs.theClass || "" } onChange={ handleChange } autoFocus className="form-select">
            <option value="NULL" disabled required className={ styles.hidden }> Select a Class </option>
            {
              classes.map(mapper)
            }
          </select>
          <label htmlFor="theClass"> Class </label>
        </div>

      { (inputs.theClass !== "NULL") &&
        <div className="form-floating mb-3 mt-3">
          <select name="student" value={ inputs.student || "" } onChange={ handleChange } autoFocus className="form-select">
            <option value="NULL" disabled required className={ styles.hidden }> Select a Student </option>
            {
              students.map(mapper)
            }
          </select>
          <label htmlFor="student"> Name </label>
        </div>
      }

        <button onClick={ delStudent } type="button" className={ "btn btn-primary " + styles.button }> Submit </button>

      </form>
    </div>
  </>
  ) ;

  return html ;
}

// Export Delete
export default Delete ;