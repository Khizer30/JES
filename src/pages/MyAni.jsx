import React from "react" ;
import styles from "/src/styles.module.css" ;

// MyAni Component
function MyAni()
{
  let html = 
  (
  <>
    <div className={ "container-fluid d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center " + styles.myAniContainer }>
      <div className={ styles.myAni }></div>
    </div>
  </>
  ) ;

  return html ;
}

// Export MyAni
export default MyAni ;