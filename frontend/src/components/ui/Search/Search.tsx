import { ComponentProps, FC } from "react";
import styles from "./Search.module.css";

export const Search: FC<ComponentProps<"input">> = () => {
  return (
    <div className={styles.i}>
      <input className={styles.in} type="text" />
    </div>
  );
};
