import { create } from "zustand";
import { container } from "@/infrastructure/Di/Container.config";
import { ContactController } from "@/infrastructure/Controllers/Contact/ContactController";
import { Contact } from "@/core/entity/Contact/Contact";

interface ContactStore {
  contacts: Contact[] | undefined;
  fetchContacts: () => Promise<void>;
  createContact: (contact: Contact) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
}

const useContactStore = create<ContactStore>((set) => {
  const controller = container.get<ContactController>(ContactController);

  return {
    contacts: [],
    fetchContacts: async () => {
      const response = await controller.getAll();
      set({ contacts: response });
    },
    createContact: async (contact: Contact) => {
      const newContact = await controller.create(contact);
      if (newContact) {
        set((state) => ({
          contacts: state.contacts
            ? [...state.contacts, newContact]
            : [newContact],
        }));
      }
    },
    deleteContact: async (id: string) => {
      try {
        await controller.delete(id); // Удаляем контакт по id
        set((state) => ({
          contacts: state.contacts
            ? state.contacts.filter((contact) => contact.id !== id)
            : [],
        }));
      } catch (error) {
        console.error("Ошибка при удалении контакта:", error);
      }
    },
  };
});

export default useContactStore;
