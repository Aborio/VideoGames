import { useNavigate } from "react-router-dom";
import Styles from './modules/botones.modules.css'

const FormIngreso = () => {

    const navigate = useNavigate();

    const handle = () => {
        navigate("/home")
    }

    return(
        <form className="lform" onSubmit={handle}>
            <h1>Ingrese apretando el boton</h1>
            <button className={Styles.btn}>Ingresar</button>
        </form>

    )
}

export default FormIngreso;