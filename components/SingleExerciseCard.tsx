import styles from "../styles/ExerciseCard.module.css";
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
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

const SingleExerciseCard = ({
    exercise,
    handleDelete,
    handleSubmit,
}: {
    exercise: any;
    handleDelete: any;
    handleSubmit: any;
}) => {
    const firstSet = exercise[Object.keys(exercise)[0]];
    const thisExerciseId = firstSet.exercise_id;
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div key={thisExerciseId} className={styles.container}>
            <p className={styles.title}>
                {" "}
                Exercise: {""}
                {exercise[firstSet.id].title}
            </p>
            {isOpen && (
                <>
                    {Object.keys(exercise)?.map((set) => (
                        <>
                            {!isEditing ? (
                                <>
                                    <p className={styles.load}>
                                        {" "}
                                        Load (kg): {"  "}
                                        {exercise[set]["loads"]}
                                    </p>
                                    <p className={styles.reps}>
                                        Reps:{exercise[set]["reps"]}
                                    </p>
                                    <p className={styles.time}>
                                        {format(
                                            parseISO(
                                                exercise[set]["inserted_at"]
                                            ),
                                            "dd/MM/yy"
                                        )}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <form
                                        onSubmit={(event) => {
                                            handleSubmit(
                                                event,
                                                thisExerciseId,
                                                set
                                            );
                                            setIsEditing(false);
                                        }}
                                    >
                                        <p className={styles.load}>
                                            {" "}
                                            Load (kg): {""}
                                            <input
                                                style={{
                                                    width: "25%",
                                                }}
                                                type="number"
                                                name="loads"
                                                className={styles.load}
                                                autoComplete="on"
                                                list="suggestions"
                                                defaultValue={
                                                    exercise[set]["loads"]
                                                }
                                            />
                                        </p>
                                        <p className={styles.reps}>
                                            {" "}
                                            Reps: {""}
                                            <input
                                                style={{
                                                    width: "25%",
                                                }}
                                                type="number"
                                                name="reps"
                                                className={styles.reps}
                                                autoComplete="on"
                                                list="suggestions"
                                                defaultValue={
                                                    exercise[set]["reps"]
                                                }
                                            />
                                        </p>
                                        <p className={styles.time}>
                                            {format(
                                                parseISO(
                                                    exercise[set]["inserted_at"]
                                                ),
                                                "dd/MM/yy"
                                            )}
                                        </p>
                                        <button type="submit">Submit</button>
                                    </form>
                                </>
                            )}
                        </>
                    ))}
                </>
            )}
            <div
                style={{
                    height: "28px",
                    position: "absolute",
                    left: "-14px",
                    top: "-14px",
                    border: "2px solid black",
                    backgroundColor: "red",
                    borderRadius: "5px",
                }}
                onClick={() =>
                    !isEditing ? setIsEditing(true) : setIsEditing(false)
                }
            >
                <FiEdit />
            </div>
            <div
                style={{
                    height: "28px",
                    position: "absolute",
                    right: "-14px",
                    top: "-14px",
                    border: "2px solid black",
                    backgroundColor: "red",
                    borderRadius: "5px",
                }}
                onClick={() => handleDelete(thisExerciseId)}
            >
                <BsTrash />
            </div>
            <div
                style={{
                    height: "28px",
                    position: "absolute",
                    top: "0.5rem",
                    right: "1rem",
                }}
                onClick={() => (!isOpen ? setIsOpen(true) : setIsOpen(false))}
            >
                {!isOpen ? <GoTriangleDown /> : <GoTriangleUp />}
            </div>
        </div>
    );
};

export default SingleExerciseCard;
