import { OptionsDate } from 'shared/config';
import { Task } from 'types/task';

export const store: Record<string, Task[]>= {
  tasks: [],
};

export const addTask = (textTask: string) => {
  const dateTask = new Date(Date.now());
  store.tasks = [
    ...store.tasks ,
    {
      id: (Date.now()).toString(),
      text: textTask,
      date: dateTask.toLocaleDateString('ru-RU', OptionsDate),
    }
  ];
  window.dispatchEvent(new CustomEvent("updateTasks"));
};

export const removeTask = (id: string) => {
  store.tasks = [...store.tasks.filter(task => task.id !== id)]
  window.dispatchEvent(new CustomEvent("updateTasks"));
};
