import { useState } from "react";
import styles from "../../../styles/Create.module.css";
import { useRouter } from "next/router";
import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import Navbar from "../../../components/Navbar";

const CreateNewWorkout = () => {
    const session = useSession();
    const initialState = {
        title: "Workout",
    };
    const supabase = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const [workoutData, setWorkoutData] = useState(initialState);

    const { title } = workoutData;
    const { cycle_id } = router.query;
    const handleChange = (e: any) => {
        setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
    };

    const createWorkout = async () => {
        const { data, error, status } = await supabase
            .from("workouts")
            .insert({
                title,
                user_created: user?.id,
                cycle_id: cycle_id,
            })
            .single();

        setWorkoutData(initialState);
        router.push(`/cycle/${cycle_id}`);
    };

    return (
        <>
            <Navbar session={session}></Navbar>
            <div className={styles.container}>
                <div className={styles.form}>
                    <p className={styles.title}>Create a New Workout</p>
                    <label className={styles.label}>Workout:</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Enter a title"
                    />
                    <button className={styles.button} onClick={createWorkout}>
                        Create Workout
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreateNewWorkout;
