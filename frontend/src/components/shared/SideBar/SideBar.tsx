import { FC, ReactNode } from "react";

import styles from "./sideBar.module.scss";

interface ISideBar {
  children: ReactNode;
}

export const SideBar: FC<ISideBar> = ({ children }) => {
  return <aside className={styles.sideBar}>{children}</aside>;
};