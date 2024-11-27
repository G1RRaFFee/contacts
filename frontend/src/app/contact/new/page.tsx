"use client";

import { ContactController } from "@/infrastructure/Controllers/Contact/ContactController";
import { container } from "@/infrastructure/Di/Container.config";
import useContactStore from "@/store/contact/contact.store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

type FormData = {
  id: string;
  name: string;
  email?: string;
  address?: string;
  phone?: string;
  website?: string;
  company?: string;
  birthday?: string;
  imageURL?: string;
};

export default function Page() {
  const controller = container.get<ContactController>(ContactController);
  const router = useRouter();
  const { createContact } = useContactStore();

  const [formData, setFormData] = useState<FormData>({
    id: controller.generateId(),
    name: "",
    email: "",
    address: "",
    phone: "",
    website: "",
    company: "",
    birthday: "",
    imageURL: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "imageURL" && files) {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setFormData({ ...formData, imageURL: reader.result as string });
        };
        reader.readAsDataURL(file); // Чтение файла как base64
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted with data:", formData);
      createContact(formData);
      router.push(`/contact/${formData.id}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      {/* Name (Required) */}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
      </div>

      {/* Email (Optional) */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Address (Optional) */}
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      {/* Phone (Optional) */}
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      {/* Website (Optional) */}
      <div>
        <label htmlFor="website">Website:</label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      {/* Company (Optional) */}
      <div>
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
      </div>

      {/* Birthday (Optional) */}
      <div>
        <label htmlFor="birthday">Birthday:</label>
        <input
          type="date"
          id="birthday"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
        />
      </div>

      {/* Image URL (Optional) */}
      <div>
        <label htmlFor="imageURL">Image URL:</label>
        <input
          type="file"
          accept="image/*"
          id="imageURL"
          name="imageURL"
          //   value={formData.imageURL}
          onChange={handleChange}
        />
        {imagePreview && (
          <div>
            <h4>Image Preview:</h4>
            <Image src={imagePreview} alt="Preview" width={100} height={100} />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={!formData.name}>
        Submit
      </button>
    </form>
  );
}
