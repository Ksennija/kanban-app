export interface Task {
  id: string;
  title: string;
}

export interface ColumnType {
  id: string;
  title: string;
  tasks: Task[];
}
