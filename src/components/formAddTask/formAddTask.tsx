import { useState } from 'react';
import dayjs from 'dayjs';
import { FormTask } from 'components/formTask/formTask';
import { Validation } from 'shared/formValid/validation';
import { Dialog } from 'shared/ui/dialog/dialog';
import { Button } from 'shared/ui/button/button';
import { storeService } from 'utils/storeService';
import { EStatusEditTask, TFormTask } from 'types/task';
import { validationAddTask } from './formAddValidation';
import styles from './formAddTask.module.css';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function FormAddTask({ isOpen, setIsOpen }: Props) {
  const { executor } = storeService.getInstance();
  const [task, setTask] = useState<TFormTask>(() => ({
    text: '',
    datetime: '',
  }));
  const { status, errors } = Validation(validationAddTask).validate({
    text: task.text,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <FormTask
          setIsOpen={setIsOpen}
          handleSubmit={handleSubmit}
          errors={errors}
          setTask={setTask}
          task={task}
        />
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
