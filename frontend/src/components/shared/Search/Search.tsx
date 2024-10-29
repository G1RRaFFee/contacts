import { FC } from "react";

import styles from "./Search.module.scss";

export const Search: FC = () => {
  return (
    <div className={styles.searchContainer}>
      <input className={styles.searchInput} type="text" />
    </div>
  );
};
