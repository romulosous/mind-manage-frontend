"use client";

import styles from "./Layout.module.css";
import PatientSidebar from "./Sidebar";
import Container from "@/components/Template/Container";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.layoutWrapper}>
        <div>
          <PatientSidebar />
        </div>
        <div className={styles.content}>
          <Container className={styles.wrapper}>{children}</Container>
        </div>
      </div>
    </div>
  );
};

export default Layout;
