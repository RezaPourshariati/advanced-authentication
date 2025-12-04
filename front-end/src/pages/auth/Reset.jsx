import {useEffect, useState} from "react";
import Card from "../../components/card/Card";
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
            <div className="container min-h-screen flex justify-center items-center">
                {isLoading && <Loader/>}
                <Card>
                    <div className="w-[35rem] p-6 animate-[slide-up_0.5s_ease] bg-white [&_h2]:text-[#ff4500] [&_h2]:text-center [&_form_input[type='text']]:block [&_form_input[type='email']]:block [&_form_input[type='password']]:block [&_form_input[type='text']]:text-[1.6rem] [&_form_input[type='email']]:text-[1.6rem] [&_form_input[type='password']]:text-[1.6rem] [&_form_input]:font-light [&_form_input]:p-4 [&_form_input]:my-4 [&_form_input]:mx-auto [&_form_input]:w-full [&_form_input]:border [&_form_input]:border-[#ccc] [&_form_input]:border-b-[3px] [&_form_input]:rounded [&_form_input]:outline-none [&_form_input:focus]:shadow-[0_1rem_2rem_rgba(0,0,0,0.1)] [&_form_input:focus]:border-b-[3px] [&_form_input:focus]:border-b-[#55c57a] [&_form_input:focus:invalid]:border-b-[#ff7730]">
                        <div className='flex justify-center items-center'>
                            <MdPassword size={35} color='#999'/>
                        </div>
                        <h2 style={{marginBottom: '4rem', color: 'green'}}>Reset Password</h2>

                        <form onSubmit={reset}>
                            <label htmlFor="email"><p>Please Enter New Password.</p></label>
                            <PasswordInput placeholder='Password' name='password' value={password}
                                           onChange={handleInputChange}/>
                            <PasswordInput placeholder='Confirm Password' name='password2' value={password2}
                                           onChange={handleInputChange}/>
                            <button type='submit' className='text-[1.6rem] font-medium text-white px-2 py-1.5 mx-[5px] mr-0 mb-0 border border-transparent rounded-md cursor-pointer flex justify-center items-center transition-all duration-300 shadow-lg w-full bg-[#007bff] hover:bg-[#504acc]'>Reset Password</button>

                            <div className="flex justify-between my-[5px]">
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