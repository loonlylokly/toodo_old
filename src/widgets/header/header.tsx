import styles from './header.module.css';

export function Header() {
  return (
    <header>
      <h1 className={styles.title}>My Tasks</h1>
    </header>
  )
}
