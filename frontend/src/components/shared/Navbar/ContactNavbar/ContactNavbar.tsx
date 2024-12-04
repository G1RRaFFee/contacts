import { FC } from "react";

import { Plus, Bell, Share } from "lucide-react";

import styles from "./ContactNavbar.module.css";

interface ContactNavbarProps {
  handleCreate: () => void;
  handleEdit: () => void;
  onNotification?: () => void;
  onShare?: () => void;
}

export const ContactNavbar: FC<ContactNavbarProps> = ({
  handleCreate,
  handleEdit,
}) => {
  return (
    <nav className={styles.navbar}>
      <button className={styles.createButton} onClick={handleCreate}>
        <Plus size={16} />
      </button>
      <div className={styles.wrapper}>
        <button className={styles.editButton} onClick={handleEdit}>
          Изменить
        </button>
        <button className={styles.notificationButton}>
          <Bell size={16} />
        </button>
        <button className={styles.shareButton}>
          <Share size={16} />
        </button>
      </div>
    </nav>
  );
};
