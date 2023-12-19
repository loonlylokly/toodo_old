import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { FormEditTask } from 'components/formEditTask/formEditTask';
import { Button } from 'shared/ui/button/button';
import { storeService } from 'utils/storeService';
import { EventList } from 'utils/storeTypes';
import { TTask } from 'types/task';
// eslint-disable-next-line import/extensions
import EditIcon from 'public/edit_square_icon.svg';
import styles from './task.module.css';

export function Task() {
  const { id } = useParams();
  const { getStore, executor } = storeService.getInstance();
  const [task, setTask] = useState<TTask>(() => executor.getTask(id));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cachedDatetime = useMemo(() => dayjs(task.date), [task.date]);

  useEffect(() => {
    function updateTask() {
      setTask(() => executor.getTask(id));
    }
    window.addEventListener(EventList.updateTasks, updateTask);
    return () => {
      window.removeEventListener(EventList.updateTasks, updateTask);
    };
  }, [id, executor, getStore]);

  if (!task) {
    return <h1>There is no such task</h1>;
  }

  return (
    <>
      <section className={styles.task}>
        <div className={styles.wrapper}>
          <h1 className={styles.text}>{task.text}</h1>
          <p>{task.id}</p>
          <p>{cachedDatetime.format('DD-MM-YYYY, HH:mm:ss')}</p>
        </div>
        <Button styleClass={styles.btn_edit} onClick={() => setIsOpen(true)}>
          <EditIcon width={32} height={32} />
        </Button>
      </section>
      {isOpen && (
        <FormEditTask
          taskCurrent={task}
          cachedDatetime={cachedDatetime}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}
