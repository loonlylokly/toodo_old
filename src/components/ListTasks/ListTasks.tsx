import { ItemTask } from 'components/ItemTask/ItemTask';
import { Task } from 'src/types/Task';
import styles from './ListTasks.module.css';

type Props = {
  tasks: Task[],
  removeTask: (id: string) => void,
}

export function ListTasks({tasks, removeTask}: Props) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list_task}>
        {
          tasks.length > 0 ?
            tasks.map((task) => <ItemTask key={task.id} task={task} removeTask={removeTask}/>):
            <h2>Empty</h2>
        }
      </ul>
    </div>
  )
}
