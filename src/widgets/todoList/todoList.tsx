import { FormAddTask } from "components/formAddTask/formAddTask";
import { ListTasks } from 'components/listTasks/listTasks';
import styles from './todoList.module.css';

export function TodoList() {
  return (
    
    <section className={styles.todo_list}>
      <FormAddTask />
      <ListTasks />
    </section>
  )
}
