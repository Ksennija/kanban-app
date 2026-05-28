import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ColumnType, Task } from '../types/kanban';

interface BoardStore {
  columns: ColumnType[];
  addTask: (columnId: string, title: string) => void;
  deleteTask: (columnId: string, taskId: string) => void;
  updateTask: (columnId: string, taskId: string, title: string) => void;
  moveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void;
}

const initialColumns: ColumnType[] = [
  {
    id: '1',
    title: 'Todo',
    tasks: [
      { id: '1', title: 'Create layout' },
      { id: '2', title: 'Setup drag and drop' },
    ],
  },
  {
    id: '2',
    title: 'In Progress',
    tasks: [{ id: '3', title: 'Build board state' }],
  },
  {
    id: '3',
    title: 'Done',
    tasks: [{ id: '4', title: 'Create React app' }],
  },
];

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      columns: initialColumns,

      addTask: (columnId, title) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === columnId
              ? { ...col, tasks: [...col.tasks, { id: crypto.randomUUID(), title }] }
              : col
          ),
        })),

      deleteTask: (columnId, taskId) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === columnId
              ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
              : col
          ),
        })),

      updateTask: (columnId, taskId, title) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === columnId
              ? {
                  ...col,
                  tasks: col.tasks.map((t) =>
                    t.id === taskId ? { ...t, title } : t
                  ),
                }
              : col
          ),
        })),

      moveTask: (taskId, fromColumnId, toColumnId) =>
        set((state) => {
          let taskToMove: Task | undefined;

          const columns = state.columns.map((col) => {
            if (col.id === fromColumnId) {
              taskToMove = col.tasks.find((t) => t.id === taskId);
              return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
            }
            return col;
          });

          if (!taskToMove) return state;

          return {
            columns: columns.map((col) =>
              col.id === toColumnId
                ? { ...col, tasks: [...col.tasks, taskToMove!] }
                : col
            ),
          };
        }),
    }),
    { name: 'kanban-board' }
  )
);
