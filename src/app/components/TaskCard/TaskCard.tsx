import { useDraggable } from "@dnd-kit/react";
import { useState, useRef, useEffect } from "react";
import { useBoardStore } from "../../store/boardStore";

import styles from "./TaskCard.module.scss";

interface Props {
  taskId: string;
  columnId: string;
}

export const TaskCard = ({ taskId, columnId }: Props) => {
  const task = useBoardStore((s) =>
    s.columns.find((c) => c.id === columnId)?.tasks.find((t) => t.id === taskId)
  );
  const deleteTask = useBoardStore((s) => s.deleteTask);
  const updateTask = useBoardStore((s) => s.updateTask);

  const { ref } = useDraggable({
    id: taskId,
    data: { columnId },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  if (!task) return null;

  const handleEditStart = () => {
    setInputValue(task.title);
    setIsEditing(true);
  };

  const handleSave = () => {
    const title = inputValue.trim();
    if (title && title !== task.title) {
      updateTask(columnId, taskId, title);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  if (isEditing) {
    return (
      <div className={styles.card}>
        <input
          ref={inputRef}
          className={styles.editInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
        />
        <div className={styles.editActions}>
          <button
            className={styles.saveButton}
            onMouseDown={handleSave}
            aria-label="Save"
          >
            ✓
          </button>
          <button
            className={styles.cancelButton}
            onMouseDown={handleCancel}
            aria-label="Cancel"
          >
            ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card} ref={ref}>
      <span>{task.title}</span>
      <div className={styles.actions}>
        <button
          className={styles.editButton}
          onClick={handleEditStart}
          aria-label="Edit task"
        >
          ✎
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => deleteTask(columnId, taskId)}
          aria-label="Delete task"
        >
          ×
        </button>
      </div>
    </div>
  );
};
