import { Contact } from "@/core/entity/Contact/Contact";
import { FC } from "react";

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
  const [formData, setFormData] = useState<Contact>({ ...contact });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <section>
      <h2>Edit Contact</h2>
      <form>
        {Object.entries(formData).map(([key, value]) =>
          key !== "id" ? (
            <div key={key}>
              <label>
                {key}:
                <input
                  type="text"
                  name={key}
                  value={value || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
          ) : null
        )}
      </form>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </section>
  );
};
