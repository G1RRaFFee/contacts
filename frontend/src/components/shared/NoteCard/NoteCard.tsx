import { FC, useEffect, useRef, memo, useState } from "react";
import EditorJS, { type OutputData } from "@editorjs/editorjs";
import { container } from "@/infrastructure/Di/Container.config";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Table from "@editorjs/table";
import { debounce } from "lodash";
import { ContactController } from "@/infrastructure/Controllers/Contact/ContactController";

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
  const [imagePreviews, setImagePreviews] = useState<
    string | ArrayBuffer | null
  >(null);

  const debouncedSave = useRef(
    debounce(async (content: OutputData) => {
      onSave(note.id, content);
    }, 5000)
  ).current;

  useEffect(() => {
    editorRef.current = new EditorJS({
      holder: `editor-${note.id}`,
      tools: {
        header: Header,
        list: List,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              // TODO: "Переписать (Переписать Image)"
              async uploadByFile(file: File) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                  setImagePreviews(fileReader.result);
                  console.log(fileReader.result);
                };
                fileReader.readAsDataURL(file);

                const controller =
                  container.get<ContactController>(ContactController);

                const imageData = await file.arrayBuffer();
                const extension = file.name.split(".").pop() || "png";
                const id = "1";
                const path = await controller.saveImage(
                  id,
                  Buffer.from(imageData),
                  extension
                );
                return {
                  success: 1,
                  file: {
                    url: imagePreviews,
                  },
                };
              },
            },
          },
        },
        table: Table,
      },
      data: note.content,
      placeholder: "Напишите вашу заметку здесь...",
      onChange: async () => {
        if (editorRef.current) {
          const content = await editorRef.current.save();
          debouncedSave(content);
        }
      },
    });

    return () => {
      if (editorRef.current) editorRef.current.destroy();
      debouncedSave.cancel();
    };
  }, [note.id, note.content, onSave]);

  return (
    <div>
      <div
        id={`editor-${note.id}`}
        style={{
          padding: "0.5rem",
          marginBottom: "10px",
          backgroundColor: "rgba(255,255,255, 0.07)",
          borderRadius: "0.5rem",
        }}
      />
    </div>
  );
});
export default NoteCard;
