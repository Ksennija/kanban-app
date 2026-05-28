import { useBoardStore } from '../../store/boardStore';
import { Column } from '../Column/Column';

import styles from './Board.module.scss';

export const Board = () => {
  const columns = useBoardStore((s) => s.columns);

  return (
    <div className={styles.board}>
      {columns.map((column) => (
        <Column key={column.id} columnId={column.id} />
      ))}
    </div>
  );
};
