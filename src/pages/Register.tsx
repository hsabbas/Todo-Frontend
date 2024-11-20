import { FormEvent, useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { checkEmailAvailable, register } from "../utils/APIUtils";
import { EMAIL_MAX_LENGTH, PWD_MAX_LENGTH, PWD_MIN_LENGTH } from "../constants/constants";

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPwd, setConfirmPwd] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [registered, setRegistered] = useState<boolean>(false);
    const currentUser = useContext(CurrentUserContext);
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (password.length < PWD_MIN_LENGTH) {
            setErrorMsg("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPwd) {
            setErrorMsg("Entered passwords don't match");
            return;
        }


        let isAvailable: boolean = false;
        checkEmailAvailable(email).then(response => {
            response.json().then(json => {
                isAvailable = json.available;
                if (!isAvailable) {
                    setErrorMsg("Email already in use");
                    return;
                }
                handleRegister();
            })
        })
    }

    function handleRegister() {
        register({ email: email, password: password }).then(response => {
            if (response.status != 201) {
                setErrorMsg("Something went wrong. Please try again.");
            }

            setRegistered(true);
        })
    }

    useEffect(() => {
        if (currentUser.authenticated) {
            navigate("/");
        }
    })

    return (
        <div className="form-page">
            <h1 className="register-header">Sign Up</h1>
            {registered && <div className="modal">
                <div className="login-prompt">
                    <div className="register-success-msg">You've successfully registered</div>
                    <button className="to-login-btn" onClick={() => { navigate("/login") }}>Login</button>
                </div>
            </div>}
            <form className="form" onSubmit={handleSubmit}>
                <input className="text-input"
                    type="email"
                    value={email}
                    placeholder="Enter Email"
                    name="email"
                    onChange={(e) => {
                        if (e.target.value.length < EMAIL_MAX_LENGTH) {
                            setEmail(e.target.value);
                        }
                        setErrorMsg("");
                    }}
                    required />
                <input className="text-input"
                    type="password"
                    value={password}
                    placeholder="Enter password"
                    name="password"
                    onChange={(e) => {
                        if (e.target.value.length <= PWD_MAX_LENGTH) {
                            setPassword(e.target.value);
                        }
                        setErrorMsg("");
                    }}
                    required />
                <input className="text-input"
                    type="password"
                    value={confirmPwd}
                    placeholder="Confirm password"
                    name="password"
                    onChange={(e) => {
                        if (e.target.value.length <= PWD_MAX_LENGTH) {
                            setConfirmPwd(e.target.value);
                        }
                        setErrorMsg("");
                    }}
                    required />
                <input className="submit-btn" type="submit" />
            </form>
            <div className="error-msg">{errorMsg}</div>
        </div>
    )
}