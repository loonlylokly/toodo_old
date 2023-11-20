import { ItemTask } from 'components/itemTask/itemTask';
import styles from './listTasks.module.css';
import { useAppContext } from 'shared/providers/ServiceProvider';

let test = 1;

export function ListTasks() {
  const {tasks} = useAppContext();

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list_task}>
        {
          tasks.length > 0 ?
            tasks.map((task: { id: any; text?: string; date?: string; }) => <ItemTask key={task.id} task={task} />):
            <h2>Empty</h2>
        }
      </ul>
    </div>
  )
}
