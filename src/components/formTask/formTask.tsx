import { Button } from 'shared/ui/button/button';
import { Form } from 'shared/ui/form/form';
import { Input } from 'shared/ui/input/input';
import { debounce } from 'shared/debounce/debounce';
import { useState } from 'react';
import { TFormTask } from 'types/task';
import styles from './formTask.module.css';

type Props = {
  handleSubmit: (e: React.FormEvent) => void;
  setIsOpen: (isOpen: boolean) => void;
  errors: Record<string, string[]>;
  setTask: React.Dispatch<React.SetStateAction<TFormTask>>;
  task: TFormTask;
  // eslint-disable-next-line react/require-default-props
  cachedDatetime?: string;
};

export function FormTask({
  handleSubmit,
  setIsOpen,
  errors,
  setTask,
  task,
  cachedDatetime = '',
}: Props) {
  const [disabled, setDisable] = useState<boolean>(() => !task.text.length);

  const handleChangeText = (newText: string) => {
    setTask((prev) => ({ ...prev, text: newText }));
    setDisable(() => !newText.length);
  };

  const handleChangeDatetime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prev) => ({ ...prev, datetime: e.target.value }));
    setDisable(() => !e.target.value.length);
  };

  const updateDebounceText = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChangeText(e.target.value);
    },
    600
  );

  return (
    <div className={styles.wrapper}>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Text Task"
          defaultValue={task.text}
          onChange={updateDebounceText}
          errors={errors.text}
        />
        <Input
          type="datetime-local"
          label="Datetime Task"
          defaultValue={cachedDatetime}
          onChange={handleChangeDatetime}
          errors={errors.datetime}
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
    </div>
  );
}
