"use client";

import { FC } from "react";
import { NotesNavbar } from "@/components/shared";
import styles from "./NotesSection.module.scss";

interface NotesSection {
  notes: string[] | undefined;
}

export const NotesSection: FC<NotesSection> = ({ notes }) => {
  return (
    <section className={styles.notesSection}>
      <p>Заметки</p>
      <ul>{notes && notes.map((note, key) => <li key={key}>{note}</li>)}</ul>
      <NotesNavbar />
    </section>
  );
};
