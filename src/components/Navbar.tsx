import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <header className="navbar-header">
            <Link to="/">
                <h1 className='header-title'>Todo Task Manager</h1>
            </Link>
            <Link to="register">
                <button>Register</button>
            </Link>
            <Link to="login">
                <button>Login</button>
            </Link>
        </header>
    )
}