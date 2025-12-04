import Header from "../header/Header";
import Footer from "../footer/Footer";


const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <div className='max-w-full mx-auto px-5' style={{minHeight: '80vh'}}>
                {children}
            </div>
            <Footer/>
        </>
    );
};

export default Layout;