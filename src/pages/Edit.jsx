import React, { useState } from "react" ;
import { ref, update } from "firebase/database" ;
import { database } from "/src/firebase.js" ;
import styles from "/src/styles.module.css" ;

// Image
import editImage from "/img/edit.png" ;

// Edit Component
function Edit()
{
  // Get Data from Storage
  let data = JSON.parse(localStorage.getItem("data"))["Student Record"] ;

  // Check Input
  const checkInput = (it, len, reg) =>
  {
    let pattern = new RegExp(reg) ;

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

  // Check Length
  const checkLength = (it, len) =>
  {
    if (it !== "" && it !== undefined && it !== "NULL")
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
      setShowErr(true) ;
      setError("Don't Leave Any Field Empty") ;
      setErrType("alert-danger") ;
      return false ;
    }
  }

  // Variables
  const [inputs, setInputs] = useState({ student: "NULL", theClass: "NULL", father: "", reg: "", fees: "", arrears: "" }) ;
  const [students, setStudents] = useState([]) ;
  const classes = ["Playgroup", "Nursery", "KG", "Grade I", "Grade II", "Grade III", "Grade IV", "Grade V", "Grade VI"] ;
  // ... 
  const [error, setError] = useState("") ;
  const [errType, setErrType] = useState("") ;
  const [showErr, setShowErr] = useState(false) ;

  // Title
  document.title = "JES - Edit Student" ;

  // Handle Change
  const handleChange = (event) =>
  {
    let name = event.target.name ;
    let value = event.target.value ;

    if (name === "father" || name === "reg")
    {
      value = value.toUpperCase() ;
    }

    setInputs(values => ({ ...values, [name]: value })) ;

    // Get Students in Class
    if (name === "theClass")
    {
      // Reset
      setStudents([]) ;
      inputs.student = "NULL" ;

      for (let x in data[value])
      {
        setStudents(values => ([ ...values, x ])) ;
      }
    }

    // Get Data About Student
    if (name === "student")
    {
      let student = data[inputs.theClass][value] ;

      setInputs(values => 
      ({ 
        ...values, 
        father: student["Father"], 
        reg: student["Reg"], 
        fees: student["Fees"], 
        arrears: student["Arrears"] 
      })) ;
    }
  }
  
  // Send Data to Firebase
  const sendData = () =>
  {
    let theRef = ref(database, "Student Record/" + inputs.theClass + "/" + inputs.student + "/") ;
    update(theRef, 
    {
      "Father": inputs.father,
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
    checkLength(inputs.theClass, 50) &&
    checkInput(inputs.reg, 50, "[A-Z\d]") &&
    checkInput(inputs.fees, 6, "^[0-9]+$") &&
    checkInput(inputs.arrears, 6, "^[0-9]+$"))
    {
      sendData() ;

      setError(inputs.student + " Edited!") ;
      setErrType("alert-success") ;
      setShowErr(true) ;
    }
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
              <select name="theClass" value={ inputs.theClass || "" } onChange={ handleChange } className={ "form-select " + styles.input2 }>
                <option value="NULL" disabled required className={ styles.hidden }> Select a Class </option>
                {
                  classes.map(mapper)
                }
              </select>
              <label htmlFor="theClass"> Class </label>
            </div>

          { (inputs.theClass !== "NULL") &&
            <div className="form-floating mb-3 mt-3">
              <select name="student" value={ inputs.student } onChange={ handleChange } autoFocus className={ "form-select " + styles.input2 }>
                <option value="NULL" disabled required className={ styles.hidden }> Select a Student </option>
                {
                  students.map(mapper)
                }
              </select>
              <label htmlFor="student"> Name </label> 
            </div>
          }

          { (inputs.student !== "NULL") &&
            <div>
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
          }
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