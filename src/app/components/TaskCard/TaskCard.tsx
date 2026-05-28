import { useBoardStore } from '../../store/boardStore';

import styles from './TaskCard.module.scss';

interface Props {
  taskId: string;
  columnId: string;
}

export const TaskCard = ({ taskId, columnId }: Props) => {
  const task = useBoardStore((s) =>
    s.columns.find((c) => c.id === columnId)?.tasks.find((t) => t.id === taskId)
  );
  const deleteTask = useBoardStore((s) => s.deleteTask);

  if (!task) return null;

  return (
    <div className={styles.card}>
      <span>{task.title}</span>
      <button
        className={styles.deleteButton}
        onClick={() => deleteTask(columnId, taskId)}
        aria-label="Delete task"
      >
        ×
      </button>
    </div>
  );
};
