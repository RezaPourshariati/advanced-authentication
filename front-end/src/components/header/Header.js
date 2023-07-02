import './Header.scss';
import {BiLogIn} from "react-icons/bi";
import {FaUserCircle} from "react-icons/fa";
import {Link, NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
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
                        <li className='--flex-center'>
                            <FaUserCircle size={20}/>
                            <p className='--color-white'>Hi, Reza</p>
                        </li>
                        <li>
                            <button className='--btn --btn-primary'>
                                <Link to='/login'>Login</Link>
                            </button>
                        </li>
                        <li>
                            <NavLink to='/profile' className={({isActive}) => isActive ? 'active' : ''}>Profile</NavLink>
                        </li>
                        <li>
                            <button className='--btn --btn-secondary'>Logout</button>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;