import { useId, useRef, useState } from "react";
import { Button } from "Src/shared/Button/Button";
import { Input } from "Shared/Input/Input";
import { Task } from "Src/types/Task";
import styles from './FormAddTask.module.css'

export function FormAddTask({addTask}: {addTask: React.Dispatch<React.SetStateAction<Task[]>>}) {
  const inputTaskRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisable] = useState<boolean>(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let textTask = inputTaskRef.current.value.toString();
    let dateTask = new Date(Date.now());
    const optionsDate: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    addTask((prev) => [
      ...prev,
      {
        id: (Date.now()).toString(),
        text: textTask,
        date: dateTask.toLocaleDateString('ru-RU', optionsDate).split(', ').join('_'),
      }
    ]);
    inputTaskRef.current.value='';
  }

  const handleInput = () => {
    const flag = inputTaskRef.current !== null && inputTaskRef.current.value.length === 0;
    if (flag !== disabled) {
      setDisable(flag);
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            inputRef={inputTaskRef}
            onChange={handleInput}
          />
          <Button
            type="submit"
            height="40px"
            disabled={disabled}
          >
            Add
          </Button>
      </form>
    </div>
  )
}
