import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import { relative } from "path";
import { BsBoxArrowInRight, BsBoxArrowRight, BsPerson } from "react-icons/bs";

const Navbar = ({ session }: { session: Session | null }) => {
    const supabase = useSupabaseClient();
    return (
        <div className={styles.container}>
            <div></div>
            {session ? (
                <div>
                    <Link href="/account">
                        <button className={styles.account}>
                            <BsPerson size={35} />
                        </button>
                    </Link>
                    <button
                        className={styles.login}
                        onClick={() => supabase.auth.signOut()}
                    >
                        <BsBoxArrowInRight size={35} />
                    </button>
                </div>
            ) : (
                <div className={styles.login}>
                    <Link
                        href="/login"
                        style={{ width: "40px", height: "40px" }}
                    >
                        <BsBoxArrowInRight size={35} />
                    </Link>
                </div>
            )}
            <Link href="/" className={styles.logo}>
                <Image src="/logo.svg" alt="Logo" height="100" width="100" />
            </Link>
        </div>
    );
};

export default Navbar;
