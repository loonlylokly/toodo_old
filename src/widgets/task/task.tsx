import { useParams } from "react-router-dom"
import { taskService } from "utils/taskService";
import styles from "./task.module.css";

export function Task() {
  const { id } = useParams();
  const { getTask } = taskService.getInstance();
  const task = getTask(id);
  return (
    <section className={styles.task}>
      <div className={styles.wrapper}>
        <h1 className={styles.text}>{task.text}</h1>
        <p>{task.id}</p>
        <p>{task.date}</p>
      </div>
    </section>
  )
}
