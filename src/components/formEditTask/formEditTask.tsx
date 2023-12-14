import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Button } from 'shared/ui/button/button';
import { Dialog } from 'shared/ui/dialog/dialog';
import { Form } from 'shared/ui/form/form';
import { Input } from 'shared/ui/input/input';
import { storeService } from 'utils/storeService';
import { Validation } from 'shared/formValid/validation';
import { EStatusEditTask } from 'types/task';
import { debounce } from 'shared/debounce/debounce';
import { validation } from './formEditValidation';
import styles from './formEditTask.module.css';

type Props = {
  idTask: string;
  isOpen: boolean;
};

export function FormEditTask({ idTask, isOpen }: Props) {
  const { executor } = storeService.getInstance();
  const { text: textTask, date: dateTask } = executor.getTask(idTask);

  const cachedDate = useMemo(
    () => dayjs(dateTask).format('YYYY-MM-DD'),
    [dateTask]
  );
  const cachedTime = useMemo(
    () => dayjs(dateTask).format('HH:mm:ss'),
    [dateTask]
  );
  const [task, setTask] = useState(() => ({
    text: textTask,
    date: cachedDate,
    time: cachedTime,
  }));

  const { status, errors } = Validation(validation).validate({
    text: task.text,
    date: task.date,
    time: task.time,
  });

  const onSubmit = (e: React.FormEvent) => {
    if (status === EStatusEditTask.error) {
      e.preventDefault();
    } else if (status === EStatusEditTask.success) {
      let currDate = `${task.date} ${task.time}`;
      if (!task.date) {
        currDate = `${task.date.slice(0, 10)} ${task.time}`;
      }
      const taskDate = dayjs(currDate).format();
      executor.editTask(idTask, task.text, taskDate);
      executor.isOpen(false);
    }
  };

  const updateDebounceText = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTask((prev) => ({ ...prev, text: e.target.value }));
    },
    600
  );

  return (
    <Dialog id="editTaskDialog" isOpen={isOpen}>
      <Form
        method="dialog"
        className={styles.form}
        onSubmit={(e) => onSubmit(e)}
      >
        <Input
          type="text"
          defaultValue={task.text}
          onChange={updateDebounceText}
        />
        {errors.text ? (
          <ul className={styles.error__list}>
            {errors.text.map((error, index) => (
              <li className={styles.error} key={index}>
                {error}
              </li>
            ))}
          </ul>
        ) : null}

        <Input
          type="date"
          value={task.date}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, date: e.target.value }))
          }
        />
        {errors.date ? (
          <ul className={styles.error__list}>
            {errors.date.map((error, index) => (
              <li className={styles.error} key={index}>
                {error}
              </li>
            ))}
          </ul>
        ) : null}

        <Input
          type="time"
          value={task.time}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, time: e.target.value }))
          }
        />
        {errors.time ? (
          <ul className={styles.error__list}>
            {errors.time.map((error, index) => (
              <li className={styles.error} key={index}>
                {error}
              </li>
            ))}
          </ul>
        ) : null}

        <Button styleType="primary" styleClass={styles.btnSubmit} type="submit">
          Save
        </Button>
        <Button
          type="button"
          styleType="secondary"
          styleClass={styles.btnCancel}
          onClick={() => {
            executor.isOpen(false);
          }}
        >
          Cancel
        </Button>
      </Form>
    </Dialog>
  );
}
