import { Column } from "../Column/Column";
import type { ColumnType } from "../../types/kanban";

import styles from "./Board.module.scss";

const columns: ColumnType[] = [
  {
    id: "1",
    title: "Todo",
    tasks: [
      { id: "1", title: "Create layout" },
      { id: "2", title: "Setup drag and drop" },
    ],
  },
  {
    id: "2",
    title: "In Progress",
    tasks: [{ id: "3", title: "Build board state" }],
  },
  {
    id: "3",
    title: "Done",
    tasks: [{ id: "4", title: "Create React app" }],
  },
];

export const Board = () => {
  return (
    <div className={styles.board}>
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};
