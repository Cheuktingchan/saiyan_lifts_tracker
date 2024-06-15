import Link from "next/link";
import styles from "../styles/ExerciseCard.module.css";
import { parseISO } from "date-fns";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useEffect, useState } from "react";

// ExerciseCards is designed to hold all the cards per page rather than just being one card
const ExerciseCards = ({
    data,
    handleDelete,
    updateExercise,
}: {
    data: any[] | null;
    handleDelete: any;
    updateExercise: any;
}) => {
    const [isOpen, setIsOpen] = useState(new Map());
    const [isEditing, setIsEditing] = useState(new Map());
    // dataMap converts data from an array to a map with id as the key
    const dataMap: { [key: string]: any } = {};
    if (data) {
        for (const workout of data) {
            dataMap[workout.id] = workout;
        }
    }
    const [exerciseData, setExerciseData] = useState(dataMap);
    const handleSubmit = (e: any, itemId: any) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const body: { [key: string]: string | File } = {};
        for (const [key, value] of form.entries()) {
            body[key] = value;
            setExerciseData((prevData) => {
                const updatedDataMap = { ...prevData }; // Create a shallow copy
                updatedDataMap[itemId] = {
                    ...updatedDataMap[itemId], // Copy the existing item
                    [key]: value, // Update the specific key
                };
                return updatedDataMap; // Return the updated data map
            });
        }
        updateExercise(body, itemId);
        setIsEditing((map) => new Map(map.set(itemId, false)));
    };

    useEffect(() => {
        if (data) {
            setExerciseData((prevData) => {
                const updatedDataMap = { ...prevData }; // Create a shallow copy
                updatedDataMap[data[0]["id"]] = {
                    ...updatedDataMap[data[0]["id"]], // Copy the existing item
                    ["loads"]: data[0]["loads"],
                    ["reps"]: data[0]["reps"],
                    ["sets"]: data[0]["sets"],
                };
                return updatedDataMap; // Return the updated data map
            });
        }
    }, [data]);
    return (
        <div className={styles.exerciseContainer}>
            {data?.map((item) => (
                <div key={item.id} className={styles.container}>
                    <p className={styles.title}>
                        {" "}
                        Exercise: {""}
                        {item.title}
                    </p>
                    {isOpen.get(item.id) && (
                        <>
                            {!isEditing.get(item.id) ? (
                                <>
                                    <p className={styles.load}>
                                        {" "}
                                        Load (kg): {"  "}
                                        {exerciseData[item.id]["loads"]}
                                    </p>
                                    <p className={styles.reps}>
                                        Reps:{exerciseData[item.id]["reps"]}
                                    </p>
                                    <p className={styles.sets}>
                                        Sets:{exerciseData[item.id]["sets"]}
                                    </p>
                                    <p className={styles.time}>
                                        {format(
                                            parseISO(item.inserted_at),
                                            "dd/MM/yy"
                                        )}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <form
                                        onSubmit={(event) =>
                                            handleSubmit(event, item.id)
                                        }
                                    >
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
                                                autoComplete="on"
                                                list="suggestions"
                                                defaultValue={item.loads}
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
                                                autoComplete="on"
                                                list="suggestions"
                                                defaultValue={item.reps}
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
                                                autoComplete="on"
                                                list="suggestions"
                                                defaultValue={item.sets}
                                            />
                                        </p>
                                        <p className={styles.time}>
                                            {format(
                                                parseISO(item.inserted_at),
                                                "dd/MM/yy"
                                            )}
                                        </p>
                                        <button type="submit">Submit</button>
                                    </form>
                                </>
                            )}
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
                            !isEditing.get(item.id)
                                ? setIsEditing(
                                      (map) => new Map(map.set(item.id, true))
                                  )
                                : setIsEditing(
                                      (map) => new Map(map.set(item.id, false))
                                  )
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
                        onClick={() => handleDelete(item.id)}
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
                        onClick={() =>
                            !isOpen.get(item.id)
                                ? setIsOpen(
                                      (map) => new Map(map.set(item.id, true))
                                  )
                                : setIsOpen(
                                      (map) => new Map(map.set(item.id, false))
                                  )
                        }
                    >
                        {!isOpen.get(item.id) ? (
                            <GoTriangleDown />
                        ) : (
                            <GoTriangleUp />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExerciseCards;
