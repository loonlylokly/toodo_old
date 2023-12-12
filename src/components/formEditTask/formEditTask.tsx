import { useMemo, useRef } from 'react';
import dayjs from 'dayjs';
import { Button } from 'shared/ui/button/button';
import { Dialog } from 'shared/ui/dialog/dialog';
import { Form } from 'shared/ui/form/form';
import { Input } from 'shared/ui/input/input';
import { useForm } from 'shared/formValid/useForm';
import { storeService } from 'utils/storeService';
import { statusEditTask } from 'types/task';
import { validation } from './formEditValidation';
import styles from './formEditTask.module.css';

type Props = {
  idTask: string;
  isOpen: boolean;
};

export function FormEditTask({ idTask, isOpen }: Props) {
  const textTaskRef = useRef<HTMLInputElement>(null);
  const dateTaskRef = useRef<HTMLInputElement>(null);
  const timeTaskRef = useRef<HTMLInputElement>(null);
  const { executor } = storeService.getInstance();
  const { text, date } = executor.getTask(idTask);
  const cachedTime = useMemo(() => dayjs(date).format('HH:mm:ss'), [date]);
  const refs = {
    text: textTaskRef,
    date: dateTaskRef,
    time: timeTaskRef,
  };
  const { handleSubmit, errors } = useForm({ refs, validation });
  const onSubmit = (
    data: Record<string, string>,
    formStatus: statusEditTask,
    event: React.FormEvent
  ) => {
    if (formStatus === 'error') {
      event.preventDefault();
    } else if (formStatus === 'success') {
      const { text: newText, date: newDate, time } = data;
      let currDate = `${newDate} ${time}`;
      if (!newDate) {
        currDate = `${date.slice(0, 10)} ${time}`;
      }
      const taskDate = dayjs(currDate).format();
      executor.editTask(idTask, newText, taskDate);
      executor.isOpen(false);
    }
  };

  return (
    <Dialog id="editTaskDialog" isOpen={isOpen}>
      <Form
        method="dialog"
        className={styles.form}
        onSubmit={(event) => handleSubmit(event)(onSubmit)}
      >
        <Input type="text" defaultValue={text} inputRef={textTaskRef} />
        <p style={{ color: 'red' }}>{errors.toString()}</p>

        <Input type="date" defaultValue={date} inputRef={dateTaskRef} />
        <Input type="time" defaultValue={cachedTime} inputRef={timeTaskRef} />
        <Button styleType="primary" type="submit">
          Save
        </Button>
        <Button
          type="button"
          styleType="secondary"
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
