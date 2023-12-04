import { useRef, useState } from 'react';
import { Button } from 'shared/ui/button/button';
import { Input } from 'shared/ui/input/input';
import { Form } from 'shared/ui/form/form';
import styles from './formAddTask.module.css';

type Props = {
  addTask: (textTask: string) => void;
};

export function FormAddTask({ addTask }: Props) {
  const inputTaskRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisable] = useState<boolean>(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTask(inputTaskRef.current.value);
    inputTaskRef.current.value = '';
    setDisable(!inputTaskRef.current.value);
  };

  const handleInput = () => {
    setDisable(!inputTaskRef.current.value);
  };

  return (
    <div className={styles.wrapper}>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Input inputRef={inputTaskRef} onChange={handleInput} required />
        <Button type="submit" disabled={disabled}>
          Add
        </Button>
      </Form>
    </div>
  );
}
