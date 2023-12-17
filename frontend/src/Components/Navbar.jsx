import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
        <div className="logo">
            <div className="image"></div>
            <h2>AgroDigital</h2>
        </div>
        <div className="links">
            <h5 className="links" onClick={() => navigate("/farm", { replace: true })}>Farms</h5>
            <h5 className="links">Information</h5>
            <h5 className="links">Market</h5>
            <h5 className="links" onClick={() => navigate("/forum",{replace:true})}>Forums Page</h5>
            <h5 className="links" onClick={() => navigate("/search",{replace:true})}>Search</h5>
        </div>
    </nav>
  )
}

export default Navbar