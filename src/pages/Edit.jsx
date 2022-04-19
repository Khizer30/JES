import React, { useState } from "react" ;
import { ref, update } from "firebase/database" ;
import { database, getData } from "/src/firebase.js" ;
import styles from "/src/styles.module.css" ;

// Image
import editImage from "/img/edit.png" ;

// Edit Component
function Edit()
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
          setError("Lengthy Input") ;
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
      setShowErr(true) ;
      setError("Don't Leave Any Field Empty") ;
      setErrType("alert-danger") ;
      return false ;
    }
  }

  // Variables
  let names = getNames() ;
  const [student, setStudent] = useState("") ;
  const [inputs, setInputs] = useState({}) ;
  const classes = ["Playgroup", "Nursery", "Grade I", "Grade II", "Grade III", "Grade IV", "Grade V", "Grade VI", "Grade VII"] ;
  // ... 
  const [showRest, setShowRest] = useState(false) ;
  const [error, setError] = useState("") ;
  const [errType, setErrType] = useState("") ;
  const [showErr, setShowErr] = useState(false) ;

  // Title
  document.title = "JES - Edit Student" ;

  // Handle Change
  const handleChange = (event) =>
  {
    setInputs(values => ({ ...values, [event.target.name]: event.target.value })) ;
  }
  
  // Send Data to Firebase
  const sendData = () =>
  {
    let theRef = ref(database, "/" + student) ;
    update(theRef, 
    {
      "Father": inputs.father,
      "Class": inputs.theClass,
      "Reg": inputs.reg,
      "Fees": inputs.fees,
      "Arrears": inputs.arrears
    })
  }

  // Edit Student
  const editStudent = () =>
  {
    setShowErr(false) ;

    if (checkInput(inputs.father, 50, "^[a-zA-Z].*[\s\.]*$") &&
    checkInput(inputs.theClass, 50, "^[a-zA-Z].*[\s\.]*$") &&
    checkInput(inputs.reg, 50, "[A-Z\d]") &&
    checkInput(inputs.fees, 6, "^[0-9]+$") &&
    checkInput(inputs.arrears, 6, "^[0-9]+$"))
    {
      sendData() ;

      setError(student + " Edited!") ;
      setErrType("alert-success") ;
      setShowErr(true) ;
    }
  }

  // Get Remaining Values
  const handleStudent = (event) =>
  {
    let name = event.target.value ;
    setStudent(name) ;

    setShowRest(true) ;

    inputs.father = data[name]["Father"] ;
    inputs.theClass = data[name]["Class"] ;
    inputs.reg = data[name]["Reg"] ;
    inputs.fees = data[name]["Fees"] ;
    inputs.arrears = data[name]["Arrears"] ;
  }
 
  // Map Options
  const mapper = (x) =>
  {
    let html =
    (
    <>
      <option value={ x }> { x } </option>
    </>
    ) ;

    return html ;
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
      <h1 className={ styles.heading }> Edit Student </h1>
    </div>

    <div className={ "container-fluid " + styles.mainContainer }>
      <div className="row">
        <div className="col-md-6">
          <form action="" method="post" target="_self" encType="application/x-www-form-urlencoded" 
          autoComplete="off" noValidate onSubmit={ handleSubmit }>

          <div role="alert" className={ (showErr ? styles.vis : styles.displayNone) + " " + styles.error + " alert " + errType}>
            <span> { error } </span>
          </div>

            <div className="form-floating mb-3 mt-3">
              <select name="student" value={ student } onChange={ handleStudent } autoFocus className={ "form-select " + styles.input2 }>
                <option value="" disabled required className={ styles.hidden }> Select a Student </option>
                {
                  names.map(mapper)
                }
              </select>
              <label htmlFor="student"> Name </label> 
            </div>

            <div className={ showRest ? styles.visible : styles.invisible }>
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
                <select name="theClass" value={ inputs.theClass || "" } onChange={ handleChange } className={ "form-select " + styles.input2 }>
                  <option value="" disabled required className={ styles.hidden }> Select a Class </option>
                  {
                    classes.map(mapper)
                  }
                </select>
                <label htmlFor="theClass"> Class </label>
              </div>

              <div className="form-floating mb-3 mt-3">
                <input 
                  name="reg" 
                  type="text"
                  maxLength="50"
                  minLength="5"
                  inputMode="text"
                  pattern="[A-Z\d]"
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

              <div className="form-floating mb-3 mt-3">
                <input 
                  name="arrears" 
                  type="number"
                  max="100000"
                  inputMode="numeric"
                  pattern="^[0-9]+$"
                  required
                  placeholder="Arrears"
                  className={ "form-control " + styles.input } 
                  onChange={ handleChange }
                  value={ inputs.arrears || "" }
                />
                <label htmlFor="arrears"> Arrears </label>
              </div>

              <button onClick={ editStudent } type="button" className={ "btn btn-primary " + styles.button }> Edit Student </button>
            </div>
          </form>
        </div>
        <div className="col-md-6 d-md-flex align-items-md-center">
          <img src={ editImage } alt="Fee Challan Image" className={ styles.image } />
        </div>
      </div>
    </div>
  </>
  ) ;

  return html ;
}

// Export Edit
export default Edit ;