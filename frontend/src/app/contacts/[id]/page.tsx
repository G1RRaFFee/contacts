"use client";

import { useContactService } from "@/hooks/contactService";
import IContact from "@/interface/contact";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [contact, setContact] = useState<IContact | undefined>();
  const service = useContactService();

  async function getContact(id: string) {
    setContact(await service.getContactById(id));
  }

  useEffect(() => {
    getContact(params.id);
  }, []);

  console.log(contact);
  return <>Contact id: {params.id}</>;
}
