import Link from "next/link";
import styles from "../styles/ExerciseCard.module.css";
import { parseISO } from "date-fns";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useEffect, useState } from "react";
import SingleExerciseCard from "./SingleExerciseCard";

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
    //const [isOpen, setIsOpen] = useState(new Map());
    //const [isEditing, setIsEditing] = useState(new Map());
    // dataMap converts data from an array to a nested map with exercise id as the key, id as nested key
    const dataMap: { [key: string]: any } = {};
    if (data) {
        for (const set of data) {
            const exerciseId = set.exercise_id;
            const setId = set.id;
            if (!dataMap[exerciseId]) {
                dataMap[exerciseId] = {};
            }

            dataMap[exerciseId][setId] = set;
        }
    }
    const [exerciseData, setExerciseData] = useState(dataMap);
    const handleSubmit = (e: any, exerciseId: any, setId: any) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const body: { [key: string]: string | File } = {};
        for (const [key, value] of form.entries()) {
            body[key] = value;
            setExerciseData((prevData) => {
                const updatedDataMap = { ...prevData }; // Create a shallow copy
                updatedDataMap[exerciseId][setId] = {
                    ...updatedDataMap[exerciseId][setId], // Copy the existing item
                    [key]: value, // Update the specific key
                };
                return updatedDataMap; // Return the updated data map
            });
        }
        updateExercise(body, setId);
        //setIsEditing((map) => new Map(map.set(setId, false)));
    };

    useEffect(() => {
        //TODO: a bit inefficient but covers both deletion and insertion
        console.log(exerciseData);
        if (data) {
            for (const set of data) {
                const exerciseId = set.exercise_id;
                const setId = set.id;
                if (!dataMap[exerciseId]) {
                    dataMap[exerciseId] = {};
                }

                dataMap[exerciseId][setId] = set;
            }
        }
        setExerciseData(dataMap);
    }, [data]);

    return (
        <>
            <div className={styles.exerciseContainer}>
                {Object.keys(exerciseData)
                    .reverse()
                    ?.map((exercise) => (
                        <SingleExerciseCard
                            key={exercise}
                            exercise={exerciseData[exercise]}
                            handleDelete={handleDelete}
                            handleSubmit={handleSubmit}
                        />
                    ))}
            </div>
        </>
    );
};

export default ExerciseCards;
