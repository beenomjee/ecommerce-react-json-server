import styles from './ErrorPage.module.css'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <main className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <h6>404 Not Found</h6>
                    <span>Pages . <span>404 Not Found</span></span>
                </div>
            </div>


            {/*Error Pages  */}
            <div className={styles.wrapper}>
                <div className={styles.center}>
                    <img src="/404.svg" alt="404" />
                    <h6>oops! The page you requested was not found!</h6>
                    <Link to={'/'}>Back To Home</Link>
                </div>
            </div>
        </main>
    )
}

export default ErrorPage