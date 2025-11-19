import './Loader.scss';
import ReactDom from 'react-dom';
import loaderImg from '../../assets/Infinity-1.3s-141px.svg';

const Loader = () => {
    return ReactDom.createPortal(
        <div className='wrapper'>
            <div className="loader">
                <img src={loaderImg} alt="Loading..."/>
            </div>
        </div>,
        document.getElementById('loader')
    );
};

export const Spinner = () => {
    return (
        <div className='--center-all'>
            <img src={loaderImg} alt="Loading..."/>
        </div>
    );
};

export default Loader;