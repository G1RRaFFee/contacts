import { FC, ReactNode } from "react";

import styles from "./SideBar.module.css";

interface SideBarProps {
  children: ReactNode;
}

export const SideBar: FC<SideBarProps> = ({ children }) => {
  return <aside className={styles.sideBar}>{children}</aside>;
};
