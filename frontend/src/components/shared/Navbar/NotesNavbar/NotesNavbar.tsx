import { FC } from "react";
import styles from "./NotesNavbar.module.scss";

export const NotesNavbar: FC = () => {
  return (
    <nav className={styles.notesNavbar}>
      <button>Добавить</button>
      <button>Изменить</button>
    </nav>
  );
};
