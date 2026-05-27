import type { ColumnType } from "../../types/kanban";
import { TaskCard } from "../TaskCard/TaskCard";

import styles from "./Column.module.scss";

interface Props {
  column: ColumnType;
}

export const Column = ({ column }: Props) => {
  return (
    <div className={styles.column}>
      <h2 className={styles.title}>{column.title}</h2>

      <div className={styles.tasks}>
        {column.tasks.map((task) => (
          <TaskCard key={task.id} title={task.title} />
        ))}
      </div>
    </div>
  );
};
