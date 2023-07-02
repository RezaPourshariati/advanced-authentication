import './Home.scss';
import loginImg from '../../assets/login.svg';

const Home = () => {
    return (
        <>
            <section className='container hero'>
                <div className="hero-text">
                    <h2>Ultimate MERN Stack Authentication System</h2>
                    <p>Learn and Master Authentication and Authorization using MERN Stack.</p>
                    <p>Password Reset, Social Login, User Permissions, Email Notifications etc.</p>
                    <div className='hero-buttons --flex-start'>
                        <button className="--btn --btn-danger">Register</button>
                        <button className="--btn --btn-primary">Login</button>
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