import './PasswordInput.scss';
import {useState} from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

const PasswordInput = ({placeholder, value, onChange, name, onPaste}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className='password'>
                <input type={showPassword ? "text" : "password"} placeholder={placeholder} name={name} value={value}
                       onChange={onChange} onPaste={onPaste} required/>
                <div className='icon' onClick={togglePassword}>
                    {showPassword ? (<AiOutlineEye size={22}/>) : (<AiOutlineEyeInvisible size={22}/>)}
                </div>
            </div>
        </>
    );
};

export default PasswordInput;