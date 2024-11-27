import { FC } from "react";
import { Contact } from "@/core/entity/Contact/Contact";

interface ContactDisplayProps {
  contact: Contact;
  onEdit: () => void;
}

export const ContactDisplay: FC<ContactDisplayProps> = ({
  contact,
  onEdit,
}) => {
  return (
    <section>
      <h2>Contact Details</h2>
      <ul>
        {Object.entries(contact).map(([key, value]) =>
          key !== "id" ? (
            <li key={key}>
              <strong>{key}:</strong> <span>{value || "—"}</span>
            </li>
          ) : null
        )}
      </ul>
      <button onClick={onEdit}>Edit</button>
    </section>
  );
};
