import Link from "next/link";
import styles from "../styles/ExerciseCard.module.css";
import { parseISO } from "date-fns";
import { format } from "date-fns";
import { NextRouter } from "next/router";
import { BsTrash } from "react-icons/bs";

const UserExerciseCards = ({
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
                    <Link href={`/analytics/${item.id}`}>
                        <p className={styles.title}>
                            {" "}
                            Exercise: {""}
                            {item.title}
                        </p>
                    </Link>

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
                        onClick={() => handleDelete(item.id)}
                    >
                        <BsTrash />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserExerciseCards;
