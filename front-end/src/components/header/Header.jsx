import './Header.scss';
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
            <header className='header'>
                <nav>
                    <div className="logo" onClick={goHome}>
                        <BiLogIn size={40}/>
                        <span style={{fontWeight: "bold"}}>R.Secure:One</span>
                    </div>

                    <ul className='home-links'>
                        <ShowOnLogin>
                            <li className='--flex-center' style={{display: "flex", gap: '1.2rem', marginRight: '2rem'}}>
                                <FaUserCircle size={20}/>
                                <UserName/>
                            </li>
                        </ShowOnLogin>
                        <ShowOnLogout>
                            <li>
                                <button className='--btn --btn-secondary'>
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
                                <button className='--btn --btn-secondary' onClick={logoutUser}>Logout</button>
                            </li>
                        </ShowOnLogin>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;