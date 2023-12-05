import styles from './header.module.css';

export function Header({ title }: { title: string }) {
  return (
    <header>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
