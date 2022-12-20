import Link from "next/link";
import styles from "../styles/ExerciseCard.module.css";
import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";
import { format } from "date-fns";

const ExerciseCard = ({ data }: { data: any[] }) => {
    console.log(data);
    return (
        <div className={styles.exerciseContainer}>
            {data?.map((item) => (
                <div key={item.id} className={styles.container}>
                    <p className={styles.title}>
                        {" "}
                        Exercise: {""}
                        {item.title}
                    </p>
                    <p className={styles.load}>
                        {" "}
                        Load(kg): {"  "}
                        {item.loads}
                    </p>
                    <p className={styles.reps}>Reps:{item.reps}</p>
                    <p className={styles.reps}>Sets:{item.sets}</p>
                    <p className={styles.time}>
                        {format(parseISO(item.inserted_at), "yyyy-MM-dd HH:mm")}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ExerciseCard;
