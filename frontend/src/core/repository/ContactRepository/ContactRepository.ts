import { Contact } from "@/core/entity/Contact/Contact";
import { UpdateContactDto } from "@/core/repository/ContactRepository/dto/UpdateContactDto";

export interface ContactRepository {
  create: (contact: Contact) => Promise<Contact>;
  findById: (id: string) => Promise<Contact | undefined>;
  findAll: () => Promise<Contact[]>;
  update: (id: string, dto: UpdateContactDto) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
