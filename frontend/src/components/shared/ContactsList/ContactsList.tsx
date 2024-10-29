"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { useContactService } from "@/hooks/contactService";
import { Search, SideBar } from "@/components/shared";
import IContact from "@/interface/contact";

import styles from "./ContactsList.module.scss";

export const ContactsList = () => {
  const [contacts, setContacts] = useState<IContact[] | undefined>(undefined);
  const contactService = useContactService();

  async function getAllContacts() {
    const allContacts = await contactService.getAllContacts();
    setContacts(allContacts);
  }

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <SideBar>
      <Search />
      <ul className={styles.list}>
        {contacts?.map((contact, index) => (
          <li className={styles.item} key={index}>
            <Link className={styles.link} href={`contacts/${contact.id}`}>
              {contact.fullname}
            </Link>
          </li>
        ))}
      </ul>
    </SideBar>
  );
};

export default ContactsList;
