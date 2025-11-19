import {useState} from "react";
import Card from "../../components/card/Card";
import styles from './auth.module.scss';
import {Link} from "react-router-dom";
import {AiOutlineMail} from "react-icons/ai";
import {toast} from "react-toastify";
import {validateEmail} from "../../redux/features/auth/authService";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword, RESET} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const Forgot = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.auth);

    const forgot = async (e) => {
        e.preventDefault();
        if (!email) return toast.error("Please enter an email");
        if (!validateEmail(email)) return toast.error("Please enter a valid email");
        const userData = {
            email
        };
        await dispatch(forgotPassword(userData));
        await dispatch(RESET(userData));
    };

    return (
        <>
            {isLoading && <Loader />}
            <div className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <div className='--flex-center'>
                            <AiOutlineMail size={35} color='#999'/>
                        </div>
                        <h2 style={{marginBottom: '4rem'}}>Forgot Password</h2>

                        <form onSubmit={forgot}>
                            <label htmlFor="email"><p>Please Enter Email Address for Resetting Password!</p></label>
                            <input type="email" placeholder='Email' name='email' value={email}
                                   onChange={(e) => setEmail(e.target.value)} required/>
                            <button type='submit' className='--btn --btn-primary --btn-block'>Get Reset Email</button>

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

export default Forgot;