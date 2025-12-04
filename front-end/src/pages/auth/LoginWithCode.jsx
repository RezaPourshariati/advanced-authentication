import {useEffect, useState} from "react";
import Card from "../../components/card/Card";
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
        <div className="container min-h-screen flex justify-center items-center">
            {isLoading && <Loader/>}
            <Card>
                <div className="w-[35rem] p-6 animate-[slide-up_0.5s_ease] bg-white [&_h2]:text-[#ff4500] [&_h2]:text-center [&_form_input[type='text']]:block [&_form_input[type='email']]:block [&_form_input[type='password']]:block [&_form_input[type='text']]:text-[1.6rem] [&_form_input[type='email']]:text-[1.6rem] [&_form_input[type='password']]:text-[1.6rem] [&_form_input]:font-light [&_form_input]:p-4 [&_form_input]:my-4 [&_form_input]:mx-auto [&_form_input]:w-full [&_form_input]:border [&_form_input]:border-[#ccc] [&_form_input]:border-b-[3px] [&_form_input]:rounded [&_form_input]:outline-none [&_form_input:focus]:shadow-[0_1rem_2rem_rgba(0,0,0,0.1)] [&_form_input:focus]:border-b-[3px] [&_form_input:focus]:border-b-[#55c57a] [&_form_input:focus:invalid]:border-b-[#ff7730]">
                    <div className='flex justify-center items-center'>
                        <GrInsecure size={35} color='#999'/>
                    </div>
                    <h2 style={{marginBottom: '4rem', color: 'green'}}>Enter Access Code</h2>

                    <form onSubmit={loginUserWithCode}>
                        <label htmlFor="loginCode"><p><span className='--fw-bold'
                                                            style={{color: 'yellowgreen'}}>Email was Sent!</span>
                            <br/>Check Your Email for Access Login Code!</p></label>
                        <input type="text" placeholder='Access Code' name='loginCode' value={loginCode}
                               onChange={(e) => setLoginCode(e.target.value)} required/>

                        <button type='submit' className='text-[1.6rem] font-medium text-white px-2 py-1.5 mx-[5px] mr-0 mb-0 border border-transparent rounded-md cursor-pointer flex justify-center items-center transition-all duration-300 shadow-lg w-full bg-[#007bff] hover:bg-[#504acc]'>Proceed to Login</button>

                        <div className="flex justify-between my-[5px]">
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