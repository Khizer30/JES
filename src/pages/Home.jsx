import React from "react" ;
import styles from "/src/styles.module.css" ;

function Home()
{
  let html = 
  (
  <>
    <div className={ "container-fluid " + styles.homeContainer }>
      <img src="/img/logo_simple.png" className={ styles.homeImage } />
      <p className={ styles.header }> JAKSON EDUCATION SYSTEM </p>
      <p className={ styles.homePar }> Jakson Education System is one of the emerging educational institutions in Pakistan. It portrays the unique concept of “School Without Bag” with the “Hands-on Learning” phenomenon. Jakson Education System provides quality education from early years till grade VI. Compliant with national policies; our education system adopts an analytical approach to seek the hidden talents of the future of this nation. It is our primary responsibility to make the students well equipped with competitive knowledge and build them morally and ethically to let them contribute towards nation-building. </p>
    </div>
  </>
  ) ;

  return html ;
}

// Export Home
export default Home ;