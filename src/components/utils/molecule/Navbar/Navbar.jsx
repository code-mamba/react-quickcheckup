import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN, PATIENT, DOCTOR } from "src/components/Constant/constant";
import { authSelector, logout } from "src/redux/slices/authSlices";
import { dispatch } from "src/redux/store/store";
import Snackbar from "../../atoms/Toast/Toast";
import "./Navbar.css";

export const Navbar = () => {
  const isAuthenticated = useSelector(authSelector.isAuthenticated);
  const userRole = useSelector(authSelector.getUserRole);
  const navigate = useNavigate()
  const navLinkStyles = ({ isActive }) => {
    return {
      color: "white",
      fontWeight: isActive ? "bold" : "normal",
      fontSize: "25px"
    };
  };

  const handleLogout = () =>{
    navigate('/')
    dispatch(logout());
    localStorage.clear();
    <Snackbar message={"Successfully Logged Out"}/>

  }

  return (
    <>
    {isAuthenticated &&(
       <nav className="navbar-container">
       {!isAuthenticated && <NavLink style={navLinkStyles} to="/">
          Home
        </NavLink>} 
  
        {isAuthenticated && userRole === ADMIN && (
          <NavLink style={navLinkStyles} to="/userslist">
            UsersList
          </NavLink>
        )}
        {isAuthenticated && userRole === ADMIN &&(
            <NavLink style={navLinkStyles} to="/createuser">
            Create User
          </NavLink>
        )}
        {isAuthenticated && userRole === PATIENT && (
          <NavLink style={navLinkStyles} to="/appointment">Appointment</NavLink>
        )}
        {isAuthenticated && userRole === DOCTOR &&(
          <NavLink style={navLinkStyles} to="/doctorDashboard">My Appointments</NavLink>
        )}
  
        {isAuthenticated && <NavLink style={navLinkStyles} onClick={handleLogout} to="">Logout</NavLink>}
        <div className="thinline">
        </div>
      </nav>
    )}
   
    </>
  );
};
