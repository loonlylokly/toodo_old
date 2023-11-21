import { useRef, useState } from "react";
import { Button } from "shared/button/button";
import { Input } from "shared/input/input";
import styles from './formAddTask.module.css';
// import { useAppContext } from "shared/providers/ServiceProvider";

type Props = {
  addTask: (textTask: string)=>void,
}

export function FormAddTask({addTask}: Props) {
  const inputTaskRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisable] = useState<boolean>(true);
  // const {addTask} = useAppContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTask(inputTaskRef.current.value);
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
