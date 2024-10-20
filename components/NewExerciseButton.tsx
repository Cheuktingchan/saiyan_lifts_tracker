import styles from "../styles/ExerciseCard.module.css";
import homeStyles from "../styles/Home.module.css";
import { parseISO } from "date-fns";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/router";
import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import Image from "next/image";

const NewExerciseButton = ({
    userExercises,
    createExercise,
}: {
    userExercises: any;
    createExercise: any;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const body: { [key: string]: string | File } = {};
        for (const [key, value] of form.entries()) {
            body[key] = value;
        }
        if (userExercises.includes(body["title"])) {
            createExercise(body);
        }
        setIsOpen(false);
    };
    return (
        <>
            {isOpen ? (
                <div className={styles.exerciseContainer}>
                    <div className={styles.container}>
                        <>
                            <form onSubmit={handleSubmit}>
                                <datalist
                                    id="suggestions"
                                    className={styles.input}
                                >
                                    {userExercises.map(function (d: any) {
                                        return <option key={d}>{d}</option>;
                                    })}
                                </datalist>
                                <p className={styles.title}>
                                    {" "}
                                    Exercise: {""}
                                    <input
                                        style={{
                                            fontSize: "1rem",
                                            width: "25%",
                                        }}
                                        type="text"
                                        name="title"
                                        autoComplete="on"
                                        list="suggestions"
                                        className={styles.title}
                                    />
                                </p>
                                <p className={styles.load}>
                                    {" "}
                                    Load (kg): {""}
                                    <input
                                        style={{
                                            fontSize: "1rem",
                                            width: "25%",
                                        }}
                                        type="number"
                                        name="loads"
                                        className={styles.load}
                                    />
                                </p>
                                <p className={styles.reps}>
                                    {" "}
                                    Reps: {""}
                                    <input
                                        style={{
                                            fontSize: "1rem",
                                            width: "25%",
                                        }}
                                        type="number"
                                        name="reps"
                                        className={styles.reps}
                                    />
                                </p>
                                <p className={styles.sets}>
                                    {" "}
                                    Sets: {""}
                                    <input
                                        style={{
                                            fontSize: "1rem",
                                            width: "25%",
                                        }}
                                        type="number"
                                        name="sets"
                                        className={styles.sets}
                                    />
                                </p>
                                <button type="submit">Submit</button>
                            </form>
                        </>
                        <div
                            style={{
                                height: "28px",
                                position: "absolute",
                                left: "0.6rem",
                                top: "0.6rem",
                                border: "2px solid black",
                                backgroundColor: "#e7e5e8",
                                borderRadius: "5px",
                            }}
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            <BsTrash />
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    className={homeStyles.button}
                    style={{
                        position: "fixed",
                        left: "50%",
                        transform: "translateX(-50%)",
                        bottom: "0px",
                        zIndex: "100",
                        background: "transparent",
                    }}
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    <Image
                        src="/1starball.svg"
                        alt="Logo"
                        height="75"
                        width="75"
                    />
                </button>
            )}
        </>
    );
};

export default NewExerciseButton;
