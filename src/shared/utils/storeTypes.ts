import { Task } from 'types/task';

export enum EventList {
  updateTasks = 'updateTasks',
  updateDialogEditTask = 'updateDialogEditTask',
}

export type StoreType = {
  tasks: Task[];
  isOpen: boolean;
};
