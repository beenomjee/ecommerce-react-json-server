import styles from './Header.module.css';
import { HiOutlineMail } from 'react-icons/hi'
import { BsTelephonePlusFill, BsCart2 } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { RxHamburgerMenu } from 'react-icons/rx'
import { FiSearch } from 'react-icons/fi'

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
    const cart = useSelector(state => state.cart);
    const mobileDropdownEl = useRef(null);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate()
    const openMobileHandler = () => {
        if (mobileDropdownEl.current.classList.contains(styles.open)) {
            mobileDropdownEl.current.classList.remove(styles.open);
            mobileDropdownEl.current.classList.add(styles.close);
        }
        else {
            mobileDropdownEl.current.classList.remove(styles.close);
            mobileDropdownEl.current.classList.add(styles.open);
        }
    }

    const formHandler = (e) => {
        e.preventDefault();
        navigate('/products?_limit=20&q=' + searchText);
        setSearchText('')
    }

    return (
        <header className={styles.container}>
            <div className={styles.top}>
                <div className={styles.wrapper}>
                    <div className={styles.left}>
                        <h6><HiOutlineMail style={{ color: "#fff" }} /> <span>beenomjee@gmail.com</span></h6>
                        <h6><BsTelephonePlusFill style={{ color: "#fff" }} /> <span>(12345)678910</span></h6>
                    </div>
                    <div className={styles.right}>
                        <Link to="/login"><span>Login</span> <AiOutlineUser style={{ color: "#fff" }} /></Link>
                        <Link to="/cart"><BsCart2 style={{ color: "#fff" }} /><span>{cart && cart.length ? cart.length : 0}</span></Link>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.wrapper}>
                    <div className={styles.left}>
                        <div className={styles.logo}><h2><Link to="/">Hekto</Link></h2></div>
                        <nav className={styles.navigation}>
                            <ul>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : null} to="">Home</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : null} to="/pages">Pages</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : null} to="/products">Products</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : null} to="/blog">Blog</NavLink></li>
                                <li><NavLink className={({ isActive }) => isActive ? styles.active : null} to="/contact">Contact</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.right}>
                        <form action="/products" onSubmit={formHandler}>
                            <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" required />
                            <button type="submit"><FiSearch /></button>
                        </form>
                        <div className={styles.mobile}>
                            <button onClick={openMobileHandler}><RxHamburgerMenu /></button>
                            <div className={styles.dropdown} ref={mobileDropdownEl}>
                                <form action="/products" onSubmit={formHandler}>
                                    <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" required />
                                    <button type="submit"><FiSearch /></button>
                                </form>
                                <hr />
                                <nav className={styles.navigation}>
                                    <ul>
                                        <li><NavLink className={({ isActive }) => isActive ? styles.active : null} to="">Home</NavLink></li>
                                        <li><NavLink className={({ isActive }) => isActive ? styles.active : null} to="/pages">Pages</NavLink></li>
                                        <li><NavLink className={({ isActive }) => isActive ? styles.active : null} to="/products">Products</NavLink></li>
                                        <li><NavLink className={({ isActive }) => isActive ? styles.active : null} to="/blog">Blog</NavLink></li>
                                        <li><NavLink className={({ isActive }) => isActive ? styles.active : null} to="/contact">Contact</NavLink></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header