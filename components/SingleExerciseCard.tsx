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
            <p className={styles.title}> {exercise[firstSet.id].title}</p>
            {isOpen && (
                <table
                    style={{
                        width: "60%",
                        textAlign: "center",
                        borderCollapse: "collapse",
                        fontSize: "1rem",
                        marginBottom: "20px",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ padding: "10px" }}></th>
                            <th style={{ padding: "10px" }}>kg</th>
                            <th style={{ padding: "10px" }}>reps</th>
                            <th style={{ padding: "10px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(exercise)?.map((set, index) => (
                            <tr key={set}>
                                {!isEditing.get(set) ? (
                                    // Non-editable state (view mode)
                                    <>
                                        <td>{index + 1}</td>
                                        <td>
                                            <input
                                                disabled={true}
                                                style={{
                                                    width: "60%",
                                                    margin: "auto",
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
                                        </td>
                                        <td>
                                            <input
                                                disabled={true}
                                                style={{
                                                    width: "60%",
                                                    margin: "auto",
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
                                        </td>
                                        <td>
                                            <button
                                                key={set}
                                                style={{
                                                    height: "28px",
                                                    width: "28px",
                                                    border: "2px solid black",
                                                    backgroundColor: "#e7e5e8",
                                                    borderRadius: "5px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    padding: "0px",
                                                }}
                                                onClick={() =>
                                                    !isEditing.get(set)
                                                        ? setIsEditing(
                                                              (map) =>
                                                                  new Map(
                                                                      map.set(
                                                                          set,
                                                                          true,
                                                                      ),
                                                                  ),
                                                          )
                                                        : setIsEditing(
                                                              (map) =>
                                                                  new Map(
                                                                      map.set(
                                                                          set,
                                                                          false,
                                                                      ),
                                                                  ),
                                                          )
                                                }
                                            >
                                                <FiEdit
                                                    size={24}
                                                    color="black"
                                                />
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    // Editable state (form mode)
                                    <>
                                        <td>{index + 1}</td>
                                        <td>
                                            <form
                                                id={set}
                                                onSubmit={(event) => {
                                                    handleSubmit(
                                                        event,
                                                        thisExerciseId,
                                                        set,
                                                    );
                                                    setIsEditing(
                                                        (map) =>
                                                            new Map(
                                                                map.set(
                                                                    set,
                                                                    false,
                                                                ),
                                                            ),
                                                    );
                                                }}
                                            >
                                                <input
                                                    style={{
                                                        width: "60%",
                                                        margin: "auto",
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
                                            </form>
                                        </td>
                                        <td>
                                            <input
                                                form={set}
                                                style={{
                                                    width: "60%",
                                                    margin: "auto",
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
                                        </td>
                                        <td>
                                            <button
                                                type="submit"
                                                form={set}
                                                style={{
                                                    height: "28px",
                                                    width: "28px",
                                                    border: "2px solid black",
                                                    backgroundColor: "#e7e5e8",
                                                    borderRadius: "5px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    padding: "0px",
                                                }}
                                            >
                                                <FiSave
                                                    size={24}
                                                    color="black"
                                                />
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
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
