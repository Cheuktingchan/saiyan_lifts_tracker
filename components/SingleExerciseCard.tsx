import styles from "../styles/ExerciseCard.module.css";
import { parseISO } from "date-fns";
import { format } from "date-fns";
import { FiEdit, FiSave } from "react-icons/fi";
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
    const [isEditing, setIsEditing] = useState(new Map());
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
                            <div style={{ display: "flex" }} key={set}>
                                {!isEditing.get(set) ? (
                                    <>
                                        <div
                                            style={{
                                                height: "28px",
                                                border: "2px solid black",
                                                backgroundColor: "red",
                                                borderRadius: "5px",
                                            }}
                                            onClick={() =>
                                                !isEditing.get(set)
                                                    ? setIsEditing(
                                                          (map) =>
                                                              new Map(
                                                                  map.set(
                                                                      set,
                                                                      true
                                                                  )
                                                              )
                                                      )
                                                    : setIsEditing(
                                                          (map) =>
                                                              new Map(
                                                                  map.set(
                                                                      set,
                                                                      false
                                                                  )
                                                              )
                                                      )
                                            }
                                        >
                                            <FiEdit size={24} />
                                        </div>
                                        <p className={styles.load}>
                                            {" "}
                                            Load (kg): {exercise[set]["loads"]},
                                            Reps: {exercise[set]["reps"]}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <button
                                                type="submit"
                                                form={set}
                                                style={{
                                                    height: "28px",
                                                    width: "28px",
                                                    border: "2px solid black",
                                                    backgroundColor: "red",
                                                    borderRadius: "5px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    padding: "0px",
                                                }}
                                            >
                                                <FiSave
                                                    size={24}
                                                    color={"black"}
                                                />
                                            </button>
                                            <form
                                                id={set}
                                                style={{
                                                    width: "75%",
                                                }}
                                                onSubmit={(event) => {
                                                    handleSubmit(
                                                        event,
                                                        thisExerciseId,
                                                        set
                                                    );
                                                    setIsEditing(
                                                        (map) =>
                                                            new Map(
                                                                map.set(
                                                                    set,
                                                                    false
                                                                )
                                                            )
                                                    );
                                                }}
                                            >
                                                <p className={styles.load}>
                                                    {" "}
                                                    Load (kg):
                                                    <input
                                                        style={{
                                                            width: "20%",
                                                        }}
                                                        type="number"
                                                        name="loads"
                                                        className={styles.load}
                                                        autoComplete="on"
                                                        list="suggestions"
                                                        defaultValue={
                                                            exercise[set][
                                                                "loads"
                                                            ]
                                                        }
                                                    />
                                                    Reps: {""}
                                                    <input
                                                        style={{
                                                            width: "20%",
                                                        }}
                                                        type="number"
                                                        name="reps"
                                                        className={styles.reps}
                                                        autoComplete="on"
                                                        list="suggestions"
                                                        defaultValue={
                                                            exercise[set][
                                                                "reps"
                                                            ]
                                                        }
                                                    />
                                                </p>
                                            </form>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    ))}
                </>
            )}
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
