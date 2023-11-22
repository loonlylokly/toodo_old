import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui/button/button';
import { Task } from 'types/task';
import styles from './itemTask.module.css';
import { flushSync } from 'react-dom';

type Props = {
  task: Task,
  removeTask: (id: string)=>void,
}

export function ItemTask({task, removeTask}: Props) {
  // const navigate = useNavigate();
  // const navigateToTask = (id: string) => {
  //   if(!document.startViewTransition) {
  //     navigate(`/tasks/${task.id}`);
  //   } else {
  //     document.startViewTransition(() => {
  //       flushSync(() => {
  //         navigate(`/tasks/${task.id}`);
  //       });
  //     });
  //   }
  // }

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
