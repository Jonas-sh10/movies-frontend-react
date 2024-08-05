import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from "react-icons/fa";
import { FcSurvey } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/dashboard" className="btn btn-outline-light border-0">
          <FaHome /> App Movie
        </Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/dashboard" className="btn btn-light">
                <FcSurvey /> Dashboard
              </Link>
            </li>
            <li>
              <button className="btn btn-danger" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Registrar
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
