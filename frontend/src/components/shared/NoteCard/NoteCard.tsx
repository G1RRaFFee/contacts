import { FC, useEffect, useRef, memo } from "react";
import EditorJS, {
  type OutputData,
  type ToolConstructable,
  type ToolSettings,
} from "@editorjs/editorjs";

import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Table from "@editorjs/table";

const EDITOR_TOOLS: Record<string, ToolConstructable | ToolSettings> = {
  header: Header,
  list: List,
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: "",
        byUrl: "",
      },
    },
  },
  table: Table,
};

export interface Note {
  id: number;
  content: OutputData | undefined;
}

export interface NoteCardProps {
  note: Note;
  onSave: (id: number, content: OutputData) => void;
}

const NoteCard: FC<NoteCardProps> = memo(({ note, onSave }) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    editorRef.current = new EditorJS({
      holder: `editor-${note.id}`,
      tools: EDITOR_TOOLS,
      data: note.content,
      placeholder: "Напишите вашу заметку здесь...",
      onChange: async () => {
        if (editorRef.current) {
          const content = await editorRef.current.save();
          onSave(note.id, content);
        }
      },
    });

    return () => {
      if (editorRef.current) editorRef.current.destroy();
    };
  }, []);

  return (
    <div
      id={`editor-${note.id}`}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    />
  );
});
export default NoteCard;
