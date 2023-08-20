import './Header.scss';
import {BiLogIn} from "react-icons/bi";
import {FaUserCircle} from "react-icons/fa";
import {Link, NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout, RESET} from "../../redux/features/auth/authSlice";
import {ShowOnLogin, ShowOnLogout} from "../protect/hiddenLink";

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

    return (
        <>
            <header className='header'>
                <nav>
                    <div className="logo" onClick={goHome}>
                        <BiLogIn size={35}/>
                        <span>AUTH:Reza</span>
                    </div>

                    <ul className='home-links'>
                        <ShowOnLogin>
                            <li className='--flex-center'>
                                <FaUserCircle size={20}/>
                                <p className='--color-white'>Hi, Reza</p>
                            </li>
                        </ShowOnLogin>
                        <ShowOnLogout>
                            <li>
                                <button className='--btn --btn-primary'>
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