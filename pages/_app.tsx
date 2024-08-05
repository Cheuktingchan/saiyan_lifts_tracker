import "../styles/globals.css";
import type { AppProps } from "next/app";
import styles from "../styles/Navbar.module.css";
import { supabaseUtil } from "../utils/supabaseUtil";
import { useEffect, useState } from "react";
import {
    SessionContextProvider,
    useSession,
} from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
    const [supabase] = useState(() => createBrowserSupabaseClient());

    return (
        <>
            <SessionContextProvider
                supabaseClient={supabase}
                initialSession={pageProps.initialSession}
            >
                <Component {...pageProps} />
            </SessionContextProvider>
            <footer
                style={{
                    backgroundColor: "#8e3f9b",
                    position: "fixed",
                    bottom: "0px",
                    left: "0px",
                    right: "0px",
                    height: "64px",
                    marginBottom: "0px",
                    borderTop: "2px solid black",
                    justifyContent: "space-between",
                }}
            >
                <ul
                    className={styles.navContent}
                    style={{ padding: "0", margin: "0", float: "right" }}
                >
                    <Link href="/analytics">
                        <button className={styles.buttons}>
                            Your<br></br>Exercises
                        </button>
                    </Link>
                </ul>
            </footer>
        </>
    );
}
