import Link from "next/link";
import styles from "../styles/ExerciseCard.module.css";
import { parseISO } from "date-fns";
import { format } from "date-fns";
import { NextRouter } from "next/router";

const WorkoutCard = ({ data, router }: { data: any[]; router: NextRouter }) => {
    console.log(data);
    return (
        <div className={styles.exerciseContainer}>
            {data?.map((item) => (
                <Link href={`/workout/${item.id}`}>
                    <div key={item.id} className={styles.container}>
                        <p className={styles.title}>
                            {" "}
                            Workout: {""}
                            {item.title}
                        </p>
                        <p className={styles.time}></p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default WorkoutCard;
