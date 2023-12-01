import { useParams } from "react-router-dom"
import { storeService } from "utils/storeService";
import { Button } from "shared/ui/button/button";
import EditIcon from "public/edit_square_icon.svg";
import styles from "./task.module.css";
import { FormEditTask } from "components/formEditTask/formEditTask";
import { useEffect, useState } from "react";
import { Task } from "types/task";
import { EventList } from "utils/storeTypes";

export function Task() {
  const { id } = useParams();
  const { executor } = storeService.getInstance();
  const [task, setTask] = useState<Task>(executor.getTask(id));

  useEffect(() => {
    function updateTask() {
      setTask(() => executor.getTask(id));
    }
    window.addEventListener(EventList.updateTasks, updateTask);
    return () => window.removeEventListener(EventList.updateTasks, updateTask);
  },[])

  return (
    <>
      <section className={styles.task}>
        <div className={styles.wrapper}>
          <h1 className={styles.text}>{task.text}</h1>
          <p>{task.id}</p>
          <p>{task.date}</p>
        </div>
        <Button styleClass={styles.btn_edit} onClick={() => executor.isOpen(true)}>
          <EditIcon width={32} height={32}/>
        </Button>
      </section>
      <FormEditTask idTask={id}/>
    </>
  )
}
