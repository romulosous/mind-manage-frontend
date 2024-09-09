"use client";

import { useEffect, useRef, useState } from "react";
import { useClickAway, useMediaQuery } from "@/hooks";

import styles from "./Layout.module.css";
import Header from "../Header";
// import AccountProfile from "../AccountProfile";
import Sidebar from "../Sidebar/Sidebar";
import { SidebarCloseIcon } from "lucide-react";
import Container from "../Container";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const dropdownRef = useRef(null);

  useClickAway(dropdownRef, () => setOpenDropdown(false));

  useEffect(() => {
    if (isDesktop) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  }, [isDesktop]);

  return (
    <div className={styles.container}>
      <Header
        handleMenu={() => {
          if (openDropdown) {
            setOpenDropdown(false);
          }
          setOpenMenu(!openMenu);
        }}
        openMenu={openMenu}
      >
        {/* <span ref={dropdownRef}>
          <AccountProfile
            isOpenMenu={openMenu && !isDesktop}
            onClick={() => {
              setOpenDropdown(!openDropdown);
            }}
            isOpenDropdown={openDropdown}
          />
        </span> */}
      </Header>
     <div className={styles.layoutWrapper}>
	 <Sidebar
        isOpen={openMenu}
        isDesktop={isDesktop}
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      />
      {openMenu ? (
        <>
          <div
            className={styles.sidebar}
            onClick={() => {
              setOpenMenu(false);
            }}
          />
          <div
            className={styles.toggle}
            onClick={() => {
              setOpenMenu(false);
            }}
          >
            <SidebarCloseIcon />
          </div>
        </>
      ) : (
        <></>
      )}
      <div className={styles.content}>
        <Container>{children}</Container>
      </div>
	 </div>
    </div>
  );
};

export default Layout;
