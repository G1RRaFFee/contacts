"use client";

import { Contact } from "@/core/entity/Contact/Contact";
import { FC, useState } from "react";
import { ContactEdit, ContactPreview } from "@/components/shared";
import { container } from "@/infrastructure/Di/Container.config";
import { ContactController } from "@/infrastructure/Controllers/Contact/ContactController";
import styles from "./ContactSection.module.css";

interface ContactSectionProps {
  contact: Contact | undefined;
  onFetch: () => Promise<void>;
}

export const ContactSection: FC<ContactSectionProps> = ({
  contact,
  onFetch,
}) => {
  const controller = container.get<ContactController>(ContactController);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedContact: Contact) => {
    try {
      await controller.update(updatedContact.id, updatedContact);
      await onFetch();
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка при сохранении контакта:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <section className={styles.section}>
      {isEditing ? (
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
