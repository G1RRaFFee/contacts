import IContactsData from "@/interface/contactsData";

export default interface ISerializer {
  toFormat(data: IContactsData): string;
  fromFormat(data: string): IContactsData;
}
