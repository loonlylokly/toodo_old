import dayjs from 'dayjs';
import { useState } from 'react';
import { FieldsFormTask } from 'components/fieldsFormTask/fieldsFormTask';
import { Validation } from 'shared/formValid/validation';
import { Dialog } from 'shared/ui/dialog/dialog';
import { Button } from 'shared/ui/button/button';
import { storeService } from 'utils/storeService';
import { EStatusEditTask, TFormTask } from 'types/task';
import { Form } from 'shared/ui/form/form';
import { validationAddTask } from './formAddValidation';
import styles from './dialogAddTask.module.css';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function DialogAddTask({ isOpen, setIsOpen }: Props) {
  const { executor } = storeService.getInstance();
  const [task, setTask] = useState<TFormTask>(() => ({
    text: '',
    datetime: '',
  }));

  const validator = Validation(validationAddTask);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { status, errors: errorsValid } = validator.validate({
      text: task.text,
      datetime: task.datetime,
    });
    setErrors(() => errorsValid);
    if (status === EStatusEditTask.success) {
      const taskDate = dayjs(task.datetime).format();
      executor.addTask(task.text, taskDate);
      setIsOpen(false);
      setTask(() => ({ text: '', datetime: '' }));
    }
  };

  if (isOpen) {
    return (
      <Dialog id="addTaskDialog" isOpen={isOpen}>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <FieldsFormTask
            validator={validator}
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
              Add
            </Button>
          </div>
        </Form>
      </Dialog>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Button className={styles.btnAddTask} onClick={() => setIsOpen(true)}>
        Add Task
      </Button>
    </div>
  );
}
