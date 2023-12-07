import { Link } from 'react-router-dom';
import { Button } from 'shared/ui/button/button';
import { OptionsDate } from 'shared/config/dateConfig';
import { Task } from 'types/task';
import { useMemo } from 'react';
import styles from './itemTask.module.css';

type Props = {
  task: Task;
  removeTask: (id: string) => void;
};

export function ItemTask({ task, removeTask }: Props) {
  const cachedDate = useMemo(
    () => new Date(task.date).toLocaleDateString('ru-RU', OptionsDate),
    [task.date]
  );

  return (
    <li className={styles.task}>
      <Link
        className={styles.link}
        to={`/tasks/${task.id}`}
        unstable_viewTransition
      >
        <span className={styles.text}>{task.id}</span>
        <p className={styles.text}>{task.text}</p>
        <span className={styles.text}>{cachedDate}</span>
      </Link>
      <Button
        styleClass={styles.button}
        onClick={() => removeTask(task.id)}
        title="Remove Task"
      >
        X
      </Button>
    </li>
  );
}
