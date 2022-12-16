import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import { relative } from "path";

const Navbar = ({ session }: { session: Session | null }) => {
    const supabase = useSupabaseClient();
    return (
        <div className={styles.container}>
            <Link href="/">
                <Image src="/logo.svg" alt="Logo" height="48" width="48" />
            </Link>
            <div>
                <p className={styles.title}>Saiyan Lifts Tracker</p>{" "}
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
                        <button className={styles.buttons}>Account</button>
                    </Link>
                </ul>
            ) : (
                <ul className={styles.navContent}>
                    <Link href="/login">
                        <button className={styles.buttons}>Login</button>
                    </Link>
                </ul>
            )}
        </div>
    );
};

export default Navbar;
