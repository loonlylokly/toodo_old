import { ItemTask } from 'components/itemTask/itemTask';
import { Task } from 'types/task';
import styles from './listTasks.module.css';
// import { useAppContext } from 'shared/providers/ServiceProvider';

type Props = {
  tasks: Task[],
  removeTask: (id: string) => void,
};

export function ListTasks({tasks, removeTask}: Props) {
  // const {tasks} = useAppContext();
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list_task}>
        {
          tasks.length > 0 ?
            tasks.map((task: Task) => <ItemTask key={task.id} task={task} removeTask={removeTask}/>):
            <h2>Empty</h2>
        }
      </ul>
    </div>
  )
}
