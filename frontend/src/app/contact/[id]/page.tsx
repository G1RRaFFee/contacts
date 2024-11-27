"use client";

import { use, useEffect, useState } from "react";
import { NotesSection, ContactSection } from "@/components/shared";
import { container } from "@/infrastructure/Di/Container.config";
import { ContactController } from "@/infrastructure/Controllers/Contact/ContactController";
import { Contact } from "@/core/entity/Contact/Contact";
import { Main } from "@/components/ui";
import styles from "./page.module.scss";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [contact, setContact] = useState<Contact | undefined>(undefined);
  const controller = container.get<ContactController>(ContactController);

  const fetchContact = async () => {
    const response = await controller.getById(id);
    setContact(response);
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <Main className={styles.pageMain}>
      <ContactSection contact={contact} />
      <NotesSection notes={contact?.notes} />
    </Main>
  );
}
