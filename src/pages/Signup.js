import {  useState,useEffect } from "react";
import styles from "../styles/signup.module.css"
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api";
import { useToasts } from "react-toast-notifications";
import {useAuth } from "../hooks";
import { LOCALSTORAGE_TOKEN_KEY as token, getItemFromLocalStorage } from "../utils";
// import { redirect } from "react-router-dom";


const Signup = () => {
    const auth = useAuth();
    const [name , setName] = useState('');
    // const [lName, setlName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {addToast} = useToasts();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!name  || !email || !password || !confirmPassword) {
            return addToast('Please enter both email and password', {
            appearance: 'error',
            });
        }
        console.log(password, confirmPassword);
        
        const response =  await signup(email,name, password,confirmPassword);
    
        if (response.success) {
            addToast('Successfully logged in', {
            appearance: 'success',
            });
        } else {
            addToast(response.message, {
            appearance: 'error',
            });
        }
    
        setLoading(false);
        };
    
    useEffect(() => {

        if(getItemFromLocalStorage(token)){
            // console.log("present");
            navigate("/");
        }else{
            // console.log(" not present");
    
            navigate("/login");
        }
    },[]);

    return (
        <div className={styles.container}>
            <h1 className="texts "> Create a new account</h1>
            <p className="texts"> It's quick and easy</p>
            <hr />
            <form onSubmit={handleSubmit}>
                <input className={styles.names} type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)} />
                {/* <input className={styles.names} type="text"
                placeholder="Last name"
                value={lName}
                onChange={(e) => setlName(e.target.value)} /> */}
                <input 
                className={styles.idPas} 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                <input 
                className={styles.idPas}
                type="password"
                placeholder="Paasword"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <input 
                className={styles.idPas}
                type="password"
                placeholder="Confirm Paasword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} />
                
                <button className={styles.btn}
                    disabled={loading}>
                    {loading ? 'Registering...' : 'Sign Up'}
                </button>
            </form>
            <Link to="/login">Already have an account?</Link><br />
            <Link to="/user/auth/google">SignUp using google</Link> 

        </div>


    );
}

export default Signup;