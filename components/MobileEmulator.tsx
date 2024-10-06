import React from "react";
import styles from "../styles/MobileEmulator.module.css";

const MobileEmulator = ({ children }: { children: any }) => {
    return (
        <div className={styles.desktopContainer}>
            <div className={styles.mobileContainer}>{children}</div>
        </div>
    );
};

export default MobileEmulator;
