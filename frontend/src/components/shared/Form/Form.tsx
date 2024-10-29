"use client";

import { FC } from "react";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { ContactService } from "@/service/contact/contact.service";
import { Storage } from "@/storage/storage";
import { JsonSelializer } from "@/serializer/JsonSerializer";
import IContact from "@/interface/contact";

const storage = new Storage(new JsonSelializer());
const service = new ContactService(storage);

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
    // console.log(await service.getAllContacts());
    const contact: IContact = {
      id: 1,
      fullname: "PussyEater",
    };
    await service.addContact(contact);
    // await service.ensureContactsFile();
  }
  return (
    <>
      <button onClick={createFile}>Сохранить данные в файл</button>
      <button onClick={readFile}>Прочитать данные</button>
    </>
  );
};
