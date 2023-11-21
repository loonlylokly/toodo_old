import { OptionsDate } from 'shared/config';
import { Task } from 'types/task';

export enum EventList {
  updateTasks = 'updateTasks',
};

export const taskService = (function() {
  let instance: ReturnType<typeof createService>;

  function createService() {  
    const store: Record<string, Task[]>= {
      tasks: [],
    };
    
    const getStore = () => store;
  
    const addTask = (textTask: string) => {
      const dateTask = new Date(Date.now());
      store.tasks.push(
        {
          id: (Date.now()).toString(),
          text: textTask,
          date: dateTask.toLocaleDateString('ru-RU', OptionsDate),
        }
      )
      window.dispatchEvent(new CustomEvent(EventList.updateTasks));
    };
  
    const removeTask = (id: string) => {
      store.tasks = [...store.tasks.filter(task => task.id !== id)];
      window.dispatchEvent(new CustomEvent(EventList.updateTasks));
    };
  
    return { getStore, addTask, removeTask };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createService();
      }
      return instance;
    },
  };
})();
