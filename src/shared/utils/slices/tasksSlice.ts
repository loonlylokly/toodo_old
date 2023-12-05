/* eslint-disable no-param-reassign */
import { OptionsDate } from 'shared/config/dateConfig';
import { EventList, StoreType } from '../storeTypes';

export function taskSlice(state: StoreType) {
  const getTask = (id: string) => {
    return state.tasks.find((item) => item.id === id);
  };

  const addTask = (textTask: string) => {
    const dateTask = new Date(Date.now());
    state.tasks.push({
      id: Date.now().toString(),
      text: textTask,
      date: dateTask.toLocaleDateString('ru-RU', OptionsDate),
    });
    window.dispatchEvent(new CustomEvent(EventList.updateTasks));
  };

  const editTask = (id: string, newTextTask: string, newDateTask: string) => {
    const idx = state.tasks.findIndex((item) => item.id === id);
    state.tasks[idx] = {
      id,
      text: newTextTask,
      date: newDateTask,
    };
    window.dispatchEvent(new CustomEvent(EventList.updateTasks));
  };

  const removeTask = (id: string) => {
    state.tasks = [...state.tasks.filter((task) => task.id !== id)];
    window.dispatchEvent(new CustomEvent(EventList.updateTasks));
  };

  const toggleDialogEditTask = (isOpen: boolean) => {
    state.isOpen = isOpen;
    window.dispatchEvent(new CustomEvent(EventList.updateDialogEditTask));
  };

  return {
    getTask,
    addTask,
    editTask,
    removeTask,
    toggleDialogEditTask,
  };
}
