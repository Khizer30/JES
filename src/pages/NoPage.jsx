import React from "react" ;
import styles from "/src/styles.module.css" ;

// NoPage Component
function NoPage()
{
  let html =
  (
  <>
    <div className={ "container-fluid " + styles.NoPageContainer }>
      <h1 className={ styles.NoPageH1 }> 404 </h1>
      <h1 className={ styles.NoPageH2 }> No Such Page Exists </h1>
    </div>
  </>
  ) ;

  return html ;
}

// Export NoPage
export default NoPage ;