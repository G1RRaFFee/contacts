import { readTextFile, writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";

import ISerializer from "@/interface/serializer";
import IData from "@/interface/data";

export class Storage {
  private serializer: ISerializer;

  constructor(serializer: ISerializer) {
    this.serializer = serializer;
  }

  public async save(data: IData): Promise<void> {
    try {
      const contents = this.serializer.toFormat(data);
      await writeTextFile("Contacts.json", contents, {
        dir: BaseDirectory.Download,
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async load() {
    try {
      const data = await readTextFile("Contacts.json", {
        dir: BaseDirectory.Download,
      });
      return this.serializer.fromFormat(data);
    } catch (error) {
      console.log(error);
    }
  }
}
