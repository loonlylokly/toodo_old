import { TTask } from 'types/task';

export enum EventList {
  updateTasks = 'updateTasks',
  updateDialogEditTask = 'updateDialogEditTask',
}

export type StoreType = {
  tasks: TTask[];
  isOpen: boolean;
};
