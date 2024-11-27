import { FC, ReactNode } from "react";
import styles from "./Footer.module.scss";

interface Footer {
  children: ReactNode;
}

export const Footer: FC<Footer> = ({ children }) => {
  return <footer className={styles.footer}>{children}</footer>;
};
