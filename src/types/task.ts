export type TTask = {
  id: string;
  text: string;
  date: string;
};

export enum EStatusEditTask {
  error = 'error',
  success = 'success',
}
