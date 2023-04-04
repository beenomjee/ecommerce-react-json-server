import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../../redux/product/product.actions';
import { useParams } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styles from './SingleProduct.module.css';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cart/cart.slice';

const SingleProduct = () => {
    const data = useSelector(state => state.product.data);
    const status = useSelector(state => state.product.status);
    const { id } = useParams();
    const dispatch = useDispatch();
    const addCartHandler = () => {
        dispatch(addToCart(data))
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

    useEffect(() => {
        dispatch(fetchProduct(id))
    }, [])
    return (
        (status && status == "succeeded") ? <main className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <h6>Product Details</h6>
                    <span>Products . <span>Product Details</span></span>
                </div>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.middle}>
                    <div className={styles.left}>
                        <div>
                            <div className={styles.left}>
                                {
                                    data && data.images && data?.images.slice(0, 3).map((img, key) =>
                                        <img src={img} alt={data.title} key={key} />)
                                }
                            </div>
                            <div className={styles.right}>
                                <img src={data && data.thumbnail} alt={data && data.title} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <h1>{data && data.title}</h1>
                        <div className={styles.rating}>{data && new Array(Math.floor(data.rating)).fill(0).map((a, key) => <AiFillStar key={key} />)}
                            {data && new Array(5 - Math.floor(data.rating)).fill(0).map((a, key) => <AiOutlineStar className={styles.fill} key={key} />)}</div>
                        <div className={styles.price}><span>${data && data.price}</span> <span>${data && Math.round(data.price * (100 + data.discountPercentage) / 100)}</span></div>
                        <div className={styles.category}>
                            <span>Category: </span>
                            <span>{data && data.category}</span>
                        </div>
                        <div className={styles.brand}>
                            <span>Brand: </span>
                            <span>{data && data.brand}</span>
                        </div>
                        <div className={styles.button}>
                            <button onClick={addCartHandler}>Add To Cart</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.bottom}>
                    <h6>Description</h6>
                    <p>{data && data.description}</p>
                </div>
            </div>

        </main > :
            <p style={{ textAlign: "center", padding: "20px 10px" }}>No Item Found!</p>
    )
}

export default SingleProduct