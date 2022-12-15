import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = ({ session }) => {
    const supabase = useSupabaseClient();
    return (
        <div className={styles.container}>
            <div>
                <Link href="/">
                    <p className={styles.title}>Mini Lifts Tracker</p>{" "}
                </Link>
            </div>
            {session ? (
                <ul className={styles.navContent}>
                    <button
                        className={styles.buttons}
                        onClick={() => supabase.auth.signOut()}
                    >
                        Logout
                    </button>
                    <Link href="/account">
                        <li className={styles.buttons}>Account</li>
                    </Link>
                </ul>
            ) : (
                <ul className={styles.navContent}>
                    <Link href="/login">
                        <li className={styles.buttons}>Login</li>
                    </Link>
                </ul>
            )}
        </div>
    );
};

export default Navbar;
