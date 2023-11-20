import { useState } from 'react';
import { FormAddTask } from "components/formAddTask/formAddTask";
import { ListTasks } from 'components/listTasks/listTasks';
import { Task } from 'types/task';
import styles from './todoList.module.css';

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
