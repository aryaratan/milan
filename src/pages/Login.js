import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import { useToasts } from 'react-toast-notifications';
import styles from '../styles/signin.module.css';
import { useAuth } from '../hooks';
import { LOCALSTORAGE_TOKEN_KEY as token, getItemFromLocalStorage } from "../utils";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const { addToast } = useToasts();
  const auth = useAuth();
  const navigate = useNavigate();
  console.log(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      return addToast('Please enter both email and password', {
        appearance: 'error',
      });
    }

    const response =  await auth.login(email, password);

    if (response.success) {
      addToast('Successfully logged in', {
        appearance: 'success',
      });
      navigate("/");
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }

    setLoggingIn(false);
  };

  useEffect(() => {
    
    if(getItemFromLocalStorage(token)){
        // console.log("present");
        navigate("/");
    }else{
        console.log(" not present");

        navigate("/login");
    }
  },[]);
 

  return (
    <div className={styles.container}>
        <h1 >Login to MILAN </h1>
        <form onSubmit={handleSubmit}> 
            <input className={styles.idPas} 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
            <input className={styles.idPas}
            type="password"
            placeholder="Paasword"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
            <button className={styles.btn}
            disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Log In'}
        </button>
        </form>
        <a href="/user/forgotPassword">Forgotten account?</a> <br/>
        <a href="/user/signup">Sign up for MILAN</a><br/>
        <a href="/user/auth/google">Signin using google</a> 
    </div>
  );
};

export default Login;
