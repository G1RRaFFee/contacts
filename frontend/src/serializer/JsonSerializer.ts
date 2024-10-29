import ISerializer from "@/interface/serializer";
import IContactsData from "@/interface/contactsData";

export class JsonSelializer implements ISerializer {
  public toFormat(data: IContactsData): string {
    return JSON.stringify(data, null, 2);
  }

  public fromFormat(data: string): IContactsData {
    return JSON.parse(data);
  }
}
