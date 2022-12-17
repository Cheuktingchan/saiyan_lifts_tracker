import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import Account from "./account";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Home = () => {
    const supabase = useSupabaseClient();
    const session = useSession();
    const user = useUser();
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUsername() {
            try {
                setLoading(true);
                let { data, error, status } = await supabase
                    .from("profiles")
                    .select(`username`)
                    .eq("id", user?.id)
                    .single();

                if (error && status !== 406) {
                    throw error;
                }

                if (data) {
                    setUsername(data.username);
                }
            } catch (error) {
                router.push("/login");
            } finally {
                setLoading(false);
            }
        }

        getUsername();
    }, [session, router, supabase, user?.id]);

    console.log(username);
    return (
        <>
            <Navbar session={session}></Navbar>
            {username ? (
                <div className={styles.container}>
                    Welcome {username}. Ready to lift?
                </div>
            ) : (
                <div className={styles.container}>
                    Welcome lifter. Go to account and enter your details!
                </div>
            )}
        </>
    );
};

export default Home;
