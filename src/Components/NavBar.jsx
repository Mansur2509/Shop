import { Link } from "react-router-dom";
import toggle from '../../public/home_icon.svg'
import '../assets/styles/Main.css'

import { useTheme } from '../Provider/Theme.jsx'
const NavBar = () => {
    const { toggleTheme } = useTheme();

    return (<nav className="nav ">
        <div className='container navContent'>

            <Link to='/' className="Navlink">
           <img src={toggle} alt="Упс..." /></Link>
            <h3>ИНТЕРНЕТ МАГАЗИН ШЕСТЕРОЧКА</h3>
            <button onClick={toggleTheme}>Change Theme</button>
        </div>
    </nav>)
}
export default NavBar