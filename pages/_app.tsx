import "../styles/globals.css";
import type { AppProps } from "next/app";
import { supabase } from "../utils/supabase";
import { useEffect, useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function App({ Component, pageProps }: AppProps) {
    const [supabase] = useState(() => createBrowserSupabaseClient());
    return (
        <SessionContextProvider
            supabaseClient={supabase}
            initialSession={pageProps.initialSession}
        >
            <Component {...pageProps} />
        </SessionContextProvider>
    );
}
