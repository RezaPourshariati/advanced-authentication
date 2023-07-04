import {useEffect, useState} from "react";
import Card from "../../components/card/Card";
import styles from './auth.module.scss';
import {Link} from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import {TiUserAddOutline} from "react-icons/ti";
import {FaTimes} from "react-icons/fa";
import {BsCheck2All} from "react-icons/bs";
// import './auth.module.scss';

const initialState = {
    name: '',
    email: '',
    password: '',
    password2: ''
};

const Register = () => {

    const [formData, setFormData] = useState(initialState);
    const {name, email, password, password2} = formData;

    const [uppercase, setUppercase] = useState(false);
    const [num, setNum] = useState(false);
    const [specialCharacter, setSpecialCharacter] = useState(false);
    const [passLength, setPassLength] = useState(false);

    const timesIcon = <FaTimes color='red' size={15}/>;
    const checkIcon = <BsCheck2All color='green' size={15}/>;

    const [style, setStyle] = useState('#999');

    const switchIcon = (condition) => {
        if (condition) return checkIcon;
        return timesIcon;
    };

    useEffect(() => {
        if (password.length > 4 && !uppercase) setStyle('red');
        if (password.length > 4 && !num) setStyle('red');
        if (password.length > 4 && !specialCharacter) setStyle('red');
        if (password.length > 4 && !passLength) setStyle('red');
    }, [password, uppercase, num, specialCharacter, passLength]);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]: value}); // Dynamic assign
    };

    useEffect(() => {
        // Check Lower and Uppercase
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) setUppercase(true);
        else setUppercase(false);
        // Check for Numbers
        if (password.match(/([0-9])/)) setNum(true);
        else setNum(false);
        // Check for Special Character
        if (password.match(/([!,%&@#$^*?_~])/)) setSpecialCharacter(true);
        else setSpecialCharacter(false);
        // Check for Password length
        if (password.length > 7) setPassLength(true);
        else setPassLength(false);
    }, [password]);

    const loginUser = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <div className='--flex-center'>
                            <TiUserAddOutline size={60} color='orangered'/>
                        </div>
                        <h2 style={{marginBottom: '4rem'}}>Register</h2>

                        <form onSubmit={loginUser}>
                            <input type="text" placeholder='Name' name='name' value={name}
                                   onChange={handleInputChange} required/>
                            <input type="email" placeholder='Email' name='email' value={email}
                                   onChange={handleInputChange} required/>
                            <PasswordInput placeholder='Password' name='password' value={password}
                                           onChange={handleInputChange}/>
                            <PasswordInput placeholder='Confirm Password' name='password2' value={password2}
                                           onChange={handleInputChange}/>
                            {/* Password Strength */}
                            <Card cardClass={styles.group}>
                                <ul className='form-list'>
                                    <li>
                                        <span className={styles.indicator}
                                              style={{color: `${uppercase ? 'yellowgreen' : `${style}`}`}}>
                                            {switchIcon(uppercase)} &nbsp; Lowercase and Uppercase
                                        </span>
                                    </li>
                                    <li>
                                        <span className={styles.indicator}
                                              style={{color: `${num ? 'yellowgreen' : `${style}`}`}}>
                                            {switchIcon(num)} &nbsp; Number(0-9)
                                        </span>
                                    </li>
                                    <li>
                                        <span className={styles.indicator}
                                              style={{color: `${specialCharacter ? 'yellowgreen' : `${style}`}`}}>
                                            {switchIcon(specialCharacter)} &nbsp; Special Character(!@#$%^&*)
                                        </span>
                                    </li>
                                    <li>
                                        <span className={styles.indicator}
                                              style={{color: `${passLength ? 'yellowgreen' : `${style}`}`}}>
                                            {switchIcon(passLength)} &nbsp; At least 8 Character
                                        </span>
                                    </li>
                                </ul>
                            </Card>

                            <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>

                        </form>

                        <span className={styles.register}>
                            <Link to='/'>Home</Link>
                            <p>&nbsp; Already have an account? &nbsp;</p>
                            <Link to='/login'>Login</Link>
                        </span>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default Register;