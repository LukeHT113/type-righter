import styles from "../assets/css/Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.text}>press <span className={styles.key}>tab</span> to quick restart</p>
        <small className={styles.small}>created by <a href="https://lukehtalling.com/">LHT</a>.</small>
      </div>
    </footer>
  )
}
