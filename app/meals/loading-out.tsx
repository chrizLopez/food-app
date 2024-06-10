import styles from './loading.module.css';

export default function MealsLoadingPage() {
  return (
    <section className={styles.loading}>
      <p>Fetching meals...</p>
    </section>
  );
}