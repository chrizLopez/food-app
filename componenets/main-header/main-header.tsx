import Image from "next/image";
import Link from "next/link";

import styles from './styles.module.css';
import logo from '@/assets/logo.png';
import MainHeaderBackground from "./main-header-background";
import Navlink from "./nav-link";

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
              <Navlink href="/meals">Browse Meals</Navlink>
            </li>
            <li>
              <Navlink href="/community">Foodies Community</Navlink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}