import { useEffect, useState } from 'react';
import { FormSearchTask } from 'components/formSearchTask/formSearchTask';
import { ListTasks } from 'components/listTasks/listTasks';
import { DialogAddTask } from 'components/dialogAddTask/dialogAddTask';
import { storeService } from 'utils/storeService';
import { EventList } from 'utils/storeTypes';
import { TTask } from 'types/task';
import { Button } from 'shared/ui/button/button';
import styles from './todoList.module.css';

export function TodoList() {
  const { getStore, executor } = storeService.getInstance();
  const [search, setSearch] = useState<string>('');
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [isOpenAddTask, setIsOpenAddTask] = useState<boolean>(false);

  useEffect(() => {
    function updateTasks() {
      setTasks(() =>
        [...getStore.tasks].filter((task) => task.text.includes(search))
      );
    }
    updateTasks();
    window.addEventListener(EventList.updateTasks, updateTasks);
    return () => window.removeEventListener(EventList.updateTasks, updateTasks);
  }, [getStore, search]);

  return (
    <section className={styles.todo_list}>
      <FormSearchTask setSearch={setSearch} />
      <ListTasks tasks={tasks} removeTask={executor.removeTask} />
      <DialogAddTask isOpen={isOpenAddTask} setIsOpen={setIsOpenAddTask} />
      <div className={styles.wrapper}>
        <Button
          className={styles.btnAddTask}
          onClick={() => setIsOpenAddTask(true)}
        >
          Add Task
        </Button>
      </div>
    </section>
  );
}
