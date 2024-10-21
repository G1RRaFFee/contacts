import { ComponentProps, FC } from "react";

export const List: FC<ComponentProps<"ul">> = ({ children }) => {
  return <ul>{children}</ul>;
};
