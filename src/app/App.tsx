import cat from 'Public/cat.jpg'
import styles from './App.module.css';

export function App() {
  return (
    <>
      <h1 className={styles.title}>Hello World</h1>
      <img src={cat} alt="cat"/>
    </>
  )
}
