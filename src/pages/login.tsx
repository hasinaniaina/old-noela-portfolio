import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { FormEvent, useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setMessageError] = useState('');
    const [errorClassName, setErrorClassName] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/backOffice/headerContent');
                return false;
            } 
          });
        
    }, []);

    let login = (e: FormEvent) => {
        e.preventDefault();

        if ((!emailRef.current || emailRef.current.value == "") || (!passwordRef.current || passwordRef.current.value == "")) {
            setMessageError("Inputs could not be Empty");
            setErrorClassName("alert alert-danger");
            return false;
        }

        
        setMessageError('');
        setErrorClassName('');
        
        let email = emailRef.current.value;
        let password = passwordRef.current.value;

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate("/backOffice");
        }).catch((error) => {
            setMessageError(error.message);
            setErrorClassName("alert alert-danger");
        })
    }


    return (
        <div className="login">
            <div className="container login-container">
                <div className="fields-container">
                    <h1>Login</h1>
                    <p className={errorClassName}>{errorMessage}</p>
                    <form onSubmit={login}>
                        <div className="field">
                            <input ref={emailRef} type="email" name="email" className="form-control" placeholder="Email"/>
                        </div>
                        <div className="field">
                            <input ref={passwordRef} type="password" name="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="field">
                            <button type="submit" className="btn btn-success">Log in</button>
                        </div>
                    </form>
                    <Link to="/signUp">Create a new account?</Link>
                </div>
            </div>
        </div>
    )
}

export default Login  
