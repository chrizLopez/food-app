import Image from "next/image";
import Link from "next/link";

import styles from './styles.module.css';
import logo from '@/assets/logo.png';
import MainHeaderBackground from "./main-header-background";

export  default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image src={logo} alt="A plate with the food of Gods" width={150} height={150} priority />
          Next Level Food
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/meals">Meals</Link>
            </li>
            <li>
              <Link href="/community">Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}