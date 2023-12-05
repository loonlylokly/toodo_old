/* eslint-disable func-names */
import { StoreType } from './storeTypes';
import { taskSlice } from './slices/tasksSlice';

export const storeService = (function () {
  function createService() {
    const store: StoreType = {
      tasks: [],
      isOpen: false,
    };

    const getStore = store;

    const executor = {
      getTask: taskSlice(store).getTask,
      addTask: taskSlice(store).addTask,
      editTask: taskSlice(store).editTask,
      removeTask: taskSlice(store).removeTask,
      isOpen: taskSlice(store).toggleDialogEditTask,
    };

    return { getStore, executor };
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
