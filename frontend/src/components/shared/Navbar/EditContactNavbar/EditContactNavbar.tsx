import { FC } from "react";
import styles from "./EditContactNavbar.module.css";

interface EditContactNavbarProps {
  onSubmit?: () => void;
  onCancel: () => void;
  onDelete: any;
}

export const EditContactNavbar: FC<EditContactNavbarProps> = ({
  onCancel,
  onDelete,
}) => {
  return (
    <nav className={styles.navbar}>
      <button type="submit" form="ContactForm">
        Сохранить
      </button>
      <button onClick={onDelete}>Удалить</button>
      <button onClick={onCancel}>Отмена</button>
    </nav>
  );
};
