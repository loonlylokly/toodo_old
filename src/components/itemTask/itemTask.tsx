import { Button } from 'shared/button/button';
import { Task } from 'types/task';
import styles from './itemTask.module.css';
// import { useAppContext } from 'shared/providers/ServiceProvider';

type Props = {
  task: Task,
  removeTask: (id: string)=>void,
}

export function ItemTask({task, removeTask}: Props) {
  // const { removeTask } = useAppContext();

  return (
    <li className={styles.task}>
      <span className={styles.text}>{task.id}</span>
      <p className={styles.text}>{task.text}</p>
      <span className={styles.text}>{task.date}</span>
      <Button styleClass={styles.button} onClick={()=>removeTask(task.id)}>X</Button>
    </li>
  )
}
