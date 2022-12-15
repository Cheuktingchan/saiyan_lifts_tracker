import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = ({ session }) => {
    const supabase = useSupabaseClient();
    console.log(session);
    return (
        <div className={styles.container}>
            <div>
                <p className={styles.title}>Mini Lifts Tracker</p>
            </div>
            {session ? (
                <ul className={styles.navContent}>
                    <Link href="/">
                        <li className={styles.name}>Home</li>
                    </Link>

                    <button
                        className={styles.buttons}
                        onClick={() => supabase.auth.signOut()}
                    >
                        Logout
                    </button>
                    <Link href="/create">
                        <button className={styles.buttons}>
                            Create New Workout
                        </button>
                    </Link>
                </ul>
            ) : (
                <ul className={styles.navContent}>
                    <Link href="/account">
                        <li className={styles.buttons}>Account</li>
                    </Link>
                    <Link href="/login">
                        <li className={styles.buttons}>Login</li>
                    </Link>
                </ul>
            )}
        </div>
    );
};

export default Navbar;
