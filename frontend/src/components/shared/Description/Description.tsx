import { Contact } from "@/core/entity/Contact/Contact";
import { FC, Fragment } from "react";

import styles from "./Description.module.css";

interface DescriptionProps {
  contact: Contact;
}
// TODO: "Расформировать Contact и избавиться от множественного исключения параметров."
export const Description: FC<DescriptionProps> = ({ contact }) => {
  return (
    <div className={styles.grid}>
      {Object.entries(contact).map(
        ([key, value], index) =>
          key !== "name" &&
          key !== "id" &&
          key !== "notes" &&
          key !== "imageURL" && (
            <Fragment key={index}>
              <div className={styles.item}>{key}</div>
              <div className={styles.value}>{value}</div>
            </Fragment>
          )
      )}
    </div>
  );
};
