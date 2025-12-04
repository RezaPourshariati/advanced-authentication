import {useState} from "react";
import Card from "../../components/card/Card";
import PageMenu from "../../components/pageMenu/PageMenu";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {changePassword, logout, RESET} from "../../redux/features/auth/authSlice";
import {Spinner} from "../../components/loader/Loader";
import {sendAutomatedEmail} from "../../redux/features/email/emailSlice";

const initialState = {
    oldPassword: '',
    password: '',
    password2: ''
};

const ChangePassword = () => {
    useRedirectLoggedOutUser("/login");

    const [formData, setFormData] = useState(initialState);
    const {oldPassword, password, password2} = formData;

    const {isLoading, user} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        // const {name, value} = e.target;
        const name = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [name]: value}); // Dynamic assign
    };

    const updatePassword = async (e) => {
        e.preventDefault();
        if (!oldPassword || !password || !password2) return toast.error("All fields are required");
        if (password !== password2) return toast.error("Password do not match");

        const userData = {oldPassword, password};

        const emailData = {
            subject: "Password Changed - AUTH:REZA",
            send_to: user.email,
            reply_to: "noreply@rezapshr.com",
            template: "changePassword",
            url: "/forgot"
        };

        await dispatch(changePassword(userData));
        await dispatch(sendAutomatedEmail(emailData));
        await dispatch(logout());
        await dispatch(RESET(userData));
        navigate("/login");
    };

    return (
        <>
            <section>
                <div className="container">
                    <PageMenu/>
                    <h2>Change Password</h2>
                    <div className="flex justify-center items-center">
                        <Card cardClass={"w-full max-w-[400px] p-4 border border-red-500"}>
                            <form onSubmit={updatePassword} className="[&_label]:block [&_label]:text-[1.4rem] [&_label]:font-medium [&_input[type='text']]:block [&_input[type='number']]:block [&_input[type='file']]:block [&_input[type='email']]:block [&_select]:block [&_textarea]:block [&_input[type='password']]:block [&_input]:text-[1.6rem] [&_input]:font-light [&_input]:p-4 [&_input]:my-4 [&_input]:mx-auto [&_input]:w-full [&_input]:border [&_input]:border-[#777] [&_input]:rounded [&_input]:outline-none [&_select]:text-[1.6rem] [&_select]:font-light [&_select]:p-4 [&_select]:my-4 [&_select]:mx-auto [&_select]:w-full [&_select]:border [&_select]:border-[#777] [&_select]:rounded [&_select]:outline-none [&_textarea]:text-[1.6rem] [&_textarea]:font-light [&_textarea]:p-4 [&_textarea]:my-4 [&_textarea]:mx-auto [&_textarea]:w-full [&_textarea]:border [&_textarea]:border-[#777] [&_textarea]:rounded [&_textarea]:outline-none">
                                <label htmlFor="oldPassword">Current Password: </label>
                                <PasswordInput placeholder='Current Password' name='oldPassword' value={oldPassword}
                                               onChange={handleInputChange}/>
                                <label htmlFor="password">New Password: </label>
                                <PasswordInput placeholder='Password' name='password' value={password}
                                               onChange={handleInputChange}/>
                                <label htmlFor="password2">Confirm New Password: </label>
                                <PasswordInput placeholder='Confirm Password' name='password2' value={password2}
                                               onChange={handleInputChange}/>
                                {isLoading ? <Spinner/> : (
                                    <button type="submit" className='text-[1.6rem] font-medium text-white px-2 py-1.5 mx-[5px] mr-0 mb-0 border border-transparent rounded-md cursor-pointer flex justify-center items-center transition-all duration-300 shadow-lg w-full bg-[#007bff] hover:bg-[#504acc]'>Change
                                        Password</button>
                                )}
                            </form>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ChangePassword;