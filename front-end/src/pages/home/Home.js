import './Home.scss';
import loginImg from '../../assets/login.svg';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <>
            <section className='container hero'>
                <div className="hero-text">
                    <h2>SecureOne: Advanced Authentication Solution</h2>
                    <p><strong>SecureOne</strong> is your one-stop solution for advanced authentication needs.</p>
                    <p>Our platform offers a wide range of features designed to provide secure and user-friendly
                        authentication experiences. <br/> With SecureOne, you can leverage:</p>
                    <p>Social Login, User Permissions, Email Notifications, Two Factor Authentication (2FA), OAuth
                        Login, Refresh Tokens, And so on...</p>
                    <div className='hero-buttons --flex-start'>
                        <button className="--btn register" style={{fontWeight: "bold"}}>
                            <Link to="/register">Register</Link>
                        </button>
                        <button className="--btn login" style={{fontWeight: "bold"}}>
                            <Link to="/login">Login</Link>
                        </button>
                    </div>
                </div>

                <div className='hero-image'>
                    <img src={loginImg} alt="Auth"/>
                </div>
            </section>
        </>
    );
};

export default Home;