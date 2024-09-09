import { motion } from "framer-motion";

import styles from "./header.module.css";
import { IconMenu } from "@tabler/icons-react";

interface HeaderProps {
  handleMenu: React.MouseEventHandler<HTMLButtonElement>;
  openMenu: boolean;
  children?: React.ReactNode;
}

const Header = ({ handleMenu, openMenu, children }: HeaderProps) => {
  const show = {
    opacity: 1,
    transition: { ease: "easeIn" },
    display: "block",
  };

  const hide = {
    opacity: 0,
    transition: { duration: 0 },
    transitionEnd: {
      display: "none",
    },
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <motion.menu
            whileTap={{ scale: 0.85 }}
            onClick={handleMenu}
            className={styles.menu}
            data-cy="menu"
          >
            <IconMenu />
          </motion.menu>
          <h1 className={styles.logo}>MindManage</h1>
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={openMenu ? hide : show}
            className={styles.logo}
            data-cy="logo"
          >
            Logo
          </motion.div> */}
          {children}
        </div>
      </div>
    </header>
  );
};

export default Header;
