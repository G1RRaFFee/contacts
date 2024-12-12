import { FC } from "react";

import { Plus, Bell, Share, UserRoundPen } from "lucide-react";

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
      <button className={styles.button} onClick={handleCreate}>
        <Plus size={20} />
      </button>
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={handleEdit}>
          <UserRoundPen size={20} />
        </button>
        <button className={styles.button}>
          <Bell size={20} />
        </button>
        <button className={styles.button}>
          <Share size={20} />
        </button>
      </div>
    </nav>
  );
};
