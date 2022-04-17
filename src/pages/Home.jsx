import React, { useState } from "react" ;
import { Link } from "react-router-dom";
import { getData } from "/src/firebase.js" ;
import styles from "/src/styles.module.css" ;

// Images
import homeLogo from "/img/home_logo.png" ;
import homeHover from "/img/home_hover.png" ;
import homePrint from "/img/home_print.png" ;
import homeEdit from "/img/home_edit.png" ;
import homeAdd from "/img/home_add.png" ;
import homeDelete from "/img/home_delete.png" ;

// Modal Component
function Modal(props)
{
  // Variable
  const [src, setSrc] = useState(props.source) ;

  // On Mouse In
  const effect = () =>
  {
    setSrc(homeHover) ;
  }

  // On Mouse Out
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

  // Fetch Data from Firebase
  getData() ;

  let html = 
  (
  <>
    <div className={ "container-fluid " + styles.homeContainer }>
      <img src={ homeLogo } className={ styles.homeImage } />

      <div>
        <Modal source={ homePrint } link="print" />
        <Modal source={ homeEdit } link="edit" />
        <Modal source={ homeDelete } link="delete" />
        <Modal source={ homeAdd } link="add" />
      </div>

    </div>
  </>
  ) ;

  return html ;
}

// Export Home
export default Home ;