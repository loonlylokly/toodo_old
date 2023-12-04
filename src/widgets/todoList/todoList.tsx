import { useEffect, useState } from 'react';
import { FormAddTask } from 'components/formAddTask/formAddTask';
import { ListTasks } from 'components/listTasks/listTasks';
import { storeService } from 'utils/storeService';
import { EventList } from 'utils/storeTypes';
import { Task } from 'types/task';
import styles from './todoList.module.css';

export function TodoList() {
  const { getStore, executor } = storeService.getInstance();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    function updateTasks() {
      setTasks(() => [...getStore.tasks]);
    }
    updateTasks();
    window.addEventListener(EventList.updateTasks, updateTasks);
    return () => window.removeEventListener(EventList.updateTasks, updateTasks);
  }, [getStore]);

  return (
    <section className={styles.todo_list}>
      <FormAddTask addTask={executor.addTask} />
      <ListTasks tasks={tasks} removeTask={executor.removeTask} />
    </section>
  );
}
