import { useDispatch, useSelector } from 'react-redux';
import styles from './Product.module.css';
import { BsCart2 } from 'react-icons/bs'
import { useEffect, useState } from 'react';
import { fetchProducts, getTotal, } from '../../redux/products/products.actions';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoMdArrowForward, IoMdArrowBack } from 'react-icons/io'

const FeaturedCard = ({ product }) => (
    <div className={styles.featuredCard}>
        <div className={styles.top}>
            <img src={product.thumbnail} alt={product.title} />
            <div className={styles.topIcons}><BsCart2 /></div>
            <Link to={`/products/${product.id}`} className={styles.bottomButton}>View Details</Link>
        </div>
        <div className={styles.bottom}>
            <h3>{product.title}</h3>
            <span>Code - {product.id}</span>
            <span>${product.price}</span>
        </div>
    </div>
)

const DummyFeaturedCard = () => (
    <div className={`${styles.dummyFeaturedCard} ${styles.featuredCard}`}>
        <div className={styles.top}></div>
        <div className={styles.bottom}>
            <h3></h3>
            <span></span>
            <span></span>
        </div>
    </div>
)

const Product = () => {
    const products = useSelector(state => state.products.data);
    const total = useSelector(state => state.products.total);
    const status = useSelector(state => state.products.status);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageNo, setPageNo] = useState(new URLSearchParams(location.search).get("_page") ? new URLSearchParams(location.search).get("_page") : 1);
    useEffect(() => {
        if (location.search) {
            dispatch(fetchProducts(`/products/${location.search}`));
            new URLSearchParams(location.search).get("_page") && setPageNo(new URLSearchParams(location.search).get("_page"));
        } else {
            navigate('/products?_page=1&_limit=20')
            dispatch(fetchProducts(`/products?_page=1&_limit=20`));
        }
    }, [pageNo, location.search])

    useEffect(() => {
        dispatch(getTotal([new URLSearchParams(location.search).get("category"), new URLSearchParams(location.search).get("q")]));
    }, [location.search])

    const previousHandler = () => {
        let url = `/products?_page=${new Number(pageNo) - 1}&_limit=20`;
        if (new URLSearchParams(location.search).get("category"))
            url += "&category=" + new URLSearchParams(location.search).get("category")

        if (new URLSearchParams(location.search).get("q"))
            url += "&q=" + new URLSearchParams(location.search).get("q")

        navigate(url)
        setPageNo(p => new Number(p) - 1);
    }
    const NextHandler = () => {
        let url = `/products?_page=${new Number(pageNo) + 1}&_limit=20`;
        if (new URLSearchParams(location.search).get("category"))
            url += "&category=" + new URLSearchParams(location.search).get("category")

        if (new URLSearchParams(location.search).get("q"))
            url += "&q=" + new URLSearchParams(location.search).get("q")


        navigate(url)
        setPageNo(p => new Number(p) + 1);
    }

    return (
        <main className={styles.container}>
            {/* featuredCard */}
            <section className={styles.featured}>
                <div className={styles.wrapper}>
                    <h2>Available Products</h2>
                    <div className={styles.products}>
                        {
                            (products && products.length > 0) ?
                                products.map((product, key) => (
                                    <FeaturedCard product={product} key={key} />
                                ))
                                :
                                status == 'succeeded' ?
                                    <p>No Item Found!</p>
                                    :

                                    new Array(8).fill(0).map((p, key) => <DummyFeaturedCard key={key} />)
                        }
                    </div>
                </div>
            </section>

            {/* pageNO */}
            <section className={styles.pageNo}>
                <div className={styles.wrapper}>
                    <button onClick={previousHandler} disabled={pageNo < 2}><IoMdArrowBack /> Previous</button>
                    <button onClick={NextHandler} disabled={!((pageNo * 20) < total)}>Next <IoMdArrowForward /></button>
                </div>
            </section>
        </main>
    )
};

export default Product;