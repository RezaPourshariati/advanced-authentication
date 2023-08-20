import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import authService from "../redux/features/auth/authService";
import {toast} from "react-toastify";

const useRedirectLoggedOutUser = (path) => {
    const navigate = useNavigate();

    useEffect(() => {
        let isLoggedIn;
        const redirectLoggedOut = async () => {
            try {
                isLoggedIn = await authService.getLoginStatus();
            } catch (error) {
                console.log(error.message);
            }
            if (!isLoggedIn) {
                toast.info("Session expired, please login to continue.");
                navigate(path);
            }
        };
        redirectLoggedOut().then(() => console.log("redirecting to login with logged out hook"));
    }, [path, navigate]);
};

export default useRedirectLoggedOutUser;