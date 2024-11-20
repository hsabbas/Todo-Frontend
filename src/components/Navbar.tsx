import { Link } from "react-router-dom";
import "../style/Navbar.css"
import { useContext } from "react";
import { CurrentUserContext } from "../App";

export default function Navbar({onLogout} : {onLogout: () => void}) {
    const currentUser = useContext(CurrentUserContext);
    return (
        <header className="navbar-header">
            <Link to="/">
                <h1 className='header-title'>Todo Task Manager</h1>
            </Link>
            {!currentUser.authenticated && <div className="navbar-btns">
                <Link to="register">
                    <button className="register-btn">Register</button>
                </Link>
                <Link to="login">
                    <button className="login-btn">Login</button>
                </Link>
            </div>}
            {currentUser.authenticated && <div className="navbar-btns">
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>}
        </header>
    )
}