import React, { useState } from 'react'
import { OptionsDate } from 'shared/config';
import { Task } from 'types/task';

const ServiceContext = React.createContext(null);

export function ServiceProvider({
  children
}: {
  children: React.ReactNode
}) {
  const context = useCreateServiceContext();
    return (
        <ServiceContext.Provider value={context}>
            { children }    
        </ServiceContext.Provider>
    )
}

export function useAppContext() {
  const context = React.useContext(ServiceContext);
  if (!context) throw new Error('Use app context within provider!');
  return context;
}

export const useCreateServiceContext = function() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (textTask: string) => {
    const dateTask = new Date(Date.now());
    setTasks((prev) => [
        ...prev,
        {
          id: (Date.now()).toString(),
          text: textTask,
          date: dateTask.toLocaleDateString('ru-RU', OptionsDate),
        }
      ]
    )
  }

  const removeTask = (id: string) => {
    setTasks(() => 
      tasks.filter(task =>
        task.id !== id
      )
    )
  }

  return { tasks, addTask, removeTask };
}