import React, { useState, useRef } from "react" ;
import styles from "/src/styles.module.css" ;

function Print()
{
  // Get Student Names
  const getNames = () =>
  {
    let data = JSON.parse(sessionStorage.data) ;
    let names = [] ;
    for (var x in data)
    {
      names.push(x) ;
    }

    return names ;
  }

  // MS Word API Function
  const loadFile = (url, callback) => 
  {
    PizZipUtils.getBinaryContent(url, callback) ;
  }

  // Get Date
  const getToday = (style) =>
  {
    let today = new Date() ;
    let dd = String(today.getDate()).padStart(2, '0') ;
    let mm = String(today.getMonth() + 1).padStart(2, '0') ;
    let yyyy = today.getFullYear() ;

    if (style == "date")
    {
      today = yyyy + "-" + mm + "-" + dd ;
    }
    else if (style == "issue")
    {
      today = dd + "/" + mm + "/" + yyyy ;
    }
    else if (style == "due")
    {
      dd = String(today.getDate() + 7).padStart(2, '0') ;
      today = dd + "/" + mm + "/" + yyyy ;
    }
    else if (style == "month")
    {
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"] ;
      today = monthNames[today.getMonth()] ;
    }

    return today ;
  }

  // Variables
  const [names, setNames] = useState(getNames) ;
  const [student, setStudent] = useState("") ;
  const father = useRef("") ;
  const theClass = useRef("") ;
  const reg = useRef("") ;
  const [date, setDate] = useState(getToday("date")) ;
  const [fees, setFees] = useState("") ;
  const [arrears, setArrears] = useState("") ;
  // ... 
  const [showRest, setShowRest] = useState(false) ;
  const [error, setError] = useState("") ;
  const [message, setMes] = useState("") ;
  const [showErr, setShowErr] = useState(false) ;
  const [showMes, setShowMes] = useState(false) ;
  let data = JSON.parse(sessionStorage.data) ;

  // Title
  document.title = "JES - Print Fee Challan" ;

  // Print Fee Challan
  const printChallan = () =>
  {
    loadFile(
      // Template File
      "template.docx",
      function (error, content) 
      {
        if (error) 
        {
          throw error ;
        }
        
        var zip = new PizZip(content) ;
        var doc = new window.docxtemplater(zip, 
        {
          paragraphLoop: true,
          linebreaks: true,
        }) ;  
  
        // Render Document & Replace Variables
        doc.render(
        {
          name: student,
          father: father.current,
          reg: reg.current,
          theClass: theClass.current,
          issue: getToday("issue"),
          due: getToday("due"),
          month: getToday("month"),
          fees: fees,
          arrears: arrears,
          total: +fees + +arrears,
          feeName: inWords(+fees + +arrears) + "only"
        }) ;
  
        var out = doc.getZip().generate(
        {
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }) ;
  
        // Output Document
        saveAs(out, student + ".docx") ;
      }
    ) ;

    setMes(student + "'s Fee Challan Printed!") ;
    setShowMes(true) ;
  }

  // Handle Change
  const handleChange = (event) =>
  {
    let name = event.target.name ;
    let value = event.target.value ;

    if (name == "date")
    {
      setDate(value) ;
    }
    else if (name == "fees")
    {
      setFees(value) ;
    }
    else if (name == "arrears")
    {
      setArrears(value) ;
    }
  }

  // Get Input
  const handleStudent = (event) =>
  {
    let name = event.target.value ;
    setStudent(name) ;

    setShowRest(true) ;

    father.current = data[name]["Father"] ;
    theClass.current = data[name]["Class"] ;
    reg.current = data[name]["Reg"] ;
    setFees(data[name]["Fees"]) ;
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

  // Handle Bug
  const handleSubmit = (event) =>
  {
    event.preventDefault() ;
  }

  let html =
  (
  <>
    <div className="container-fluid">
      <h1 className={ styles.heading }> JES Fee Challan Generator </h1>
    </div>

    <div className={ "container-fluid " + styles.mainContainer }>
      <div className="row">
        <div className="col-md-6">
          <form action="" method="post" target="_self" encType="application/x-www-form-urlencoded" 
          autoComplete="off" noValidate onSubmit={ handleSubmit }>

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

            <select value={ student } onChange={ handleStudent } className={ "form-select " + styles.input2 }>
              <option value="" disabled className={ styles.hidden }> Select a Student </option>
              {
                names.map(mapper)
              }
            </select>

            <div className="form-floating mb-3 mt-3">
              <input 
                name="father" 
                type="text"
                maxLength="50"
                placeholder="Father's Name"
                disabled
                className={ "form-control " + styles.input } 
                defaultValue={ father.current }
              />
              <label htmlFor="father"> Father's Name </label>
            </div>

            <div className="form-floating mb-3 mt-3">
              <input 
                name="theClass" 
                type="text"
                maxLength="50"
                placeholder="Class" 
                disabled
                className={ "form-control " + styles.input } 
                value={ theClass.current }
              />
              <label htmlFor="theClass"> Class </label>
            </div>

            <div className="form-floating mb-3 mt-3">
              <input 
                name="reg" 
                type="text"
                maxLength="50"
                placeholder="Reg No."
                disabled 
                className={ "form-control " + styles.input } 
                value={ reg.current }
              />
              <label htmlFor="reg"> Reg No. </label>
            </div>

            { showRest &&
            <>
              <input 
                name="date" 
                type="date"
                className={ "form-control " + styles.input } 
                onChange={ handleChange }
                value={ date }
              />

              <div className="form-floating mb-3 mt-3">
                <input 
                  name="fees" 
                  type="number"
                  max="100000"
                  placeholder="Fees"
                  className={ "form-control " + styles.input } 
                  onChange={ handleChange }
                  value={ fees }
                />
                <label htmlFor="fees"> Fees </label>
              </div>

              <div className="form-floating mb-3 mt-3">
                <input 
                  name="arrears" 
                  type="number"
                  max="100000"
                  placeholder="Arrears"
                  className={ "form-control " + styles.input } 
                  onChange={ handleChange }
                  value={ arrears }
                />
                <label htmlFor="arrears"> Arrears </label>
              </div>

              <button onClick={ printChallan } type="button" className={ "btn btn-primary " + styles.button }> Create Fee Challan </button>
            </>
            }
          </form>
        </div>
        <div className="col-md-6 d-md-flex align-items-md-center">
          <img src="/img/fee_challan.png" alt="Fee Challan Image" className={ styles.image } />
        </div>
      </div>
    </div>
  </>
  ) ;

  return html ;
}

// Export Print
export default Print ;