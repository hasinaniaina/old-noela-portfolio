
import { FormEvent, useRef, useState, useEffect } from "react"
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setMessageError] = useState('');
    const [errorClassName, setErrorClassName] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/backOffice');
                return false;
            } 
          });
        
    }, []);

    let signup = (e: FormEvent) => {
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

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            navigate("/login");
        }).catch((error) => {
            setMessageError("there is an error with submitting, please check again");
            setErrorClassName("alert alert-danger");
            console.log(error)
        })
    }
  return (
    <div className="register">
        <div className="container login-container">
            <div className="fields-container">
                <h1>Sign Up</h1>
                <p className={errorClassName}>{errorMessage}</p>
                <form onSubmit={signup}>
                    <div className="field">
                        <input ref={emailRef} type="email" name="email" className="form-control" placeholder="Email"/>
                    </div>
                    <div className="field">
                        <input ref={passwordRef} type="password" name="password" className="form-control" placeholder="Password"/>
                    </div>
                    <div className="field">
                        <button className="btn btn-success">Create account</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUp
