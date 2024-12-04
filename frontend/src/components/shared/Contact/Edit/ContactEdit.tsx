"use client";

import { Contact } from "@/core/entity/Contact/Contact";
import { FC, useState } from "react";
import Form from "next/form";
import { EditContactNavbar } from "@/components/shared";
import useContactStore from "@/store/contact/contact.store";
import { useRouter } from "next/navigation";

interface ContactEditProps {
  contact: Contact;
  onSave: (updatedContact: Contact) => void;
  onCancel: () => void;
}

export const ContactEdit: FC<ContactEditProps> = ({
  contact,
  onSave,
  onCancel,
}) => {
  const { deleteContact } = useContactStore();
  const [formData, setFormData] = useState<Contact>({ ...contact });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleDelete = () => {
    router.push("/");
    deleteContact(formData.id);
  };

  return (
    <section>
      <Form action={handleSave} id="ContactForm">
        {Object.entries(formData).map(([key, value]) =>
          key !== "id" && key !== "notes" ? (
            <p key={key}>
              <label>
                {key}:
                <input
                  type="text"
                  name={key}
                  value={value || ""}
                  onChange={handleChange}
                />
              </label>
            </p>
          ) : null
        )}
      </Form>
      <EditContactNavbar onCancel={onCancel} onDelete={handleDelete} />
    </section>
  );
};
