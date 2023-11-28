import styles from './header.module.css';

export function Header() {
  return (
    <header>
      <h2 className={styles.title}>My Tasks</h2>
    </header>
  );
}
