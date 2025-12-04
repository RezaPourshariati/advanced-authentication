import {useEffect, useState} from "react";
import Card from "../../components/card/Card";
import {BiLogIn} from "react-icons/bi";
import {Link, useNavigate} from "react-router-dom";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {validateEmail} from "@/redux/features/auth/authService.js";
import {login, loginWithGoogle, RESET, sendLoginCode} from "@/redux/features/auth/authSlice.js";
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
            <div className="container min-h-screen flex justify-center items-center">
                {isLoading && <Loader/>}
                <Card>
                    <div className="w-[35rem] p-6 animate-[slide-up_0.5s_ease] bg-white [&_h2]:text-[#ff4500] [&_h2]:text-center [&_form_input[type='text']]:block [&_form_input[type='email']]:block [&_form_input[type='password']]:block [&_form_input[type='text']]:text-[1.6rem] [&_form_input[type='email']]:text-[1.6rem] [&_form_input[type='password']]:text-[1.6rem] [&_form_input]:font-light [&_form_input]:p-4 [&_form_input]:my-4 [&_form_input]:mx-auto [&_form_input]:w-full [&_form_input]:border [&_form_input]:border-[#ccc] [&_form_input]:border-b-[3px] [&_form_input]:rounded [&_form_input]:outline-none [&_form_input:focus]:shadow-[0_1rem_2rem_rgba(0,0,0,0.1)] [&_form_input:focus]:border-b-[3px] [&_form_input:focus]:border-b-[#55c57a] [&_form_input:focus:invalid]:border-b-[#ff7730] [&_form_.links]:flex [&_form_.links]:justify-between [&_form_.links]:my-[5px] [&_form_p]:text-center [&_form_p]:my-4 [&_form_p]:transition-all [&_form_p]:duration-200 [&_form_p]:text-[#007bff] [&_form_p:hover]:text-[#ff4500] [&_form_p:hover]:cursor-pointer">
                        <div className='flex justify-center items-center'>
                            <BiLogIn size={40} color='#999'/>
                        </div>
                        <h2 style={{marginBottom: '2rem'}}>Login</h2>
                        <div className='flex justify-center items-center'>
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
                        <p className='text-center font-semibold'>or</p>

                        <form onSubmit={loginUser}>
                            <input type="email" placeholder='Email' name='email' value={email}
                                   onChange={handleInputChange} required/>
                            <PasswordInput placeholder='Password' name='password' value={password}
                                           onChange={handleInputChange}/>
                            <button type='submit' className='text-[1.6rem] font-medium text-white px-2 py-1.5 mx-[5px] mr-0 mb-0 border border-transparent rounded-md cursor-pointer flex justify-center items-center transition-all duration-300 shadow-lg w-full bg-[#007bff] hover:bg-[#504acc]'>Login</button>
                        </form>

                        <Link to='/forgot'>Forgot Password</Link>
                        <span className="flex justify-center items-center mt-4">
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