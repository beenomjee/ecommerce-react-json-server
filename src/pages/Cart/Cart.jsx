import styles from './Cart.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { BsCartXFill } from 'react-icons/bs'
import { decrement, empty, increment } from '../../redux/cart/cart.slice'

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const subtotal = cart.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.price * currentItem.quantity);
    }, 0);
    const dispatch = useDispatch()
    const inc = (item) => {
        dispatch(increment(item));
    }
    const dec = (item) => {
        if (item.quantity > 0) {
            dispatch(decrement(item));
        }
    }


    return (
        <main className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <h6>Shopping Cart</h6>
                    <span>Account . <span>Shopping Cart</span></span>
                </div>
            </div>

            {/* cart */}
            <div className={styles.wrapper}>
                <div className={styles.bottom}>
                    <div className={styles.left}>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: "40%" }}>Product</th>
                                    <th style={{ width: "20%" }}>Price</th>
                                    <th style={{ width: "20%" }}>Quantity</th>
                                    <th style={{ width: "20%" }}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (cart.length > 0) ?
                                        cart.map((item, key) => (
                                            <tr key={key}>
                                                <td>
                                                    <div className={styles.left}>
                                                        <img src={item.thumbnail} alt={item.title} />
                                                    </div>
                                                    <div className={styles.right}>
                                                        <h6>{item.title}</h6>
                                                        <span><span>Brand :</span> {item.brand}</span>
                                                    </div>

                                                </td>
                                                <td>${item.price}</td>
                                                <td>
                                                    <button onClick={() => dec(item)}>-</button>
                                                    <button disabled>{item.quantity}</button>
                                                    <button onClick={() => inc(item)}>+</button>
                                                </td>
                                                <td>${item.quantity * item.price}</td>
                                            </tr>))
                                        : <p>Yet No Item Added to Cart!</p>
                                }
                            </tbody>
                        </table>

                        <div className={styles.row}>
                            <button disabled={cart.length < 1} onClick={() => dispatch(empty())}><BsCartXFill /> <span>Clear Cart</span></button>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <h2>Cart Totals</h2>
                        <div className={styles.body}>
                            <div className={styles.row}>
                                <span>Subtotals:</span>
                                <span>${subtotal}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Totals:</span>
                                <span>${Math.floor(subtotal * 0.05 + subtotal)}</span>
                            </div>
                            <p><AiFillCheckCircle /> <span>Shipping and Taxes are calculated at checkout</span></p>
                            <Link to={cart.length > 0 ? '/checkout' : "#"}>Proceed To Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Cart