import {useState} from "react";
import Card from "../../components/card/Card";
import styles from './auth.module.scss';
import {Link} from "react-router-dom";
import {AiOutlineMail} from "react-icons/ai";

const Forgot = () => {
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
                            <AiOutlineMail size={35} color='#999'/>
                        </div>
                        <h2 style={{marginBottom: '4rem'}}>Forgot Password</h2>

                        <form onSubmit={loginUser}>
                            <label htmlFor="email"><p>Please Enter Email Address for Resetting Password!</p></label>
                            <input type="email" placeholder='Email' name='email' value={email}
                                   onChange={handleInputChange} required/>
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