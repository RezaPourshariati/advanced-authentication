import {NavLink} from "react-router-dom";

const PageMenu = () => {
    return (
        <>
            <div>
                <nav className='--btn-google --p --mb' style={{borderRadius: '8px'}}>
                    <ul className='home-links'>
                        <li className='--mx2'>
                            <NavLink to='/profile'>Profile</NavLink>
                        </li>
                        <li className='--mx2'>
                            <NavLink to='/changePassword'>Change Password</NavLink>
                        </li>
                        <li className='--mx2'>
                            <NavLink to='/users'>Users</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default PageMenu;