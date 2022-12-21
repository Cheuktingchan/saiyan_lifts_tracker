import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Create.module.css";

const Edit = () => {
    const initialState = {
        title: "",
        loads: "",
        reps: "",
        sets: "",
    };
    const supabase = useSupabaseClient();
    const user = useUser();
    const [exercise, setExercise] = useState(initialState);
    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
        const getExercise = async () => {
            if (!id) return;

            const { data } = await supabase
                .from("workouts")
                .select("*")
                .filter("id", "eq", id)
                .single();
            setExercise(data);
        };
        getExercise();
    }, [id]);

    const handleChange = (e: any) => {
        setExercise({
            ...exercise,
            [e.target.name]: e.target.value,
        });
    };

    const updateExercise = async () => {
        const { title, loads, reps, sets } = exercise;
        const { data } = await supabase
            .from("workouts")
            .update({
                title,
                loads,
                reps,
                sets,
            })
            .eq("id", id)
            .eq("user_id", user?.id);

        alert("Exercise updated successfully");

        router.push("/");
    };
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1 className={styles.title}>Edit Exercise</h1>
                <label className={styles.label}> Title:</label>
                <input
                    type="text"
                    name="title"
                    value={exercise?.title}
                    onChange={handleChange}
                    className={styles.input}
                />
                <label className={styles.label}> Load (kg):</label>
                <input
                    type="text"
                    name="loads"
                    value={exercise?.loads}
                    onChange={handleChange}
                    className={styles.input}
                />
                <label className={styles.label}> Reps:</label>
                <input
                    type="text"
                    name="reps"
                    value={exercise?.reps}
                    onChange={handleChange}
                    className={styles.input}
                />
                <label className={styles.label}> Sets:</label>
                <input
                    type="text"
                    name="sets"
                    value={exercise?.sets}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter number of sets"
                />
                <button onClick={updateExercise} className={styles.button}>
                    Update Exercise
                </button>
            </div>
        </div>
    );
};

export default Edit;
