import loginImg from '../../assets/login.svg';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <>
            <section className='container flex justify-center items-center bg-[#eee] min-h-[80vh] max-md:flex-col'>
                <div className="w-1/2 [&>*]:text-[#333] [&>*]:mb-8 max-md:w-full max-md:flex max-md:justify-center max-md:items-center max-md:flex-col max-md:mx-auto max-md:text-center [&_h2_span]:block [&_.hero-buttons_a]:text-white">
                    <h2>Ultimate MERN Stack Authentication System</h2>
                    <p>Learn and Master Authentication and Authorization using MERN Stack.</p>
                    <p>Password Reset, Social Login, User Permissions, Email Notifications etc.</p>
                    <div className='hero-buttons flex justify-start items-center'>
                        <button className="text-[1.6rem] font-medium text-white px-2 py-1.5 mx-[5px] mr-0 mb-0 border border-transparent rounded-md cursor-pointer flex justify-center items-center transition-all duration-300 shadow-lg bg-[#645cff] hover:bg-[#504acc] font-bold">
                            <Link to="/register">Register</Link>
                        </button>
                        <button className="text-[1.6rem] font-medium text-white px-2 py-1.5 mx-[5px] mr-0 mb-0 border border-transparent rounded-md cursor-pointer flex justify-center items-center transition-all duration-300 shadow-lg bg-[#645cff] hover:bg-[#504acc] font-bold">
                            <Link to="/login">Login</Link>
                        </button>
                    </div>
                </div>

                <div className='w-1/2 text-center max-md:w-full [&_img]:w-4/5 max-md:[&_img]:w-full'>
                    <img src={loginImg} alt="Auth"/>
                </div>
            </section>
        </>
    );
};

export default Home;