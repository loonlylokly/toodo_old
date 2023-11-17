import { Button } from 'Shared/Button/Button';
import { Task } from 'Src/types/Task';
import styles from './ItemTask.module.css';

export function ItemTask({task, removeTask}: {task: Task, removeTask: (id: string)=>void}) {
  return (
    <li className={styles.task}>
      <span className={styles.text}>{task.id}</span>
      <p className={styles.text}>{task.text}</p>
      <span className={styles.text}>{task.date}</span>
      <Button styleClass={styles.button} onClick={()=>removeTask(task.id)}>X</Button>
    </li>
  )
}
