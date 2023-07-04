import {useState} from "react";
import {FaCheck} from "react-icons/fa";


const ChangeRole = () => {
    const [userRole, setUserRole] = useState('');

    return (
        <>
            <div className="sort">
                <form className="--flex-start">
                    <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                        <option value="">select roles</option>
                        <option value="">Subscriber</option>
                        <option value="">Author</option>
                        <option value="">Admin</option>
                        <option value="">Suspended</option>
                    </select>
                    <button className='--btn --btn-primary'><FaCheck size={15}/></button>
                </form>
            </div>
        </>
    );
};

export default ChangeRole;