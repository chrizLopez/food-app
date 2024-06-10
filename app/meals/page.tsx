import Link from 'next/link';
import styles from './page.module.css';
import MealsGrid from '@/componenets/meals/meals-grid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';
import MealsLoadingPage from './loading-out';

async function Meals() {
  const meals = await getMeals();
  return  <MealsGrid meals={meals} />;
}

export default async function MealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>Delicious meals created <span>by you</span></h1>
        <p>Choose your recipe and cook it yourself, Its easy and fun</p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        <Suspense fallback={<MealsLoadingPage />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
