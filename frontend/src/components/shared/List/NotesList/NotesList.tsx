"use client";

import { FC, useState } from "react";

import { OutputData } from "@editorjs/editorjs";
import { Plus } from "lucide-react";
import { type NoteCardProps, type Note } from "../../NoteCard/NoteCard";
import dynamic from "next/dynamic";
import styles from "./NotesList.module.css";

const NoteCard = dynamic<NoteCardProps>(
  () => import("@/components/shared/NoteCard/NoteCard"),
  {
    ssr: false,
  }
);

interface NotesListProps {
  notes?: Note;
}

export const NotesList: FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: Date.now(), content: undefined },
  ]);

  const handleSave = (id: number, content: OutputData) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, content } : note))
    );
  };

  const addNote = () => {
    const newNote: Note = { id: Date.now(), content: undefined };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <>
      <div className={styles.list}>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onSave={handleSave} />
        ))}
      </div>
      <nav className={styles.notesToolbar}>
        <button onClick={addNote} className={styles.createButton}>
          <Plus size={16} />
        </button>
      </nav>
    </>
  );
};
