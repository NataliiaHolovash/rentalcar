'use client';

import Link from "next/link";
import styles from './Header.module.css';
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.navWrapper}>
        
         <Link href="/" className={styles.logo}>
        <Image
          src="/images/Logo.svg"
          alt="RanalCar Logo"
          width={104}
          height={16}
        />
      </Link>
       
        <nav className={styles.nav}>
          <Link href="/" className={styles.navButton}>Home</Link>
          <Link href="/catalog" className={styles.navButton}>Catalog</Link>
        </nav>
      </div>
    </header>
  );
}
