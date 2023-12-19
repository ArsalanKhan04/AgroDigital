import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';

import Logo from './logo_png.png';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
        <div className="logo">
            <img src={Logo} onClick={() => navigate("/home", { replace: true })} className="max-w-xs"></img>
            <h2 onClick={() => navigate("/home", { replace: true })}>AgroDigital</h2>
        </div>
        <div className="links">
            <h5 className="links">Information</h5>
            <h5 className="links" onClick={() => navigate("/market",{replace:true})}>Market</h5>
            <h5 className="links" onClick={() => navigate("/forum",{replace:true})}>Forums Page</h5>
        </div>
    </nav>
  )
}

export default Navbar