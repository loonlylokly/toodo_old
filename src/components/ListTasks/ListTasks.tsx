import { ItemTask } from 'Components/ItemTask/ItemTask';
import { Task } from 'Src/types/Task';
import styles from './ListTasks.module.css';

export function ListTasks({tasks, setTasks}: {tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>}) {
  const removeTask = (id: string) => {
    setTasks(() => 
      tasks.filter(task =>
        task.id !== id
      )
    )
  }

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
