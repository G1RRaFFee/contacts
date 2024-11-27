import {
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";
import { downloadDir } from "@tauri-apps/api/path";

import { Serializer } from "@/interface/serializer";
import { DeserializedContactsData } from "@/interface/contactsData";

export class Storage {
  private serializer: Serializer;

  constructor(serializer: Serializer) {
    this.serializer = serializer;
  }

  public async save(data: DeserializedContactsData): Promise<void> {
    try {
      const contents = this.serializer.toFormat(data);
      const path = await downloadDir();
      await writeTextFile(`${path}/Contacts/contacts.json`, contents, {
        baseDir: BaseDirectory.Download,
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async load(): Promise<DeserializedContactsData | undefined> {
    try {
      const path = await downloadDir();
      const data = await readTextFile(`${path}/Contacts/contacts.json`);
      return this.serializer.fromFormat(data);
    } catch (error) {
      console.log(error);
    }
  }
}
