import { PropsWithChildren } from "react";
import styles from "./Layout.module.css";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};
