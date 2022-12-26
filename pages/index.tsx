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
import WorkoutCard from "../components/WorkoutCard";

const Home = () => {
    const supabase = useSupabaseClient();
    const session = useSession();
    const user = useUser();
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [exercises, setExercises] = useState<any[]>([]); // list of exercises
    const [loading, setLoading] = useState(true);

    async function getWorkouts() {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from("workouts")
                .select("*")
                .order("created_at", { ascending: false });
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

        getWorkouts();
        getUsername();
    }, [session, router, supabase, user?.id]);

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
                    Welcome {username}. Ready to lift?
                </div>
            ) : (
                <div className={styles.container}>
                    Welcome lifter. Go to account and enter your details!
                </div>
            )}
            <div className={styles.container}>
                <Link href="/create/new_workout">
                    <button
                        className={styles.button}
                        style={{
                            textAlign: "center",
                            marginTop: "5%",
                            marginBottom: "5%",
                        }}
                    >
                        Create New<br></br> Workout
                    </button>
                </Link>
            </div>
            <div className={styles.container}>
                {exercises?.length === 0 ? (
                    <div>
                        <p>There are no workouts yet</p>
                    </div>
                ) : (
                    <div className={styles.container}>
                        <p>Here are your workouts:</p>
                        <WorkoutCard
                            data={exercises}
                            handleDelete={handleDelete}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
