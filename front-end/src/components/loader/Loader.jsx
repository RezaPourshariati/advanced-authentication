import ReactDom from 'react-dom';
import loaderImg from '../../assets/Infinity-1.3s-141px.svg';

const Loader = () => {
    return ReactDom.createPortal(
        <div className='fixed w-screen h-screen bg-black/70 z-[9]'>
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]">
                <img src={loaderImg} alt="Loading..."/>
            </div>
        </div>,
        document.getElementById('loader')
    );
};

export const Spinner = () => {
    return (
        <div className='flex justify-center items-center flex-col w-full mx-auto text-center'>
            <img src={loaderImg} alt="Loading..."/>
        </div>
    );
};

export default Loader;