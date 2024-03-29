import React from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Navbar = (props) => {
  const {showAlert}=props;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("tokenAuth");
    navigate("/login");
    showAlert("Logged Out Succefully","success")
  };
  // let location = useLocation();
  // useEffect(() => {}, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              <Link
                className='nav-link'
                
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                className='nav-link'
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("tokenAuth") ? (
            <form className="d-flex">
              <Link
                className="btn btn-secondary mx-2"
                to="/signup"
                role="button"
              >
                Sign Up
              </Link>
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
            </form>
          ) : (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
