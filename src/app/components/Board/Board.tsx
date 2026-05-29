import { useBoardStore } from "../../store/boardStore";
import { Column } from "../Column/Column";
import { DragDropProvider } from "@dnd-kit/react";
import type { DragEndEvent } from "@dnd-kit/react";

import styles from "./Board.module.scss";

export const Board = () => {
  const columns = useBoardStore((s) => s.columns);

  const moveTask = useBoardStore((s) => s.moveTask);

  const handleDragEnd = (event: DragEndEvent) => {
    const { source, target } = event.operation;
    if (!target) return;

    const fromColumnId = source?.data?.columnId as string;
    const toColumnId = target.id as string;
    const taskId = source?.id as string;

    if (fromColumnId !== toColumnId) {
      moveTask(taskId, fromColumnId, toColumnId);
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className={styles.board}>
        {columns.map((column) => (
          <Column key={column.id} columnId={column.id} />
        ))}
      </div>
    </DragDropProvider>
  );
};
