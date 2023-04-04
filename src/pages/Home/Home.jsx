import { useDispatch, useSelector } from 'react-redux'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import { BsCart2 } from 'react-icons/bs'
import { useEffect } from 'react'
import { fetchProducts } from '../../redux/products/products.actions'
import { addToCart } from '../../redux/cart/cart.slice'
import { toast } from 'react-toastify'

const FeaturedCard = ({ product }) => {
    const dispatch = useDispatch();
    const addCartHandler = (product) => {
        dispatch(addToCart(product))
        toast.success('Successfully Added to Cart!', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return (
        <div className={styles.featuredCard}>
            <div className={styles.top}>
                <img src={product.thumbnail} alt={product.title} />
                <div className={styles.topIcons} onClick={() => addCartHandler(product)}><BsCart2 /></div>
                <Link to={`/products/${product.id}`} className={styles.bottomButton}>View Details</Link>
            </div>
            <div className={styles.bottom}>
                <h3>{product.title}</h3>
                <span>Code - {product.id}</span>
                <span>${product.price}</span>
            </div>
        </div>
    )
}

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

const Home = () => {
    const products = useSelector(state => state.products.data);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts(`/products?_limit=8`));
    }, [])

    return (
        <main className={styles.container}>
            {/* featuredCard */}
            <section className={styles.featured}>
                <div className={styles.wrapper}>
                    <h2>Featured Products</h2>
                    <div className={styles.products}>
                        {
                            (products && products.length > 0) ?
                                products.slice(0, 8).map((product, key) => (
                                    <FeaturedCard product={product} key={key} />
                                ))
                                :
                                [0, 0, 0, 0].map((p, key) => <DummyFeaturedCard key={key} />)
                        }
                    </div>
                </div>
            </section>

            {/* top Categories */}
            <section className={styles.categories}>
                <div className={styles.wrapper}>
                    <h2>Top Categories</h2>
                    <div className={styles.cards}>
                        <Link to={'/products?category=smartphones'} className={styles.card}>
                            <div className={styles.top}>
                                <div className={styles.front}>
                                    <img src="https://i.dummyjson.com/data/products/1/thumbnail.jpg" alt="smartphones" />
                                    <span>View Shop</span>
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <h3>Smart Phones</h3>
                            </div>
                        </Link>

                        <Link to={'/products?category=skincare'} className={styles.card}>
                            <div className={styles.top}>
                                <div className={styles.front}>
                                    <img src="https://i.dummyjson.com/data/products/20/thumbnail.jpg" alt="skincare" />
                                    <span>View Shop</span>
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <h3>Skin Care</h3>
                            </div>
                        </Link>

                        <Link to={'/products?category=tops'} className={styles.card}>
                            <div className={styles.top}>
                                <div className={styles.front}>
                                    <img src="https://i.dummyjson.com/data/products/40/thumbnail.jpg" alt="tops" />
                                    <span>View Shop</span>
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <h3>Tops</h3>
                            </div>
                        </Link>

                        <Link to={'/products?category=sunglasses'} className={styles.card}>
                            <div className={styles.top}>
                                <div className={styles.front}>
                                    <img src="https://i.dummyjson.com/data/products/85/thumbnail.jpg" alt="sunglasses" />
                                    <span>View Shop</span>
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <h3>Sun Glasses</h3>
                            </div>
                        </Link>

                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home