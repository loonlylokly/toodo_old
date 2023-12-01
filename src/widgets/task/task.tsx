import { useParams } from "react-router-dom"
import { taskService } from "utils/taskService";
import { Button } from "shared/ui/button/button";
import EditIcon from "public/edit_square_icon.svg";
import styles from "./task.module.css";
import { Dialog } from "shared/ui/dialog/dialog";
import { useState } from "react";

export function Task() {
  const { id } = useParams();
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const { getTask } = taskService.getInstance();
  const task = getTask(id);
  return (
    <>
      <section className={styles.task}>
        <div className={styles.wrapper}>
          <h1 className={styles.text}>{task.text}</h1>
          <p>{task.id}</p>
          <p>{task.date}</p>
        </div>
        <Button styleClass={styles.btn_edit} onClick={() => setIsOpen((prev) => !prev)}>
          <EditIcon width={32} height={32}/>
        </Button>
      </section>
      <Dialog
        id="editTaskDialog"
        isOpen={isOpen}
      >
        <Button styleClass={styles.btn_cancel} onClick={() => setIsOpen((prev) => !prev)}>
          Cancel
        </Button>
      </Dialog>
    </>
  )
}
