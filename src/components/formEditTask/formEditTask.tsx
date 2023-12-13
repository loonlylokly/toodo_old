import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Button } from 'shared/ui/button/button';
import { Dialog } from 'shared/ui/dialog/dialog';
import { Form } from 'shared/ui/form/form';
import { Input } from 'shared/ui/input/input';
import { storeService } from 'utils/storeService';
import { Validation } from 'shared/formValid/validation';
import { EStatusEditTask } from 'types/task';
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
  const [text, setText] = useState<string>(() => textTask);
  const [date, setDate] = useState<string>(() => cachedDate);
  const [time, setTime] = useState<string>(() => cachedTime);

  const { status, errors } = Validation(validation).validate({
    text,
    date,
    time,
  });

  const onSubmit = (e: React.FormEvent) => {
    if (status === EStatusEditTask.error) {
      e.preventDefault();
    } else if (status === EStatusEditTask.success) {
      let currDate = `${date} ${time}`;
      if (!date) {
        currDate = `${date.slice(0, 10)} ${time}`;
      }
      const taskDate = dayjs(currDate).format();
      executor.editTask(idTask, text, taskDate);
      executor.isOpen(false);
    }
  };

  return (
    <Dialog id="editTaskDialog" isOpen={isOpen}>
      <Form
        method="dialog"
        className={styles.form}
        onSubmit={(e) => onSubmit(e)}
      >
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(() => e.target.value)}
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
          value={date}
          onChange={(e) => setDate(() => e.target.value)}
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
          value={time}
          onChange={(e) => setTime(() => e.target.value)}
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
