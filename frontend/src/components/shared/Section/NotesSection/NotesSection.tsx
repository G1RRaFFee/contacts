import { FC } from "react";

import { NotesList } from "@/components/shared";
import styles from "./NotesSection.module.css";

interface NotesSectionProps {}

export const NotesSection: FC<NotesSectionProps> = () => {
  return (
    <section className={styles.section}>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "600",
          padding: "0rem 0.5rem 0 0.5rem",
        }}
      >
        Заметки
      </h2>
      <NotesList />
    </section>
    // <section className={styles.notesSection}>
    // Title
    // NotesList
    // ToolBar
    // </section>
  );
};
