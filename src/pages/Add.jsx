import React, { useState } from "react" ;
import { set, ref } from "firebase/database" ;
import database from "/src/firebase.js" ;
import styles from "/src/styles.module.css" ;

// Image
import databaseLogo from "/img/add.png" ;

// Add Component
function Add()
{
  // Variables
  const [inputs, setInputs] = useState({}) ;
  // ...
  const [error, setError] = useState("") ;
  const [message, SetMes] = useState("") ;
  const [showErr, setShowErr] = useState(false) ;
  const [showMes, setShowMes] = useState(false) ;

  // Title
  document.title = "JES - Add Student" ;

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
          setShowErr(true) ;
          setError("Lengthy Input") ;
          return false ;
        }
      }
      else
      {
        setShowErr(true) ;
        setError("Invalid Input") ;
        return false ;
      }
    }
    else
    {
      setShowErr(true) ;
      setError("Don't Leave Any Field Empty") ;
      return false ;
    }
  }

  // Add Student
  const addStudent = () =>
  {
    setShowErr(false) ;
    setShowMes(false) ;

    if (checkInput(inputs.name, 50, "^[a-zA-Z].*[\s\.]*$") &&
    checkInput(inputs.father, 50, "^[a-zA-Z].*[\s\.]*$") &&
    checkInput(inputs.theClass, 50, "^[a-zA-Z].*[\s\.]*$") &&
    checkInput(inputs.reg, 50, "^[a-zA-Z].*[\s\.]*$") &&
    checkInput(inputs.fees, 6, "^[0-9]+$"))
    {
      sendData() ;

      SetMes(inputs.name + " Added To Database") ;
      setShowMes(true) ;
    }
  }

  // Send Data To Database
  const sendData = () =>
  {
    set(ref(database, inputs.name + "/"),
    {
      "Father": inputs.father,
      "Class": inputs.theClass,
      "Reg": inputs.reg,
      "Fees": inputs.fees
    }) ;
  }

  // Get Input
  const handleChange = (event) =>
  {
    let name = event.target.name ;
    let value = event.target.value ;
    
    if (name == "name" || name == "father" || name == "reg")
    {
      value = value.toUpperCase() ;
    }

    setInputs(values => ({ ...values, [name]: value })) ;
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
      <h1 className={ styles.heading }> Add Student to Database </h1>
    </div>

    <div className={ "container-fluid " + styles.mainContainer }>
      <div className="row">
        <div className="col-md-6">

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
            
            <div className="form-floating mb-3 mt-3">
              <input 
                name="name" 
                type="text"
                maxLength="50"
                minLength="5"
                inputMode="text"
                pattern="^[a-zA-Z].*[\s\.]*$"
                required
                autoFocus
                placeholder="Name"
                className={ "form-control " + styles.input } 
                onChange={ handleChange }
                value={ inputs.name || "" }
              />
              <label htmlFor="name"> Name </label>
            </div>

            <div className="form-floating mb-3 mt-3">
              <input 
                name="father" 
                type="text"
                maxLength="50"
                minLength="5"
                inputMode="text"
                pattern="^[a-zA-Z].*[\s\.]*$"
                required
                placeholder="Father's Name"
                className={ "form-control " + styles.input } 
                onChange={ handleChange }
                value={ inputs.father || "" }
              />
              <label htmlFor="father"> Father's Name </label>
            </div>

            <div className="form-floating mb-3 mt-3">
              <input 
                name="theClass" 
                type="text"
                maxLength="50"
                minLength="5"
                inputMode="text"
                pattern="^[a-zA-Z].*[\s\.]*$"
                required
                placeholder="Class"
                className={ "form-control " + styles.input2 } 
                onChange={ handleChange }
                value={ inputs.theClass || "" }
              />
              <label htmlFor="theClass"> Class </label>
            </div>

            <div className="form-floating mb-3 mt-3">
              <input 
                name="reg" 
                type="text"
                maxLength="50"
                minLength="5"
                inputMode="text"
                pattern="^[a-zA-Z].*[\s\.]*$"
                required
                placeholder="Reg No."
                className={ "form-control " + styles.input } 
                onChange={ handleChange }
                value={ inputs.reg || "" }
              />
              <label htmlFor="reg"> Reg No. </label>
            </div>

            <div className="form-floating mb-3 mt-3">
              <input 
                name="fees" 
                type="number"
                max="100000"
                inputMode="numeric"
                pattern="^[0-9]+$"
                required
                placeholder="Fees"
                className={ "form-control " + styles.input } 
                onChange={ handleChange }
                value={ inputs.fees || "" }
              />
              <label htmlFor="fees"> Fees </label>
            </div>

            <button type="button" onClick={ addStudent } className={ "btn btn-primary " + styles.button }> Submit </button>
          
          </form>
        </div>

        <div className="col-md-6 d-md-flex align-items-md-center">
          <img src={ databaseLogo } alt="Database Clipart" className={ styles.image } />
        </div>

      </div>
    </div>
  </>
  ) ;

  return html ;
}

// Export Add
export default Add ;