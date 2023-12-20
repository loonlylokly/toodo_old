import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { FieldsFormTask } from 'components/fieldsFormTask/fieldsFormTask';
import { Validation } from 'shared/formValid/validation';
import { Dialog } from 'shared/ui/dialog/dialog';
import { storeService } from 'utils/storeService';
import { EStatusEditTask, TFormTask, TTask } from 'types/task';
import { Form } from 'shared/ui/form/form';
import { Button } from 'shared/ui/button/button';
import { validationEditTask } from './formEditValidation';
import styles from './dialogEditTask.module.css';

type Props = {
  taskCurrent: TTask;
  cachedDatetime: Dayjs;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function DialogEditTask({
  taskCurrent,
  cachedDatetime,
  isOpen,
  setIsOpen,
}: Props) {
  const { executor } = storeService.getInstance();
  const [task, setTask] = useState<TFormTask>(() => ({
    text: taskCurrent.text,
    datetime: taskCurrent.date,
  }));
  const validator = Validation(validationEditTask);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { status } = validator.validate({
      text: task.text,
      datetime: task.datetime,
    });
    setErrors(() => errors);
    if (status === EStatusEditTask.success) {
      const taskDate = dayjs(task.datetime).format();
      executor.editTask(taskCurrent.id, task.text, taskDate);
      setIsOpen(false);
    }
  };

  return (
    <Dialog id="editTaskDialog" isOpen={isOpen}>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FieldsFormTask
          validator={validator}
          cachedDatetime={cachedDatetime.format('YYYY-DD-MMTHH:mm')}
          task={task}
          setTask={setTask}
          errors={errors}
          setErrors={setErrors}
          setDisabled={setDisabled}
        />
        <div className={styles.btnWrapper}>
          <Button
            styleClass={styles.btnCancel}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button styleClass={styles.btnAdd} disabled={disabled}>
            Save
          </Button>
        </div>
      </Form>
    </Dialog>
  );
}
