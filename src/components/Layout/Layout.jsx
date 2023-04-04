import { Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCart } from '../../redux/cart/cart.slice';
const Layout = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]
    )

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCart())
    }, [])

    return (
        <div>
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default Layout