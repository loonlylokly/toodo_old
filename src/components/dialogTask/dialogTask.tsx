/* eslint-disable react/require-default-props */
import { useRef, useState } from 'react';
import { Button } from 'shared/ui/button/button';
import { Dialog } from 'shared/ui/dialog/dialog';
import { Form } from 'shared/ui/form/form';
import { Validation } from 'shared/formValid/validation';
import { FieldsFormTask } from 'components/fieldsFormTask/fieldsFormTask';
import { EStatusEditTask, TFormTask, TTask } from 'types/task';
import dayjs from 'dayjs';
import { validationTask } from './validationTask';
import styles from './dialogTask.module.css';

type Props = {
  isOpen: boolean;
  taskCurrent?: TTask;
  btnCancelText?: string;
  actionCancel?: () => void;
  btnConfirmText?: string;
  actionConfirm?: (text: string, datetime: string) => void;
  reset?: boolean;
};

export default function DialogTask({
  taskCurrent = {
    id: '',
    text: '',
    date: '',
  },
  btnCancelText = 'Cancel',
  actionCancel = () => {},
  btnConfirmText = 'Save',
  actionConfirm = () => {},
  isOpen,
  reset = true,
}: Props) {
  const [task, setTask] = useState<TFormTask>(() => ({
    text: taskCurrent.text,
    datetime: taskCurrent.date,
  }));
  const formRef = useRef<HTMLFormElement>(null);
  const validator = Validation(validationTask);
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
      const taskDate = dayjs(task.datetime).format('YYYY-MM-DDTHH:mm');
      actionConfirm(task.text, taskDate);
      actionCancel();
      setTask(() => ({ text: '', datetime: '' }));
      if (reset) {
        formRef.current.reset();
      }
    }
  };

  return (
    <Dialog id="editTaskDialog" isOpen={isOpen}>
      <Form className={styles.form} onSubmit={handleSubmit} formRef={formRef}>
        <FieldsFormTask
          validator={validator}
          cachedDatetime={dayjs(task.datetime).format('YYYY-MM-DDTHH:mm')}
          task={task}
          setTask={handleTask}
          errors={errors}
          setErrors={setErrors}
        />
        <div className={styles.btnWrapper}>
          <Button styleClass={styles.btnCancel} onClick={actionCancel}>
            {btnCancelText}
          </Button>
          <Button styleClass={styles.btnAdd} disabled={disabled}>
            {btnConfirmText}
          </Button>
        </div>
      </Form>
    </Dialog>
  );
}
