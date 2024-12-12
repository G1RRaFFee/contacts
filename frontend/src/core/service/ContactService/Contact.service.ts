import { v4 as uuidv4 } from "uuid";

import type { ContactRepository } from "@/core/repository/ContactRepository/ContactRepository";
import { injectable, inject } from "inversify";
import { Contact } from "@/core/entity/Contact/Contact";

@injectable()
export class ContactService {
  constructor(
    @inject("ContactRepository")
    private readonly contactRepository: ContactRepository
  ) {}

  public async create(contact: Contact) {
    return await this.contactRepository.create(contact);
  }

  public async getAll() {
    return await this.contactRepository.findAll();
  }

  public async delete(id: string) {
    return await this.contactRepository.delete(id);
  }

  public async findById(id: string) {
    return await this.contactRepository.findById(id);
  }

  public async update(id: string, updatedContact: Contact) {
    await this.contactRepository.update(id, updatedContact);
  }

  public async getImageById(id: string) {
    const response = this.contactRepository.getImagesById(id);
    return response;
  }

  public async saveImage(id: string, imageData: Buffer, extension: string) {
    return this.contactRepository.saveImage(id, imageData, extension);
  }

  public async linkImageToContact(id: string, imagePath: string) {
    this.contactRepository.linkImageToContact(id, imagePath);
  }

  public generateId(): string {
    return uuidv4();
  }
}
