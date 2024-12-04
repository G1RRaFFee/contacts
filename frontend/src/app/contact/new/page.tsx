"use client";

import { ContactController } from "@/infrastructure/Controllers/Contact/ContactController";
import { container } from "@/infrastructure/Di/Container.config";
import useContactStore from "@/store/contact/contact.store";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

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
  const [image, setImage] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement & {
      files: FileList;
    };
    const uploadedFile = target.files[0];
    setImage(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
  };

  const saveImageToDisk = async (
    id: string,
    file: File
  ): Promise<string | null> => {
    if (!file) return null;

    try {
      const imageData = await file.arrayBuffer();
      const extension = file.name.split(".").pop() || "png"; // Определяем расширение файла
      const path = await controller.saveImage(
        id,
        Buffer.from(imageData),
        extension
      );
      return path; // Возвращаем путь к сохраненному изображению
    } catch (error) {
      console.error("Failed to save image:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      let imagePath = null;
      if (image) {
        imagePath = await saveImageToDisk(formData.id, image);
      }

      const contactData = {
        ...formData,
        imageURL: imagePath || "",
      };

      console.log("Form submitted with data:", contactData);
      createContact(contactData);
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
          name="image"
          accept="image/*"
          id="imageURL"
          onChange={handleImageUpload}
        />
        {preview && (
          <div>
            <h4>Image Preview:</h4>
            <Image
              src={preview as string | StaticImport}
              alt="Preview"
              width={100}
              height={100}
            />
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
