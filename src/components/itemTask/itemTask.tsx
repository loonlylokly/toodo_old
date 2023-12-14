import { Link } from 'react-router-dom';
import { Button } from 'shared/ui/button/button';
import { TTask } from 'types/task';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import styles from './itemTask.module.css';

type Props = {
  task: TTask;
  removeTask: (id: string) => void;
};

export function ItemTask({ task, removeTask }: Props) {
  const cachedDate = useMemo(
    () => dayjs(task.date).format('DD-MM-YYYY, HH:mm:ss'),
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
