import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.wrapper}>
                <h6>Copyright &copy; {new Date().getFullYear()} Hekto Inc. All righs reserved.</h6>
            </div>
        </footer>
    )
}

export default Footer