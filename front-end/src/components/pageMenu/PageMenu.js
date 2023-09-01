import {NavLink} from "react-router-dom";
import {AdminAuth} from "../protect/hiddenLink";

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
                        <AdminAuth>
                            <li className='--mx2'>
                                <NavLink to='/users'>Users</NavLink>
                            </li>
                        </AdminAuth>
                    </ul>
                </nav>
            </div>
        </>
);
};

export default PageMenu;