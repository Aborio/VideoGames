import React from 'react'
import Styles from './/modules/botones.modules.css';
import { Link } from 'react-router-dom';


const About = () => {
  return (
    <div className={Styles.container} >
            <Link to='/home'>
                    <button className={Styles.btn} >
                        <span className={Styles.shadow}></span>
                        <span className={Styles.edge}></span>
                        <span className={Styles.front}>Home</span>
                    </button>
                </Link>
            <div className={Styles.about}>
            <h1> 👋 Hola, Soy Agustin borio!</h1>
            <h3> 👀 Si queres ver mas projectos mios, clickea abajo!</h3>

                <a href= 'https://github.com/Aborio' target='_blank'><img src="../descarga.png" alt="About" className={Styles.img__about}/></a>
                </div>
        </div>
  )
}

export default About