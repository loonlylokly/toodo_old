import { useState } from 'react';
import { FormAddTask } from "components/FormAddTask/FormAddTask";
import { ListTasks } from 'components/ListTasks/ListTasks';
import { Task } from 'types/Task';
import styles from './TodoList.module.css';

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const removeTask = (id: string) => {
    setTasks(() => 
      tasks.filter(task =>
        task.id !== id
      )
    )
  }

  const addTask = (task: Task) => {
    setTasks((prev) => [
        ...prev,
        {
          id: task.id,
          text: task.text,
          date: task.date,
        }
      ]
    )
  }

  return (
    <section className={styles.todo_list}>
      <FormAddTask addTask={addTask}/>
      <ListTasks tasks={tasks} removeTask={removeTask}/>
    </section>
  )
}
