import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { FormTask } from 'components/formTask/formTask';
import { Validation } from 'shared/formValid/validation';
import { Dialog } from 'shared/ui/dialog/dialog';
import { storeService } from 'utils/storeService';
import { EStatusEditTask, TFormTask, TTask } from 'types/task';
import { validationEditTask } from './formEditValidation';

type Props = {
  taskCurrent: TTask;
  cachedDatetime: Dayjs;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function FormEditTask({
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
  const { status, errors } = Validation(validationEditTask).validate({
    text: task.text,
    datetime: task.datetime,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === EStatusEditTask.success) {
      const taskDate = dayjs(task.datetime).format();
      executor.editTask(taskCurrent.id, task.text, taskDate);
      setIsOpen(false);
    }
  };

  return (
    <Dialog id="editTaskDialog" isOpen={isOpen}>
      <FormTask
        cachedDatetime={cachedDatetime.format('YYYY-DD-MMTHH:mm')}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        errors={errors}
        setTask={setTask}
        task={task}
      />
    </Dialog>
  );
}
