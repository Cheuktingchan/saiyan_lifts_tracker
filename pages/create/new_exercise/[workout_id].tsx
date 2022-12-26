import { useState } from "react";
import styles from "../../../styles/Create.module.css";
import { useRouter } from "next/router";
import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import Navbar from "../../../components/Navbar";

const CreateNewExercise = () => {
    const session = useSession();
    const initialState = {
        title: "",
        loads: "",
        reps: "",
        sets: "",
    };
    const supabase = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const [exerciseData, setExerciseData] = useState(initialState);

    const { title, loads, reps, sets } = exerciseData;
    const { workout_id } = router.query;
    const handleChange = (e: any) => {
        setExerciseData({ ...exerciseData, [e.target.name]: e.target.value });
    };

    const createExercise = async () => {
        const { data, error, status } = await supabase
            .from("exercises")
            .insert({
                title,
                loads,
                reps,
                sets,
                user_id: user?.id,
                workout_id: workout_id,
            })
            .single();
        setExerciseData(initialState);
        router.push("/");
    };

    return (
        <>
            <Navbar session={session}></Navbar>
            <div className={styles.container}>
                <div className={styles.form}>
                    <p className={styles.title}>Create a New Exercise</p>
                    <label className={styles.label}>Exercise:</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Enter a title"
                    />
                    <label className={styles.label}>Load (kg):</label>
                    <input
                        type="text"
                        name="loads"
                        value={loads}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Enter weight load"
                    />
                    <label className={styles.label}>Reps:</label>
                    <input
                        type="text"
                        name="reps"
                        value={reps}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Enter number of reps"
                    />
                    <label className={styles.label}>Sets:</label>
                    <input
                        type="text"
                        name="sets"
                        value={sets}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Enter number of sets"
                    />
                    <button className={styles.button} onClick={createExercise}>
                        Create Exercise
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreateNewExercise;
