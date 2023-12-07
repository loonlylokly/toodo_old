import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormEditTask } from 'components/formEditTask/formEditTask';
import { Button } from 'shared/ui/button/button';
import { OptionsDate } from 'shared/config/dateConfig';
import { storeService } from 'utils/storeService';
import { EventList } from 'utils/storeTypes';
import { Task } from 'types/task';
// eslint-disable-next-line import/extensions
import EditIcon from 'public/edit_square_icon.svg';
import styles from './task.module.css';

export function Task() {
  const { id } = useParams();
  const { executor } = storeService.getInstance();
  const [task, setTask] = useState<Task>(() => executor.getTask(id));
  const cachedDate = useMemo(
    () => new Date(task.date).toLocaleDateString('ru-RU', OptionsDate),
    [task.date]
  );

  useEffect(() => {
    function updateTask() {
      setTask(() => executor.getTask(id));
    }
    window.addEventListener(EventList.updateTasks, updateTask);
    return () => window.removeEventListener(EventList.updateTasks, updateTask);
  }, [id, executor]);

  if (!task) {
    return <h1>There is no such task</h1>;
  }

  return (
    <>
      <section className={styles.task}>
        <div className={styles.wrapper}>
          <h1 className={styles.text}>{task.text}</h1>
          <p>{task.id}</p>
          <p>{cachedDate}</p>
        </div>
        <Button
          styleClass={styles.btn_edit}
          onClick={() => executor.isOpen(true)}
        >
          <EditIcon width={32} height={32} />
        </Button>
      </section>
      <FormEditTask idTask={id} />
    </>
  );
}
