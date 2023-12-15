import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav>
        <div className="logo">
            <div className="image"></div>
            <h2>AgroDigital</h2>
        </div>
        <div className="links">
            <h5 className="links">Farms</h5>
            <h5 className="links">Information</h5>
            <h5 className="links">Market</h5>
            <h5 className="links">Forums Page</h5>
            <h5 className="links">My Profile</h5>
        </div>
    </nav>
  )
}

export default Navbar