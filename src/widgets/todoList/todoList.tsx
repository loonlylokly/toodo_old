import { useEffect, useState } from "react";
import { FormAddTask } from "components/formAddTask/formAddTask";
import { ListTasks } from 'components/listTasks/listTasks';
import { EventList, taskService } from "utils/taskService";
import { Task } from "types/task";
import styles from './todoList.module.css';

export function TodoList() {
  const { getStore, addTask, removeTask } = taskService.getInstance();
  const [tasks, setTasks] = useState<Task[]>([]);

  function updateTasks() {
    setTasks(() => [...getStore().tasks]);
  }

  useEffect(() => {
    window.addEventListener(EventList.updateTasks, updateTasks);
    return () => window.removeEventListener(EventList.updateTasks, updateTasks);
  },[])

  return (
    <section className={styles.todo_list}>
      <FormAddTask addTask={addTask}/>
      <ListTasks tasks={tasks} removeTask={removeTask} />
    </section>
  )
}
