import {useState} from "react";
import Card from "../../components/card/Card";
import './ChangePassword.scss';
import PageMenu from "../../components/pageMenu/PageMenu";
import PasswordInput from "../../components/passwordInput/PasswordInput";

const initialState = {
    oldPassword: '',
    password: '',
    password2: ''
};

const ChangePassword = () => {
    const [formData, setFormData] = useState(initialState);
    const {oldPassword, password, password2} = formData;

    const handleInputChange = (e) => {

    }

    return (
        <>
            <section>
                <div className="container">
                    <PageMenu/>
                    <h2>Change Password</h2>
                    <div className="--flex-center change-password">
                        <Card cardClass={"card"}>
                            <form>
                                <label htmlFor="oldPassword">Current Password: </label>
                                <PasswordInput placeholder='Current Password' name='oldPassword' value={oldPassword}
                                               onChange={handleInputChange}/>
                                <label htmlFor="password">New Password: </label>
                                <PasswordInput placeholder='Password' name='password' value={password}
                                               onChange={handleInputChange}/>
                                <label htmlFor="password2">Confirm New Password: </label>
                                <PasswordInput placeholder='Confirm Password' name='password2' value={password2}
                                               onChange={handleInputChange}/>
                                <button className='--btn --btn-danger --btn-block'>Change Password</button>
                            </form>

                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ChangePassword;