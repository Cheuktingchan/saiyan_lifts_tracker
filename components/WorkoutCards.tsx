import Link from "next/link";
import styles from "../styles/ExerciseCard.module.css";
import { parseISO } from "date-fns";
import { format } from "date-fns";
import { NextRouter } from "next/router";
import { BsTrash } from "react-icons/bs";

const WorkoutCards = ({
    data,
    handleDelete,
}: {
    data: any[] | null;
    handleDelete: any;
}) => {
    return (
        <div>
            {data?.map((item) => (
                <div
                    key={item.id}
                    className={styles.container}
                    style={{ height: "4em" }}
                >
                    <Link href={`/workout/${item.id}`}>
                        <p className={styles.title}>
                            {" "}
                            Workout: {""}
                            {item.title}
                        </p>
                        <p className={styles.title}>
                            {" "}
                            Date: {""}
                            {format(parseISO(item.created_at), "dd/MM/yy")}
                        </p>
                    </Link>

                    <div
                        style={{
                            height: "28px",
                            position: "absolute",
                            left: "0.6rem",
                            top: "0.6rem",
                            border: "2px solid black",
                            backgroundColor: "red",
                            borderRadius: "5px",
                        }}
                        onClick={() => handleDelete(item.id)}
                    >
                        <BsTrash />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WorkoutCards;
