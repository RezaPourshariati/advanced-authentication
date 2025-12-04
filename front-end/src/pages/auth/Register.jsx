import {useEffect, useState} from "react";
import Card from "../../components/card/Card";
import {Link, useNavigate} from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import {TiUserAddOutline} from "react-icons/ti";
import {FaTimes} from "react-icons/fa";
import {BsCheck2All} from "react-icons/bs";
import {toast} from "react-toastify";
import {validateEmail} from "../../redux/features/auth/authService";
import {useDispatch, useSelector} from "react-redux";
import {register, RESET, sendVerificationEmail} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";


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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isLoading, isLoggedIn, isSuccess, message} = useSelector((state) => state.auth);

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

    const registerUser = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) toast.error("All field are required");
        if (password.length < 8) toast.error("Password must be up to 6 characters");
        if (!validateEmail(email)) toast.error("Please enter a valid email");
        if (password !== password2) toast.error("Password wasn't match");

        const userData = {name, email, password};
        // console.log(userData);

        await dispatch(register(userData));
        await dispatch(sendVerificationEmail());
    };

    useEffect(() => {
        if (isSuccess && isLoggedIn) navigate("/profile");
        dispatch(RESET());
    }, [isLoggedIn, isSuccess, dispatch, navigate]);

    return (
        <>
            <div className="container min-h-screen flex justify-center items-center">
                {isLoading && <Loader/>}
                <Card>
                    <div className="w-[35rem] p-6 animate-[slide-up_0.5s_ease] bg-white [&_h2]:text-[#ff4500] [&_h2]:text-center [&_form_input[type='text']]:block [&_form_input[type='email']]:block [&_form_input[type='password']]:block [&_form_input[type='text']]:text-[1.6rem] [&_form_input[type='email']]:text-[1.6rem] [&_form_input[type='password']]:text-[1.6rem] [&_form_input]:font-light [&_form_input]:p-4 [&_form_input]:my-4 [&_form_input]:mx-auto [&_form_input]:w-full [&_form_input]:border [&_form_input]:border-[#ccc] [&_form_input]:border-b-[3px] [&_form_input]:rounded [&_form_input]:outline-none [&_form_input:focus]:shadow-[0_1rem_2rem_rgba(0,0,0,0.1)] [&_form_input:focus]:border-b-[3px] [&_form_input:focus]:border-b-[#55c57a] [&_form_input:focus:invalid]:border-b-[#ff7730] [&_form_.links]:flex [&_form_.links]:justify-between [&_form_.links]:my-[5px] [&_form_p]:text-center [&_form_p]:my-4 [&_form_p]:transition-all [&_form_p]:duration-200 [&_form_p]:text-[#007bff] [&_form_p:hover]:text-[#ff4500] [&_form_p:hover]:cursor-pointer">
                        <div className='flex justify-center items-center'>
                            <TiUserAddOutline size={60} color='orangered'/>
                        </div>
                        <h2 style={{marginBottom: '4rem'}}>Register</h2>

                        <form onSubmit={registerUser}>
                            <input type="text" placeholder='Name' name='name' value={name}
                                   onChange={handleInputChange} required/>
                            <input type="email" placeholder='Email' name='email' value={email}
                                   onChange={handleInputChange} required/>
                            <PasswordInput placeholder='Password' name='password' value={password}
                                           onChange={handleInputChange}/>
                            <PasswordInput placeholder='Confirm Password' name='password2' value={password2}
                                           onChange={handleInputChange} onPaste={(e) => {
                                e.preventDefault();
                                toast.error("Cannot paste into input field");
                                return false;
                            }}/>
                            {/* Password Strength */}
                            <Card cardClass="border border-[#1f93ff] p-[5px] mb-[5px]">
                                <ul className='form-list'>
                                    <li>
                                        <span className="flex justify-start items-center text-[10px]"
                                              style={{color: `${uppercase ? 'yellowgreen' : `${style}`}`}}>
                                            {switchIcon(uppercase)} &nbsp; Lowercase and Uppercase
                                        </span>
                                    </li>
                                    <li>
                                        <span className="flex justify-start items-center text-[10px]"
                                              style={{color: `${num ? 'yellowgreen' : `${style}`}`}}>
                                            {switchIcon(num)} &nbsp; Number(0-9)
                                        </span>
                                    </li>
                                    <li>
                                        <span className="flex justify-start items-center text-[10px]"
                                              style={{color: `${specialCharacter ? 'yellowgreen' : `${style}`}`}}>
                                            {switchIcon(specialCharacter)} &nbsp; Special Character(!@#$%^&*)
                                        </span>
                                    </li>
                                    <li>
                                        <span className="flex justify-start items-center text-[10px]"
                                              style={{color: `${passLength ? 'yellowgreen' : `${style}`}`}}>
                                            {switchIcon(passLength)} &nbsp; At least 8 Character
                                        </span>
                                    </li>
                                </ul>
                            </Card>

                            <button type='submit' className='text-[1.6rem] font-medium text-white px-2 py-1.5 mx-[5px] mr-0 mb-0 border border-transparent rounded-md cursor-pointer flex justify-center items-center transition-all duration-300 shadow-lg w-full bg-[#007bff] hover:bg-[#504acc]'>Register</button>

                        </form>

                        <span className="flex justify-center items-center mt-4">
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