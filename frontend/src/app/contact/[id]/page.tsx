"use client";

import { FC, Suspense, use, useEffect, useState } from "react";
import { container } from "@/infrastructure/Di/Container.config";
import { ContactController } from "@/infrastructure/Controllers/Contact/ContactController";
import { Contact } from "@/core/entity/Contact/Contact";
import { NotesSection, ContactSection } from "@/components/shared";
import styles from "./page.module.css";

export default function ContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [contact, setContact] = useState<Contact>();
  const controller = container.get<ContactController>(ContactController);

  const fetchContact = async () => {
    const response = await controller.getById(id);
    setContact(response);
  };

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <main className={styles.pageMain}>
      <Suspense fallback={<Loading />}>
        {contact ? (
          <>
            <ContactSection initialContact={contact} />
            <NotesSection />
          </>
        ) : (
          <Loading />
        )}
      </Suspense>
    </main>
  );
}

const Loading: FC = () => {
  return <p>Loading section...</p>;
};
