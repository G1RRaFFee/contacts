"use client";

import { Contact } from "@/core/entity/Contact/Contact";
import { FC, useState } from "react";
import { ContactNavbar } from "@/components/shared";
import styles from "./ContactSection.module.scss";

interface ContactSectionProps {
  contact: Contact | undefined;
}

export const ContactSection: FC<ContactSectionProps> = ({ contact }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedContact: Contact) => {
    // setContact(updatedContact);
    // через контроллер апдейтить контакт.
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  return contact ? (
    <section className={styles.contactSection}>
      <ul>
        {Object.entries(contact).map(
          ([key, value]) =>
            key !== "notes" &&
            key !== "id" && (
              <li key={key}>
                <strong style={{ fontWeight: "bold" }}>{key}</strong>:{" "}
                <i style={{ fontStyle: "italic" }}>{String(value)}</i>
              </li>
            )
        )}
      </ul>
      <ContactNavbar />
    </section>
  ) : (
    <p>No contact information available.</p>
  );
};
