import { readTextFile, writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { downloadDir } from "@tauri-apps/api/path";

import ISerializer from "@/interface/serializer";
import IData from "@/interface/contactsData";

export class Storage {
  private serializer: ISerializer;

  constructor(serializer: ISerializer) {
    this.serializer = serializer;
  }

  public async save(data: IData): Promise<void> {
    try {
      const contents = this.serializer.toFormat(data);
      const path = await downloadDir();
      await writeTextFile(`${path}/Contacts/contacts.json`, contents, {
        dir: BaseDirectory.Download,
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async load() {
    try {
      const path = await downloadDir();
      const data = await readTextFile(`${path}/Contacts/contacts.json`);
      return this.serializer.fromFormat(data);
    } catch (error) {
      console.log(error);
    }
  }
}
