import { Contact } from "@/core/entity/Contact/Contact";

export interface ContactRepository {
  create: (contact: Contact) => Promise<Contact>;
  findById: (id: string) => Promise<Contact | undefined>;
  findAll: () => Promise<Contact[]>;
  update: (id: string, dto: Contact) => Promise<void>;
  delete: (id: string) => Promise<void>;
  getImagesById: (id: string) => Promise<{ name: string; data: string } | null>;
  saveImage: (
    id: string,
    imageData: Buffer,
    extension: string | "png"
  ) => Promise<string>;
  linkImageToContact: (id: string, imagePath: string) => Promise<void>;
}
