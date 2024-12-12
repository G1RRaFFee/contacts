"use client";

import { FC, useState } from "react";

import { container } from "@/infrastructure/Di/Container.config";
import { ContactController } from "@/infrastructure/Controllers/Contact/ContactController";

import { ContactEdit, ContactPreview } from "@/components/shared";
import { type Contact } from "@/core/entity/Contact/Contact";
import styles from "./ContactSection.module.css";

interface ContactSectionProps {
  initialContact: Contact;
}

export const ContactSection: FC<ContactSectionProps> = ({ initialContact }) => {
  const controller = container.get<ContactController>(ContactController);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [contact, setContact] = useState<Contact>(initialContact);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async (updatedContact: Contact) => {
    try {
      await controller.update(updatedContact.id, updatedContact);
      setContact(updatedContact);
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка при сохранении контакта:", error);
    }
  };

  const handleCancel = () => setIsEditing(false);

  return (
    <section className={styles.section}>
      {isEditing && contact ? (
        <ContactEdit
          contact={contact as Contact}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <ContactPreview contact={contact as Contact} onEdit={handleEdit} />
      )}
    </section>
  );
};
