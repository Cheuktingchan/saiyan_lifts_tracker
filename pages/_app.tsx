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
import Link from "next/link";
import DesktopDisclaimer from "../components/desktop/DesktopDisclaimer";
import { BsBarChart } from "react-icons/bs";

export default function App({ Component, pageProps }: AppProps) {
    const [supabase] = useState(() => createBrowserSupabaseClient());
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const updateMedia = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        updateMedia();
        window.addEventListener("resize", updateMedia);

        return () => {
            window.removeEventListener("resize", updateMedia);
        };
    }, []);

    return (
        <>
            {isDesktop ? (
                <DesktopDisclaimer />
            ) : (
                <>
                    <SessionContextProvider
                        supabaseClient={supabase}
                        initialSession={pageProps.initialSession}
                    >
                        <Component {...pageProps} />
                    </SessionContextProvider>
                    <footer
                        style={{
                            backgroundColor: "white",
                            position: "fixed",
                            bottom: "0px",
                            left: "0px",
                            right: "0px",
                            height: "64px",
                            marginBottom: "0px",
                            justifyContent: "space-between",
                        }}
                    >
                        <ul
                            className={styles.login}
                            style={{
                                padding: "0",
                                margin: "0",
                                border: "0",
                                right: "20px",
                                height: "auto",
                                bottom: "20px",
                            }}
                        >
                            <Link href="/analytics">
                                <button
                                    className={styles.buttons}
                                    style={{
                                        right: "20px",
                                        height: "auto",
                                    }}
                                >
                                    <BsBarChart size={35} />
                                </button>
                            </Link>
                        </ul>
                    </footer>
                </>
            )}
        </>
    );
}
