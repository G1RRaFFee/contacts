"use client";

import { FC, useState, useEffect } from "react";
import {
  writeTextFile,
  createDir,
  BaseDirectory,
  readTextFile,
} from "@tauri-apps/api/fs";
import { downloadDir } from "@tauri-apps/api/path";

export const Form: FC = () => {
  async function createFile() {
    const contacts = [
      {
        id: 1,
        email: "abob.",
      },
      {
        id: 2,
        email: "peter",
      },
    ];
    await writeTextFile("example_file.json", JSON.stringify(contacts), {
      dir: BaseDirectory.Download,
    });
  }

  async function readFile() {
    const result = await readTextFile("example_file.json", {
      dir: BaseDirectory.Download,
    });
    console.log(JSON.parse(result));
  }
  return (
    <>
      <button onClick={createFile}>Сохранить данные в файл</button>
      <button onClick={readFile}>Прочитать данные</button>
    </>
  );
};
