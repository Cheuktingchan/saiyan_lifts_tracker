import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CycleCards from "../components/CycleCards";

const Home = () => {
    const supabase = useSupabaseClient();
    const session = useSession();
    const user = useUser();
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [workouts, setWorkouts] = useState<any[]>([]); // list of workouts
    const [loading, setLoading] = useState(true);

    async function getCycles() {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from("cycles")
                .select("*")
                .order("created_at", { ascending: true });
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setWorkouts(data);
            }
        } catch (error) {
            console.log("No workouts");
        } finally {
            setLoading(false);
        }
    }

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
                setUsername("User");
            } finally {
                setLoading(false);
            }
        }

        getCycles();
        getUsername();
    }, [session, router, supabase, user?.id]);

    const handleDelete = async (id: number) => {
        try {
            const { data, error } = await supabase
                .from("cycles")
                .delete()
                .eq("id", id)
                .eq("user_created", user?.id);
            getCycles();
            if (error) throw error;
        } catch (error: any) {
            console.log(error.message);
        }
    };

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
            <div className={styles.container}>
                <Link href="/create/new_cycle/">
                    <button
                        className={styles.button}
                        style={{
                            textAlign: "center",
                            marginTop: "5%",
                            marginBottom: "5%",
                        }}
                    >
                        <Image
                            src="/1starball.svg"
                            alt="Logo"
                            height="100"
                            width="100"
                        />
                    </button>
                </Link>
            </div>
            <div className={styles.container}>
                {workouts?.length === 0 ? (
                    <div>
                        <p>There are no cycles yet</p>
                    </div>
                ) : (
                    <div className={styles.container}>
                        <p>Cycles:</p>
                        <CycleCards
                            data={workouts}
                            handleDelete={handleDelete}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
