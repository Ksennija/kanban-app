import { useBoardStore } from "../../store/boardStore";
import { Column } from "../Column/Column";
import { DragDropProvider } from "@dnd-kit/react";
import type { DragEndEvent } from "@dnd-kit/react";
import { isSortableOperation } from "@dnd-kit/react/sortable";

import styles from "./Board.module.scss";

export const Board = () => {
  const columns = useBoardStore((s) => s.columns);
  const moveTask = useBoardStore((s) => s.moveTask);
  const reorderTask = useBoardStore((s) => s.reorderTask);
  const reorderColumn = useBoardStore((s) => s.reorderColumn);

  const handleDragEnd = (event: DragEndEvent) => {
    const { operation } = event;
    if (!operation.target) return;

    if (isSortableOperation(operation)) {
      const { source, target } = operation;
      if (!source) return;
      const sourceGroup = source.group as string;
      const targetGroup = target.group as string;

      if (sourceGroup === "board" && targetGroup === "board") {
        reorderColumn(source.index, target.index);
      } else if (sourceGroup === targetGroup) {
        reorderTask(sourceGroup, source.index, target.index);
      } else {
        const toColumnId =
          targetGroup === "board" ? (target.id as string) : targetGroup;
        moveTask(source.id as string, sourceGroup, toColumnId);
      }
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className={styles.board}>
        {columns.map((column, index) => (
          <Column key={column.id} columnId={column.id} index={index} />
        ))}
      </div>
    </DragDropProvider>
  );
};
