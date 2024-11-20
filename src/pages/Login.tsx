import { FormEvent, useContext, useEffect, useState } from "react"
import { login } from "../utils/APIUtils";
import { useNavigate } from "react-router-dom";
import { User } from "../model/User";
import { CurrentUserContext } from "../App";
import "../style/Login.css"
import { EMAIL_MAX_LENGTH, PWD_MAX_LENGTH, PWD_MIN_LENGTH } from "../constants/constants";

interface LoginResponse {
    authenticated: boolean,
    userId: number,
    userEmail: string
}

export default function Login({ setCurrentUser }: { setCurrentUser: (currentUser: User) => void }) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const currentUser = useContext(CurrentUserContext);
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if(password.length < PWD_MIN_LENGTH) {
            setErrorMsg("Password must be at least 6 characters");
            return;
        }
        let loginResponse: LoginResponse;
        login({ email, password }).then(response => {
            if(response.status === 200) {
                response.json().then(json => {
                    loginResponse = json;
                    if (loginResponse.authenticated) {
                        setCurrentUser(new User(loginResponse.userId, loginResponse.userEmail, loginResponse.authenticated));
                        navigate("/");
                    }
                })
            } else if (response.status === 403){
                setErrorMsg("Incorrect email and password combination");
            } else {
                setErrorMsg("Something went wrong. Try again later.");
            }
        })
    }

    useEffect(() => {
        if (currentUser.authenticated) {
            navigate("/");
        }
    })

    return (
        <div className="form-page">
            <h1 className="login-header">Login</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input className="text-input"
                    type="email"
                    value={email}
                    placeholder="Enter Email"
                    name="email"
                    onChange={(e) => {
                        if(e.target.value.length <= EMAIL_MAX_LENGTH){
                            setEmail(e.target.value);
                        }
                        setErrorMsg("");
                    }
                    }
                    required />
                <label htmlFor="password">Password</label>
                <input className="text-input"
                    type="password"
                    value={password}
                    placeholder="Enter password"
                    name="password"
                    onChange={(e) => {
                        if(e.target.value.length <= PWD_MAX_LENGTH){
                            setPassword(e.target.value);
                        }
                        setErrorMsg("");
                    }
                    }
                    required />
                <input className="submit-btn" type="submit" />
            </form>
            <div className="error-msg">{errorMsg}</div>
        </div>
    )
}