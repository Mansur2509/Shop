import { Link } from "react-router-dom";
import '../assets/styles/Main.css'
import icon from '../../public/vite.svg'
const NavBar = () => {
    return (<nav className="nav container">
        <Link to='/'><img src={icon} alt="" /></Link>
        <p>ИНТЕРНЕТ МАГАЗИН ШЕСТЕРОЧКА</p>
    </nav>)
}
export default NavBar