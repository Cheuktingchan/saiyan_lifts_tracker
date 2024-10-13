import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import WorkoutCards from "../../components/WorkoutCards";
import Link from "next/link";

const Workouts = () => {
    const supabase = useSupabaseClient();
    const session = useSession();
    const user = useUser();
    const router = useRouter();
    const [cycleName, setCycleName] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [workouts, setWorkouts] = useState<any[] | null>([]); // list of workouts
    const [loading, setLoading] = useState(true);

    const { cycle_id } = router.query;

    async function getWorkouts() {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from("workouts")
                .select(`*`)
                .eq("user_created", user?.id)
                .order("inserted_at", { ascending: false });
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
        const getWorkoutsFromCycle = async () => {
            if (router.isReady) {
                let { data } = await supabase
                    .from("workouts")
                    .select(`*`)
                    .filter("cycle_id", "eq", cycle_id)
                    .order("created_at", { ascending: false });
                setWorkouts(data);
            }
        };
        getWorkoutsFromCycle();
    }, [cycle_id, router.isReady, router.query, loading, supabase]);

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
        async function getCycleName() {
            try {
                setLoading(true);
                if (router.isReady) {
                    let { data, error, status } = await supabase
                        .from("cycles")
                        .select(`title`)
                        .eq("id", cycle_id)
                        .single();
                    if (error && status !== 406) {
                        throw error;
                    }

                    if (data) {
                        setCycleName(data.title);
                    }
                }
            } catch (error) {
                console.log("No cycle");
                setLoading(false);
            }
        }
        getCycleName();
    }, [session, router, supabase, user?.id, cycle_id, supabase]);

    const handleDelete = async (id: number) => {
        try {
            const { data, error } = await supabase
                .from("workouts")
                .delete()
                .eq("id", id)
                .eq("user_created", user?.id);
            getWorkouts();
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
                    Here are the workouts from &quot;{cycleName}&quot;
                </div>
            ) : (
                <div className={styles.container}>
                    Welcome lifter. Go to account and enter your details!
                </div>
            )}
            <div className={styles.container}></div>
            <div className={styles.container}>
                {workouts?.length === 0 ? (
                    <div>
                        <p>There are no workouts yet</p>
                    </div>
                ) : (
                    <div className={styles.container}>
                        <p>Workouts:</p>
                        <WorkoutCards
                            data={workouts}
                            handleDelete={handleDelete}
                        />
                    </div>
                )}
            </div>
            <Link href={`/create/new_workout/${cycle_id}`}>
                <button
                    className={styles.button}
                    style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        bottom: "0px",
                        zIndex: "100",
                        background: "transparent",
                    }}
                >
                    <Image
                        src="/1starball.svg"
                        alt="Logo"
                        height="75"
                        width="75"
                    />
                </button>
            </Link>
        </>
    );
};

export default Workouts;
