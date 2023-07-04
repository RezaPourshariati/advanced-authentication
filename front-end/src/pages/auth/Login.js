import {useState} from "react";
import Card from "../../components/card/Card";
import {BiLogIn} from "react-icons/bi";
import styles from './auth.module.scss';
import {Link} from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
// import './auth.module.scss';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleInputChange = (e) => {


    };

    const loginUser = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <div className='--flex-center'>
                            <BiLogIn size={40} color='#999'/>
                        </div>
                        <h2 style={{marginBottom: '2rem'}}>Login</h2>
                        <div className='--flex-center'>
                            <button className="--btn --btn-google">Login with Google</button>
                        </div>
                        <br/>
                        <p className='--text-center --fw-bold'>or</p>

                        <form onSubmit={loginUser}>
                            <input type="email" placeholder='Email' name='email' value={email}
                                   onChange={handleInputChange} required/>
                            <PasswordInput placeholder='Password' name='password' value={password}
                                           onChange={handleInputChange}/>
                            <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
                        </form>

                        <Link to='/forgot'>Forgot Password</Link>
                        <span className={styles.register}>
                            <Link to='/'>Home</Link>
                            <p>&nbsp; Don't have an account? &nbsp;</p>
                            <Link to='/register'>Register</Link>
                        </span>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default Login;