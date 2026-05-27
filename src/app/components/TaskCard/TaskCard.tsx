import styles from "./TaskCard.module.scss";

interface Props {
  title: string;
}

export const TaskCard = ({ title }: Props) => {
  return <div className={styles.card}>{title}</div>;
};
