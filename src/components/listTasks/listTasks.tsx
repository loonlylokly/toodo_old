import { ItemTask } from 'components/itemTask/itemTask';
import styles from './listTasks.module.css';
import { useEffect, useState } from 'react';
import { store } from 'shared/utils/taskService'
// import { useAppContext } from 'shared/providers/ServiceProvider';

export function ListTasks() {
  // const {tasks} = useAppContext();
  const { tasks } = store;
  const [_, forceUpdate] = useState(null);

  useEffect(() => {
    window.addEventListener('updateTasks', ()=> forceUpdate({}));
    return () => window.addEventListener('updateTasks', ()=> forceUpdate({}));
  },[])

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
