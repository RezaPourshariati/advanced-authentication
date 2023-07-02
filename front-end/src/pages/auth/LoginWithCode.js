import {useState} from "react";
import Card from "../../components/card/Card";
import styles from './auth.module.scss';
import {Link} from "react-router-dom";
import {GrInsecure} from "react-icons/gr";

const LoginWithCode = () => {
    const [loginCode, setLoginCode] = useState("");

    const loginUser = (e) => {
        e.preventDefault();
    };

    return (<>
        <div className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <div className='--flex-center'>
                        <GrInsecure size={35} color='#999'/>
                    </div>
                    <h2 style={{marginBottom: '4rem', color: 'green'}}>Enter Access Code</h2>

                    <form onSubmit={loginUser}>
                        <label htmlFor="loginCode"><p><span className='--fw-bold'
                                                            style={{color: 'yellowgreen'}}>Email was Sent!</span>
                            <br/>Check Your Email for Access Login Code!</p></label>
                        <input type="text" placeholder='Access Code' name='loginCode' value={loginCode}
                               onChange={(e) => setLoginCode(e.target.value)} required/>

                        <button type='submit' className='--btn --btn-primary --btn-block'>Proceed to Login</button>

                        <div className={styles.links}>
                            <p><Link to='/'>Home</Link></p>
                            <p><Link to='/login'>Resend Code</Link></p>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    </>);
};

export default LoginWithCode;