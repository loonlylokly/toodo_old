import { useEffect, useRef, useState } from "react";
import { Button } from "shared/ui/button/button";
import { Dialog } from "shared/ui/dialog/dialog";
import { Form } from "shared/ui/form/form";
import { Input } from "shared/ui/input/input";
import { storeService } from "utils/storeService";
import { EventList } from "utils/storeTypes";
import styles from './formEditTask.module.css';

export function FormEditTask({idTask}: {idTask: string}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const nameTaskRef = useRef<HTMLInputElement>(null);
  const dateTaskRef = useRef<HTMLInputElement>(null);
  const { getStore, executor } = storeService.getInstance();

  useEffect(() => {
    function updateIsOpen() {
      setIsOpen(() => getStore.isOpen);
    }
    updateIsOpen()
    window.addEventListener(EventList.updateDialogEditTask, updateIsOpen);
    return () => window.removeEventListener(EventList.updateDialogEditTask, updateIsOpen);
  },[getStore])

  const handleSaveTask = (event: React.FormEvent) => {
    executor.editTask(idTask, nameTaskRef.current.value, dateTaskRef.current.value);
  }
  
  return (
    <Dialog id="editTaskDialog" isOpen={isOpen}>
      <Form method="dialog" className={styles.form} onSubmit={handleSaveTask}>
        <Input type="text" inputRef={nameTaskRef}/>
        <Input type="date" inputRef={dateTaskRef}/>
        <Button styleType="primary" onClick={() => executor.isOpen(false)}>
          Save
        </Button>
        <Button styleType="secondary" onClick={() => executor.isOpen(false)}>
          Cansel
        </Button>
      </Form>
    </Dialog>
  )
}
