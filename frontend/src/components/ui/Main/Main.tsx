import { FC, ReactNode } from "react";

interface MainProps {
  className?: string;
  children: ReactNode;
}

export const Main: FC<MainProps> = ({ className, children }) => {
  return <main className={className}>{children}</main>;
};
