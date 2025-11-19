import {useEffect, useState} from "react";
import Card from "../../components/card/Card";
import styles from './auth.module.scss';
import {Link, useNavigate, useParams} from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import {MdPassword} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/loader/Loader";
import {toast} from "react-toastify";
import {RESET, resetPassword} from "../../redux/features/auth/authSlice";
// import './auth.module.scss';


const initialState = {
    password: '',
    password2: ''
};

const Reset = () => {
    const [formData, setFormData] = useState(initialState);
    const {password, password2} = formData;

    const {isLoading, isSuccess, message} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {resetToken} = useParams();
    // console.log(isSuccess, isLoading, message);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]: value});
    };

    const reset = (e) => {
        e.preventDefault();
        if (!password && !password2) return toast.error("Please enter you password");
        if (password.length < 8) return toast.error("Password must be up to 8 characters");
        if (password !== password2) return toast.error("Password do not match");
        const userData = {
            password
        };
        dispatch(resetPassword({userData, resetToken}));
        navigate("/login");
    };

    useEffect(() => {
        if (isSuccess && message.includes("reset was successful")) navigate("/login");
        dispatch(RESET());
    }, [dispatch, navigate, message, isSuccess]);

    return (
        <>
            <div className={`container ${styles.auth}`}>
                {isLoading && <Loader/>}
                <Card>
                    <div className={styles.form}>
                        <div className='--flex-center'>
                            <MdPassword size={35} color='#999'/>
                        </div>
                        <h2 style={{marginBottom: '4rem', color: 'green'}}>Reset Password</h2>

                        <form onSubmit={reset}>
                            <label htmlFor="email"><p>Please Enter New Password.</p></label>
                            <PasswordInput placeholder='Password' name='password' value={password}
                                           onChange={handleInputChange}/>
                            <PasswordInput placeholder='Confirm Password' name='password2' value={password2}
                                           onChange={handleInputChange}/>
                            <button type='submit' className='--btn --btn-primary --btn-block'>Reset Password</button>

                            <div className={styles.links}>
                                <p><Link to='/'>Home</Link></p>
                                <p><Link to='/login'>Login</Link></p>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default Reset;