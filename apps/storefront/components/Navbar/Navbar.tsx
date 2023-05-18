import clsx from "clsx";
import React from "react";
import { Menu } from "./Menu";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <>
      <div className={clsx(styles.navbar)}>
        <div className={clsx(styles.inner)}>
          <div className="flex-1 h-full hidden xs:flex">
            <Menu />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
