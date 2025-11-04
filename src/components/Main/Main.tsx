import Link from "next/link";
import styles from './Main.module.css';

export default function Main() {
  return (
    <main className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.subtitle}>Reliable and budget-friendly rentals for any journey</p>
        <Link href="/catalog" className={styles.button}>
          View Catalog
        </Link>
      </div>
    </main>
  );
}