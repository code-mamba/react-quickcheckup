import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN, PATIENT, DOCTOR } from "src/components/Constant/constant";
import { authSelector, logout } from "src/redux/slices/authSlices";
import { dispatch } from "src/redux/store/store";
import "./Navbar.css";

export const Navbar = () => {
  const isAuthenticated = useSelector(authSelector.isAuthenticated);
  const userRole = useSelector(authSelector.getUserRole);
  const navigate = useNavigate()
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
    };
  };

  const handleLogout = () =>{
    navigate('/')
    dispatch(logout());
    localStorage.clear();

  }

  return (
    <nav>
     {!isAuthenticated | userRole === PATIENT && <NavLink style={navLinkStyles} to="/">
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
        <NavLink style={navLinkStyles} to="/doctorpage">My Appointments</NavLink>
      )}

      {isAuthenticated && <NavLink style={navLinkStyles} onClick={handleLogout} to="#">Logout</NavLink>}
    </nav>
  );
};
