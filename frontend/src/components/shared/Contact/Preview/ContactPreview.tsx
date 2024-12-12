"use client";

import { FC, useEffect, useState } from "react";
import { Contact } from "@/core/entity/Contact/Contact";
import { ContactNavbar, Description } from "@/components/shared";
import { useRouter } from "next/navigation";
import styles from "./Preview.module.css";
import { container } from "@/infrastructure/Di/Container.config";
import { ContactController } from "@/infrastructure/Controllers/Contact/ContactController";
import useDescriptionStore from "@/store/contact/description/description.store";

interface ContactPreviewProps {
  contact: Contact;
  onEdit: () => void;
}

export const ContactPreview: FC<ContactPreviewProps> = ({
  contact,
  onEdit,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const router = useRouter();
  const controller = container.get<ContactController>(ContactController);
  const { description, toggleDescription } = useDescriptionStore();

  const handleCreate = () => {
    router.push("/contact/new");
  };

  const fetchImage = async () => {
    try {
      const response = await controller.getImageById(contact.id);
      if (!response || !response.data) return;
      const mimeType = "image/png/jpg/jpeg";
      const imageUrl = `data:${mimeType};base64,${response.data}`;
      setImageSrc(imageUrl);
    } catch (error) {
      console.log("Ошибка в отлове картинки: ", error);
    }
  };

  useEffect(() => {
    if (contact) fetchImage();
    return () => {
      setImageSrc(null);
    };
  }, [contact]);

  return (
    <>
      {contact && (
        <>
          {imageSrc && (
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${imageSrc})`,
              }}
            />
          )}
          <div className={styles.wrapper}>
            <div className={styles.title} onClick={toggleDescription}>
              {contact.name}
            </div>
            {description && <Description contact={contact} />}
          </div>
          <ContactNavbar handleCreate={handleCreate} handleEdit={onEdit} />
        </>
      )}
    </>
  );
};
