import {NavLink} from "react-router-dom";
import {AdminAuth} from "../protect/hiddenLink";

const PageMenu = () => {
    return (
        <>
            <div>
                <nav className='text-white bg-[rgb(174,49,4)] p-4 mb-4' style={{borderRadius: '8px'}}>
                    <ul className='mx-8 flex justify-center items-center [&>*]:ml-4 [&>*]:text-white [&_li_a]:text-white'>
                        <li className='mx-8'>
                            <NavLink to='/profile'>Profile</NavLink>
                        </li>
                        <li className='mx-8'>
                            <NavLink to='/changePassword'>Change Password</NavLink>
                        </li>
                        <AdminAuth>
                            <li className='mx-8'>
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