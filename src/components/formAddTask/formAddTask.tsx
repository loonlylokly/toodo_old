import { useState } from 'react';
import { storeService } from 'utils/storeService';
import { Form } from 'shared/ui/form/form';
import { Button } from 'shared/ui/button/button';
import { Validation } from 'shared/formValid/validation';
import { EStatusEditTask } from 'types/task';
import styles from './formAddTask.module.css';
import { validationAddTask } from './formAddValidation';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function FormAddTask({ isOpen, setIsOpen }: Props) {
  const [text, setText] = useState<string>('');
  const [disabled, setDisable] = useState<boolean>(() => !text.length);
  const { executor } = storeService.getInstance();
  const { status, errors } = Validation(validationAddTask).validate({
    text,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === EStatusEditTask.success) {
      executor.addTask(text);
      setText(() => '');
      setDisable(() => true);
      setIsOpen(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(() => e.target.value);
    setDisable(() => !e.target.value.length);
  };

  if (isOpen) {
    return (
      <div className={styles.wrapper}>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <textarea onChange={handleChange} />
          {errors.text ? (
            <ul className={styles.error__list}>
              {errors.text.map((error, index) => (
                <li className={styles.error} key={index}>
                  {error}
                </li>
              ))}
            </ul>
          ) : null}
          <div className={styles.btnWrapper}>
            <Button
              className={styles.btnCancel}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button className={styles.btnAdd} disabled={disabled}>
              Add
            </Button>
          </div>
        </Form>
      </div>
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
