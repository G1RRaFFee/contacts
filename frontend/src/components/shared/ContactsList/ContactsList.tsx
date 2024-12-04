"use client";

import { FC, useEffect } from "react";

import Link from "next/link";

import useContactStore from "@/store/contact/contact.store";
import { Search, SideBar } from "@/components/shared";
import styles from "./ContactsList.module.css";

export const ContactsList: FC = () => {
  const { contacts, fetchContacts } = useContactStore();

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);
  return (
    <SideBar>
      <Search />
      <ul className={styles.list}>
        {contacts &&
          contacts.map((contact) => (
            <li className={styles.item} key={contact.id}>
              <Link className={styles.link} href={`/contact/${contact.id}`}>
                {contact.name}
                {/* <div className={styles.tags}>
                  {contact.tags
                    ? contact.tags.map((tag, index) => (
                        <span key={index}>{tag}</span>
                      ))
                    : null}
                </div> */}
              </Link>
            </li>
          ))}
      </ul>
    </SideBar>
  );
};

export default ContactsList;
