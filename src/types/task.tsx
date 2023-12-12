export type Task = {
  id: string;
  text: string;
  date: string;
};

export enum statusEditTask {
  error = 'error',
  success = 'success',
}
