import { useEffect, useState } from "react";
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
    const emptyList: any[] = [];
    const supabase = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const [exerciseData, setExerciseData] = useState(initialState);
    const [userExerciseList, setUserExerciseList] = useState(emptyList);
    const [errorMessage, setErrorMessage] = useState("");
    const { title, loads, reps, sets } = exerciseData;
    const { workout_id } = router.query;
    const handleChange = (e: any) => {
        setExerciseData({ ...exerciseData, [e.target.name]: e.target.value });
    };

    const createExercise = async () => {
        if (userExerciseList.includes(exerciseData.title)) {
            setErrorMessage("");
            try {
                const { data, error, status } = await supabase
                    .from("sets")
                    .insert({
                        title,
                        loads,
                        reps,
                        sets,
                        user_id: user?.id,
                        workout_id: workout_id,
                    })
                    .single();
                if (error && status !== 406) {
                    throw error;
                }
                setExerciseData(initialState);
                router.push(`/workout/${workout_id}`);
            } catch (error: any) {
                if (error.code == "22P02") {
                    setErrorMessage("Non numerical input detected");
                }
            }
        } else {
            setErrorMessage("No such exercise!");
        }
    };

    async function getExercises() {
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
    useEffect(() => {
        getExercises();
    }, []);
    return (
        <>
            <Navbar session={session}></Navbar>
            <div className={styles.container}>
                <div className={styles.form}>
                    <p className={styles.title}>Create a New Exercise</p>
                    <label className={styles.label}>Exercise:</label>
                    <datalist id="suggestions" className={styles.input}>
                        {userExerciseList.map(function (d) {
                            return <option key={d}>{d}</option>;
                        })}
                    </datalist>
                    <input
                        type="text"
                        name="title"
                        className={styles.input}
                        placeholder="Search exercise"
                        autoComplete="on"
                        list="suggestions"
                        onChange={handleChange}
                    />
                    <label className={styles.label}>Load (kg):</label>
                    <input
                        type="text"
                        name="loads"
                        value={loads}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Enter weight load (kg)"
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
                <p
                    style={{
                        color: "#DC143C",
                        marginBlockEnd: "0",
                    }}
                >
                    {errorMessage}
                </p>
            </div>
        </>
    );
};

export default CreateNewExercise;
