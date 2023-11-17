import { useState } from 'react';
import { FormAddTask } from "Components/FormAddTask/FormAddTask";
import { ListTasks } from 'Components/ListTasks/ListTasks';
import { Task } from 'Src/types/Task';
import styles from './TodoList.module.css';

export function TodoList() {
  const [tasks, setTask] = useState<Task[]>([]);

  return (
    <section className={styles.todo_list}>
      <FormAddTask addTask={setTask}/>
      <ListTasks tasks={tasks} setTasks={setTask}/>
    </section>
  )
}
