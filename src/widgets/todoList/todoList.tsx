import { useEffect, useState } from 'react';
import { FormSearchTask } from 'components/formSearchTask/formSearchTask';
import { ListTasks } from 'components/listTasks/listTasks';
import { storeService } from 'utils/storeService';
import { EventList } from 'utils/storeTypes';
import { TTask } from 'types/task';
import FormAddTask from 'components/formAddTask/formAddTask';
import styles from './todoList.module.css';

export function TodoList() {
  const { getStore, executor } = storeService.getInstance();
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [search, setSearch] = useState<string>('');
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
      <FormAddTask
        isOpen={isOpenAddTask}
        setIsOpen={(isOpen) => setIsOpenAddTask(() => isOpen)}
      />
    </section>
  );
}
