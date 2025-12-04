import {useDispatch} from "react-redux";
import {RESET, sendVerificationEmail} from "../../redux/features/auth/authSlice";

const Notification = () => {

    const dispatch = useDispatch();

    const sendVerEmail = async () => {
        await dispatch(sendVerificationEmail());
        await dispatch(RESET());
    };

    return (
        <>
            <div className="container">
                <div className="w-full border border-red-600 rounded bg-red-100/20 relative flex justify-start p-4">
                    <p className="text-[1.3rem]"><b>Message: &nbsp;</b></p>
                    <p className="text-[1.3rem]">To verify your account, check your email for a verification link. &nbsp;</p>
                    <p className="text-[1.3rem] cursor-pointer text-[#1f93ff]" onClick={sendVerEmail}><b>Resend Link</b></p>
                </div>
            </div>
        </>
    );
};

export default Notification;