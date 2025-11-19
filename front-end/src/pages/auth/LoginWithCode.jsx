import {useEffect, useState} from "react";
import Card from "../../components/card/Card";
import styles from './auth.module.scss';
import {Link, useNavigate, useParams} from "react-router-dom";
import {GrInsecure} from "react-icons/gr";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {loginWithCode, RESET, sendLoginCode} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const LoginWithCode = () => {
    const [loginCode, setLoginCode] = useState("");
    const {email} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isLoading, isLoggedIn, isSuccess, message, isError, twoFactor} = useSelector((state) => state.auth);

    const sendUserLoginCode = async () => { // Resend Code
        await dispatch(sendLoginCode(email));
        await dispatch(RESET());
    };

    const loginUserWithCode = async (e) => {
        e.preventDefault();
        if (!loginCode) toast.warn("Please fill in the login code");
        if (!Number(loginCode)) toast.warn("Access Code must include only numbers!");
        if (loginCode.length !== 6) toast.warn("Access code must be at least 6 characters");
        const code = {
            loginCode
        };
        await dispatch(loginWithCode({code, email}));
    };

    useEffect(() => {
        if (isSuccess && isLoggedIn) navigate("/profile");
        dispatch(RESET());
    }, [isLoggedIn, isSuccess, dispatch, navigate]);

    return (<>
        <div className={`container ${styles.auth}`}>
            {isLoading && <Loader/>}
            <Card>
                <div className={styles.form}>
                    <div className='--flex-center'>
                        <GrInsecure size={35} color='#999'/>
                    </div>
                    <h2 style={{marginBottom: '4rem', color: 'green'}}>Enter Access Code</h2>

                    <form onSubmit={loginUserWithCode}>
                        <label htmlFor="loginCode"><p><span className='--fw-bold'
                                                            style={{color: 'yellowgreen'}}>Email was Sent!</span>
                            <br/>Check Your Email for Access Login Code!</p></label>
                        <input type="text" placeholder='Access Code' name='loginCode' value={loginCode}
                               onChange={(e) => setLoginCode(e.target.value)} required/>

                        <button type='submit' className='--btn --btn-primary --btn-block'>Proceed to Login</button>

                        <div className={styles.links}>
                            <p><Link to='/'>Home</Link></p>
                            <p onClick={sendUserLoginCode}>Resend Code</p>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    </>);
};

export default LoginWithCode;