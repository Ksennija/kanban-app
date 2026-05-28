import { useState } from 'react';
import { useBoardStore } from '../../store/boardStore';
import { TaskCard } from '../TaskCard/TaskCard';

import styles from './Column.module.scss';

interface Props {
  columnId: string;
}

export const Column = ({ columnId }: Props) => {
  const column = useBoardStore((s) => s.columns.find((c) => c.id === columnId));
  const addTask = useBoardStore((s) => s.addTask);

  const [inputValue, setInputValue] = useState('');

  if (!column) return null;

  const handleAdd = () => {
    const title = inputValue.trim();
    if (!title) return;
    addTask(columnId, title);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className={styles.column}>
      <h2 className={styles.title}>{column.title}</h2>

      <div className={styles.tasks}>
        {column.tasks.map((task) => (
          <TaskCard key={task.id} taskId={task.id} columnId={columnId} />
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
        <button className={styles.addButton} onClick={handleAdd}>+</button>
      </div>
    </div>
  );
};
