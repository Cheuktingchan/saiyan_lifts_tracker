import styles from "../../styles/Home.module.css";
import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ExerciseCards from "../../components/ExerciseCards";
import NewExerciseButton from "../../components/NewExerciseButton";

const Exercises = () => {
    const supabase = useSupabaseClient();
    const session = useSession();
    const user = useUser();
    const router = useRouter();
    const [workoutName, setWorkoutName] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [exercises, setExercises] = useState<any[] | null>([]); // list of exercises
    const [loading, setLoading] = useState(true);
    const emptyList: any[] = [];
    const [userExerciseList, setUserExerciseList] = useState(emptyList);

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
                let { data } = await supabase
                    .from("sets")
                    .select(`*`)
                    .filter("workout_id", "eq", workout_id)
                    .order("inserted_at", { ascending: false });
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
        async function getWorkoutName() {
            try {
                setLoading(true);

                let { data, error, status } = await supabase
                    .from("workouts")
                    .select(`title`)
                    .eq("id", workout_id)
                    .single();
                if (error && status !== 406) {
                    throw error;
                }

                if (data) {
                    setWorkoutName(data.title);
                }
            } catch (error) {
                console.log("No workout");
                setLoading(false);
            }
        }
        getWorkoutName();
    }, [session, router, supabase, user?.id, workout_id, supabase]);

    const handleDelete = async (id: number) => {
        try {
            const { data, error } = await supabase
                .from("sets")
                .delete()
                .eq("id", id)
                .eq("user_id", user?.id);
            getExercises();
            if (error) throw error;
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const updateExercise = async (body: any, itemId: any) => {
        const { data } = await supabase
            .from("sets")
            .update({
                loads: body["loads"],
                reps: body["reps"],
                sets: body["sets"],
            })
            .eq("id", itemId)
            .eq("user_id", user?.id);
        getExercises();
    };

    const createExercise = async (body: any) => {
        var thisExerciseId = -1;
        var rowsToInsert = [];

        try {
            const { data, error, status } = await supabase
                .from("sets")
                .insert({
                    title: body["title"],
                    loads: body["loads"],
                    reps: body["reps"],
                    user_id: user?.id,
                    workout_id: workout_id,
                    set_num: 1,
                })
                .select("*")
                .single();
            if (data) {
                console.log(data);
                thisExerciseId = data.exercise_id;
                for (var i = 1; i < body["sets"]; i++) {
                    rowsToInsert.push({
                        title: body["title"],
                        loads: body["loads"],
                        reps: body["reps"],
                        user_id: user?.id,
                        workout_id: workout_id,
                        exercise_id: thisExerciseId,
                        set_num: i + 1,
                    });
                }
                const { data: restOfData, error: restOfError } = await supabase
                    .from("sets")
                    .insert(rowsToInsert);
                console.log(restOfError);
            }
            if (error && status !== 406) {
                throw error;
            }
        } catch (error: any) {
            console.log(error);
        }
        getExercises(); // TODO: inefficient
    };

    async function getUserExercises() {
        try {
            let { data, error, status } = await supabase
                .from("user_exercise")
                .select(`title`)
                .eq("user_created", user?.id);
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                let data_str = [];
                for (let i = 0; i < data.length; i++) {
                    data_str.push(data[i].title);
                }
                setUserExerciseList(data_str);
            }
        } catch (error) {
            console.log(error);
        }
    }
    getUserExercises();
    return (
        <>
            <Navbar session={session}></Navbar>
            {username ? (
                <div className={styles.container}>
                    Here are the exercises from &quot;{workoutName}&quot;
                </div>
            ) : (
                <div className={styles.container}>
                    Welcome lifter. Go to account and enter your details!
                </div>
            )}
            <div className={styles.container}>
                <NewExerciseButton
                    userExercises={userExerciseList}
                    createExercise={createExercise}
                ></NewExerciseButton>
            </div>
            <div className={styles.container}>
                {exercises?.length === 0 ? (
                    <div>
                        <p>There are no exercises yet</p>
                    </div>
                ) : (
                    <div className={styles.container}>
                        <p>Here are your exercises:</p>
                        <ExerciseCards
                            data={exercises}
                            handleDelete={handleDelete}
                            updateExercise={updateExercise}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Exercises;
