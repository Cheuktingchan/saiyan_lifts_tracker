import { useState } from "react";
import styles from "../../styles/Create.module.css";
import { useRouter } from "next/router";
import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import Navbar from "../../components/Navbar";

const CreateNewUserExercise = () => {
    const session = useSession();
    const initialState = {
        title: "Exercise",
    };
    const supabase = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const [exerciseData, setExerciseData] = useState(initialState);

    const { title } = exerciseData;

    const handleChange = (e: any) => {
        setExerciseData({ ...exerciseData, [e.target.name]: e.target.value });
    };

    const createExercise = async () => {
        const { data, error, status } = await supabase
            .from("user_exercise")
            .insert({
                title,
                user_created: user?.id,
            })
            .single();
        setExerciseData(initialState);
        router.push("/analytics");
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
                    <button className={styles.button} onClick={createExercise}>
                        Create Exercise
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreateNewUserExercise;
