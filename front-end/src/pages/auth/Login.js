import {useEffect, useState} from "react";
import Card from "../../components/card/Card";
import {BiLogIn} from "react-icons/bi";
import styles from './auth.module.scss'; // import './auth.module.scss';
import {Link, useNavigate} from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {validateEmail} from "../../redux/features/auth/authService";
import {login, loginWithGoogle, RESET, sendLoginCode} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import {GoogleLogin} from "@react-oauth/google";


const initialState = {
    email: "",
    password: ""
};

const Login = () => {
    const [formData, setFormData] = useState(initialState);
    const {email, password} = formData;

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]: value}); // Dynamic assign
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isLoading, isLoggedIn, isSuccess, twoFactor, isError, message} = useSelector((state) => state.auth);

    const loginUser = async (e) => {
        e.preventDefault();

        if (!email || !password) toast.error("All field are required");
        if (!validateEmail(email)) toast.error("Please enter a valid email");

        const userData = {email, password};
        // console.log(userData);
        await dispatch(login(userData));
    };

    useEffect(() => {
        if (isSuccess && isLoggedIn) navigate("/profile");
        dispatch(RESET());
        if (isError && twoFactor) {
            dispatch(sendLoginCode(email));
            navigate(`/loginWithCode/${email}`);
        }
    }, [isLoggedIn, isSuccess, dispatch, navigate, isError, twoFactor, email]);

    const googleLogin = async (credentialResponse) => {
        console.log(credentialResponse.credential);
        await dispatch(loginWithGoogle(credentialResponse.credential));
    };

    return (
        <>
            <div className={`container ${styles.auth}`}>
                {isLoading && <Loader/>}
                <Card>
                    <div className={styles.form}>
                        <div className='--flex-center'>
                            <BiLogIn size={40} color='#999'/>
                        </div>
                        <h2 style={{marginBottom: '2rem'}}>Login</h2>
                        <div className='--flex-center'>
                            <GoogleLogin onSuccess={googleLogin}
                                         onError={() => {
                                             console.log("Login Failed");
                                             toast.error("Login Failed");
                                         }}
                                         cookiePolicy={"single_host_origin"}
                                         useOneTap={true}
                                         // login_uri={"http://localhost:3000"}
                                         // native_login_uri={"http://localhost:3000"}
                                         // state_cookie_domain={"http://localhost:3000"}
                                         // allowed_parent_origin={"http://localhost:3000"}
                            />
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