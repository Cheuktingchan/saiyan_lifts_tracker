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
import ExerciseCards from "../components/ExerciseCards";
import Link from "next/link";
import CycleCards from "../components/CycleCards";
import UserExerciseCards from "../components/UserExerciseCards";

const Exercises = () => {
    const supabase = useSupabaseClient();
    const session = useSession();
    const user = useUser();
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [exercises, setExercises] = useState<any[] | null>([]); // list of exercises
    const [loading, setLoading] = useState(true);

    const { workout_id } = router.query;

    async function getExercises() {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from("sets")
                .select(`*`)
                .eq("user_created", user?.id)
                .order("inserted_at", { ascending: false });
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setExercises(data);
            }
        } catch (error) {
            console.log("No exercises");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const getExercisesFromWorkout = async () => {
            if (router.isReady) {
                let { data } = await supabase.from("user_exercise").select(`*`);
                setExercises(data);
            }
        };
        getExercisesFromWorkout();
    }, [workout_id, router.isReady, router.query, loading, supabase]);

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
    }, [session, router, supabase, user?.id, workout_id, supabase]);

    const handleDelete = async (id: number) => {
        try {
            const { data, error } = await supabase
                .from("user_exercise")
                .delete()
                .eq("id", id);
            getExercises();
            if (error) throw error;
        } catch (error: any) {
            console.log(error.message);
        }
    };
    return (
        <>
            <Navbar session={session}></Navbar>
            {username ? (
                <div className={styles.container}>Hello {username}.</div>
            ) : (
                <div className={styles.container}>
                    Welcome lifter. Go to account and enter your details!
                </div>
            )}
            <div className={styles.container}>
                <Link href={`/create/new_user_exercise`}>
                    <button
                        className={styles.button}
                        style={{
                            position: "fixed",
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
            </div>
            <div className={styles.container}>
                {exercises?.length === 0 ? (
                    <div>
                        <p>There are no exercises yet</p>
                    </div>
                ) : (
                    <div className={styles.container}>
                        <p>User exercises:</p>
                        <UserExerciseCards
                            data={exercises}
                            handleDelete={handleDelete}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Exercises;
