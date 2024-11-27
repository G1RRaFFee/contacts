import { DeserializedContactsData } from "@/interface/contactsData";

export interface Serializer {
  toFormat(data: DeserializedContactsData): string;
  fromFormat(data: string): DeserializedContactsData;
}
