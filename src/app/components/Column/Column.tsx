import { useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { useBoardStore } from "../../store/boardStore";
import { TaskCard } from "../TaskCard/TaskCard";

import styles from "./Column.module.scss";

interface Props {
  columnId: string;
  index: number;
}

export const Column = ({ columnId, index }: Props) => {
  const column = useBoardStore((s) => s.columns.find((c) => c.id === columnId));
  const addTask = useBoardStore((s) => s.addTask);

  const { ref, handleRef, isDragging } = useSortable({
    id: columnId,
    index,
    group: "board",
    data: { type: "column" },
  });

  const [inputValue, setInputValue] = useState("");

  if (!column) return null;

  const handleAdd = () => {
    const title = inputValue.trim();
    if (!title) return;
    addTask(columnId, title);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className={styles.column} ref={ref} style={{ opacity: isDragging ? 0.4 : 1 }}>
      <h2 className={styles.title} ref={handleRef} style={{ cursor: "grab" }}>{column.title}</h2>

      <div className={styles.tasks}>
        {column.tasks.map((task, i) => (
          <TaskCard key={task.id} taskId={task.id} columnId={columnId} index={i} />
        ))}
      </div>

      <div className={styles.addTask}>
        <input
          className={styles.input}
          placeholder="New task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.addButton} onClick={handleAdd}>
          +
        </button>
      </div>
    </div>
  );
};
