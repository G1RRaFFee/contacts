"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./ContactNavbar.module.scss";

export const ContactNavbar: FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();

  const handleOnAdd = () => {
    router.push("/contact/new");
  };

  const handleOnUpdate = () => {
    setIsEdit(true);
  };

  return (
    <nav className={styles.contactNavbar}>
      <button onClick={handleOnAdd}>Добавить</button>
      <button onClick={handleOnUpdate}>Изменить</button>
      <button>Уведомления</button>
      <button>Поделиться</button>
    </nav>
  );
};
