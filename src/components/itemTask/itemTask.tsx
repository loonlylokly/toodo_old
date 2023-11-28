import { Link } from 'react-router-dom';
import { Button } from 'shared/ui/button/button';
import { Task } from 'types/task';
import styles from './itemTask.module.css';

type Props = {
  task: Task,
  removeTask: (id: string)=>void,
}

export function ItemTask({task, removeTask}: Props) {
  return (
    <li className={styles.task}>
      <Link className={styles.link} to={`/tasks/${task.id}`} unstable_viewTransition>
        <span className={styles.text}>{task.id}</span>
        <p className={styles.text}>{task.text}</p>
        <span className={styles.text}>{task.date}</span>
      </Link>
      <Button styleClass={styles.button} onClick={()=>removeTask(task.id)} title="Remove Task">X</Button>
    </li>
  )
}
