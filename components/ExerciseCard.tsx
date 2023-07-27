import Link from "next/link";
import styles from "../styles/ExerciseCard.module.css";
import { parseISO } from "date-fns";
import { format } from "date-fns";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useState } from "react";

const ExerciseCard = ({
    data,
    handleDelete,
}: {
    data: any[] | null;
    handleDelete: any;
}) => {
    const [isOpen, setIsOpen] = useState(new Map());
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
                            <p className={styles.load}>
                                {" "}
                                Load(kg): {"  "}
                                {item.loads}
                            </p>
                            <p className={styles.reps}>Reps:{item.reps}</p>
                            <p className={styles.reps}>Sets:{item.sets}</p>
                            <p className={styles.time}>
                                {format(parseISO(item.inserted_at), "dd/MM/yy")}
                            </p>
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
                    >
                        <Link href={`/edit/${item.id}`}>
                            <FiEdit />
                        </Link>
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

export default ExerciseCard;
