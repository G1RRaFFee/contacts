"use client";

import { FC, Fragment, useEffect, useState } from "react";
import { Contact } from "@/core/entity/Contact/Contact";
import { ContactNavbar } from "@/components/shared";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import styles from "./Preview.module.css";
import { container } from "@/infrastructure/Di/Container.config";
import { ContactController } from "@/infrastructure/Controllers/Contact/ContactController";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

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

  const handleCreate = () => {
    router.push("/contact/new");
  };

  const fetchImage = async () => {
    try {
      const response = await controller.getImageById(contact.id);
      console.log(response);
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
            <div className={styles.title}>{contact.name}</div>
            <div className={styles.grid}>
              {Object.entries(contact).map(
                ([key, value], index) =>
                  key !== "name" &&
                  key !== "id" &&
                  key !== "notes" && (
                    <Fragment key={index}>
                      <div className={styles.item}>{key}</div>
                      <div className={styles.value}>{value}</div>
                    </Fragment>
                  )
              )}
            </div>
          </div>
          <ContactNavbar handleCreate={handleCreate} handleEdit={onEdit} />
        </>
      )}
    </>
  );
};
