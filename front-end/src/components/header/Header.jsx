import {BiLogIn} from "react-icons/bi";
import {FaUserCircle} from "react-icons/fa";
import {Link, NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUser, logout, RESET} from "../../redux/features/auth/authSlice";
import {ShowOnLogin, ShowOnLogout} from "../protect/hiddenLink";
import {UserName} from "../../pages/profile/Profile";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goHome = () => {
        navigate('/');
    };

    const logoutUser = async () => {
        dispatch(RESET());
        await dispatch(logout());
        navigate("/login");
    };

    // const {user} = useSelector((state) => state.auth);
    // useEffect(() => {
    //     dispatch(getUser());
    // }, [dispatch]);

    return (
        <>
            <header className='bg-[#3f37c9] h-28 flex justify-center items-center w-full mx-auto px-5 pt-8'>
                <nav className='w-full max-w-[1000px] text-white flex justify-between items-center'>
                    <div className="flex justify-center items-center text-[3rem] text-white cursor-pointer" onClick={goHome}>
                        <BiLogIn size={40}/>
                        <span className="font-bold">R.Secure:One</span>
                    </div>

                    <ul className='mx-8 flex justify-center items-center [&>*]:ml-4 [&>*]:text-white [&_li_a]:text-white'>
                        <ShowOnLogin>
                            <li className='flex justify-center items-center gap-5 mr-8'>
                                <FaUserCircle size={20}/>
                                <UserName/>
                            </li>
                        </ShowOnLogin>
                        <ShowOnLogout>
                            <li>
                                <button className='text-[1.6rem] font-medium text-white px-2 py-1.5 mx-[5px] mr-0 mb-0 border border-transparent rounded-md cursor-pointer flex justify-center items-center transition-all duration-300 shadow-lg border-white bg-transparent hover:bg-[#504acc]'>
                                    <Link to='/login'>Login</Link>
                                </button>
                            </li>
                        </ShowOnLogout>
                        <ShowOnLogin>
                            <li>
                                <NavLink to='/profile'
                                         className={({isActive}) => isActive ? 'active' : ''}>Profile</NavLink>
                            </li>
                            <li>
                                <button className='text-[1.6rem] font-medium text-white px-2 py-1.5 mx-[5px] mr-0 mb-0 border border-transparent rounded-md cursor-pointer flex justify-center items-center transition-all duration-300 shadow-lg border-white bg-transparent hover:bg-[#504acc]' onClick={logoutUser}>Logout</button>
                            </li>
                        </ShowOnLogin>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;