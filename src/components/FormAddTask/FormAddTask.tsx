import { useRef, useState } from "react";
import { Button } from "shared/Button/Button";
import { Input } from "shared/Input/Input";
import { Task } from "types/Task";
import styles from './FormAddTask.module.css'

const OptionsDate: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

export function FormAddTask({addTask}: {addTask: (task: Task) => void}) {
  const inputTaskRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisable] = useState<boolean>(true);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const textTask = inputTaskRef.current.value.toString();
    const dateTask = new Date(Date.now());
    addTask({
      id: (Date.now()).toString(),
      text: textTask,
      date: dateTask.toLocaleDateString('ru-RU', OptionsDate),
    })
    inputTaskRef.current.value='';
  }

  const handleInput = () => {
    setDisable(!inputTaskRef.current.value);
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            inputRef={inputTaskRef}
            onChange={handleInput}
            required={true}
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
