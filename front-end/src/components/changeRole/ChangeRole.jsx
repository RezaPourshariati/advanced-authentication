import {useState} from "react";
import {FaCheck} from "react-icons/fa";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, updateUser, upgradeUser} from "../../redux/features/auth/authSlice";
import {EMAIL_RESET, sendAutomatedEmail} from "../../redux/features/email/emailSlice";


const ChangeRole = ({id, email}) => {
    const [userRole, setUserRole] = useState('');
    const dispatch = useDispatch();

    // Change User Role
    const changeRole = async (e) => {
        e.preventDefault();
        if (!userRole) toast.error("Please select a role");
        const userData = {
            role: userRole,
            id: id
        };

        const emailData = {
            subject: "Account Role Changed - AUTH:REZA",
            send_to: email,
            reply_to: "noreply@rezapshr.com",
            template: "changeRole",
            url: "/login"
        };

        await dispatch(upgradeUser(userData));
        await dispatch(sendAutomatedEmail(emailData));
        await dispatch(getUsers());
        await dispatch(EMAIL_RESET());
    };

    return (
        <>
            <div>
                <form className="flex justify-start items-start" onSubmit={(e) => changeRole(e, id, userRole)}>
                    <select value={userRole} onChange={(e) => setUserRole(e.target.value)}
                            className="text-[1.6rem] font-light px-2 py-1 my-0 mx-[5px] mr-0 mb-0 border-none border-b-2 border-[#777] outline-none"
                            style={{border: "1px solid yellowgreen", borderRadius: "6px"}}>
                        <option value="select roles">select roles</option>
                        <option value="subscriber">Subscriber</option>
                        <option value="author">Author</option>
                        <option value="admin">Admin</option>
                        <option value="suspended">Suspended</option>
                    </select>
                    <button className='text-[1.6rem] font-medium text-white px-2 py-1.5 mx-[5px] mr-0 mb-0 border border-transparent rounded-md cursor-pointer flex justify-center items-center transition-all duration-300 shadow-lg bg-[#007bff] hover:bg-[#504acc]'><FaCheck size={15}/></button>
                </form>
            </div>
        </>
    );
};

export default ChangeRole;