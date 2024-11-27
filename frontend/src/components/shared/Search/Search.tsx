import { FC } from "react";

import styles from "./Search.module.scss";

export const Search: FC = () => {
  return (
    <search className={styles.searchContainer}>
      <input className={styles.searchInput} type="text" />
    </search>
  );
};
