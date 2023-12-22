import dayjs from 'dayjs';
import { useRef, useState } from 'react';
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
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DialogAddTask({ isOpen, setIsOpen }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { executor } = storeService.getInstance();
  const [task, setTask] = useState<TFormTask>(() => ({
    text: '',
    datetime: '',
  }));

  const validator = Validation(validationAddTask);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [disabled, setDisabled] = useState<boolean>(true);
  const handleTask = (
    cb: (prev: TFormTask) => {
      datetime: string;
      text: string;
    },
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTask((prev) => cb(prev));
    setDisabled(() => !e.target.value.length && !task.datetime.length);
  };
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
      formRef.current.reset();
    }
  };

  return (
    <Dialog id="addTaskDialog" isOpen={isOpen}>
      <Form className={styles.form} onSubmit={handleSubmit} formRef={formRef}>
        <FieldsFormTask
          validator={validator}
          task={task}
          setTask={handleTask}
          errors={errors}
          setErrors={setErrors}
        />
        <div className={styles.btnWrapper}>
          <Button
            type="button"
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
