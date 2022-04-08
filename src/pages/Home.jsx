import React, { useState } from "react" ;
import { Link } from "react-router-dom";
import styles from "/src/styles.module.css" ;

// Images
import homeLogo from "/img/home_logo.png" ;
import homeHover from "/img/home_hover.png" ;
import homePrint from "/img/home_print.png" ;
import homeAdd from "/img/home_add.png" ;
import homeDelete from "/img/home_delete.png" ;

// Modal Component
function Modal(props)
{
  const [src, setSrc] = useState(props.source) ;

  const effect = () =>
  {
    setSrc(homeHover) ;
  }

  const reEffect = () =>
  {
    setSrc(props.source) ;
  }

  let html =
  (
  <>
    <Link to={ props.link }>
      <img src={ src } onMouseEnter={ effect } onMouseLeave={ reEffect } className={ styles.modalImage } />
    </Link>
  </>
  ) ;
  
  return html ;
}

// Home Component
function Home()
{
  // Title
  document.title = "Jakson Education System" ;

  let html = 
  (
  <>
    <div className={ "container-fluid " + styles.homeContainer }>
      <img src={ homeLogo } className={ styles.homeImage } />
      <p className={ styles.header }> JAKSON EDUCATION SYSTEM </p>
      
      <Modal source={ homePrint } link="print" />
      <Modal source={ homeAdd } link="add" />
      <Modal source={ homeDelete } link="delete" />
      
    </div>
  </>
  ) ;

  return html ;
}

// Export Home
export default Home ;