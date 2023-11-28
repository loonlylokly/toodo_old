/* eslint-disable func-names */
import { OptionsDate } from 'shared/config/dateConfig';
import { Task } from 'types/task';

export enum EventList {
  updateTasks = 'updateTasks',
}

export const taskService = (function () {
  function createService() {
    const store: Record<string, Task[]> = {
      tasks: [],
    };

    const getStore = store;

    const getTask = (id: string) => {
      return store.tasks.find((item) => item.id === id);
    };

    const addTask = (textTask: string) => {
      const dateTask = new Date(Date.now());
      store.tasks.push({
        id: Date.now().toString(),
        text: textTask,
        date: dateTask.toLocaleDateString('ru-RU', OptionsDate),
      });
      window.dispatchEvent(new CustomEvent(EventList.updateTasks));
    };

    const removeTask = (id: string) => {
      store.tasks = [...store.tasks.filter((task) => task.id !== id)];
      window.dispatchEvent(new CustomEvent(EventList.updateTasks));
    };

    return { getStore, addTask, removeTask, getTask };
  }

  let instance: ReturnType<typeof createService>;

  return {
    getInstance() {
      if (!instance) {
        instance = createService();
      }
      return instance;
    },
  };
})();
