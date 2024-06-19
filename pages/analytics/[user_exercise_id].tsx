import styles from "../../styles/Home.module.css";
import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LineChart from "../../components/LineChart";
import { format, parseISO } from "date-fns";

const Exercises = () => {
    const supabase = useSupabaseClient();
    const session = useSession();
    const user = useUser();
    const router = useRouter();
    const [userExerciseTitle, setUserExerciseTitle] = useState<string | null>(
        null
    );
    const [username, setUsername] = useState<string | null>(null);
    const [exercises, setExercises] = useState<any[] | null>([]); // list of exercises
    const [chartData, setChartData] = useState<any | null>();
    const [loading, setLoading] = useState(true);

    const { user_exercise_id } = router.query;

    useEffect(() => {
        const getExercisesFromWorkouts = async () => {
            if (router.isReady) {
                let { data } = await supabase
                    .from("sets")
                    .select(`*`)
                    .filter("title", "eq", userExerciseTitle)
                    .order("inserted_at", { ascending: true });
                if (data) {
                    setExercises(data);
                }
            }
        };
        getExercisesFromWorkouts();
    }, [userExerciseTitle]);

    useEffect(() => {
        const getChartData = async () => {
            setChartData({
                labels: exercises?.map((data) =>
                    format(parseISO(data.inserted_at), "dd/MM/yy")
                ),
                datasets: [
                    {
                        label: "1RM Score",
                        data: exercises?.map(
                            (data) => data.loads / (1.0278 - 0.0278 * data.reps) //1RM formula
                        ),
                        backgroundColor: ["#6EB720"],
                        borderColor: "black",
                        color: "black",
                    },
                ],
            });
        };
        getChartData();
    }, [exercises]);

    useEffect(() => {
        async function getUsername() {
            try {
                setLoading(true);
                let { data, error, status } = await supabase
                    .from("profiles")
                    .select(`username`)
                    .eq("id", user?.id)
                    .single();

                if (error && status !== 406) {
                    throw error;
                }

                if (data) {
                    setUsername(data.username);
                }
            } catch (error) {
                router.push("/login");
            } finally {
                setLoading(false);
            }
        }

        async function getUserExerciseTitle() {
            try {
                setLoading(true);
                let { data, error, status } = await supabase
                    .from("user_exercise")
                    .select(`title`)
                    .eq("id", user_exercise_id)
                    .single();

                if (error && status !== 406) {
                    throw error;
                }

                if (data) {
                    setUserExerciseTitle(data.title);
                }
            } catch (error) {
                router.push("/login");
            } finally {
                setLoading(false);
            }
        }
        getUsername();
        getUserExerciseTitle();
    }, [
        router.isReady,
        router.query,
        session,
        router,
        supabase,
        user?.id,
        user_exercise_id,
        supabase,
    ]);

    return (
        <>
            <Navbar session={session}></Navbar>
            {username ? (
                <div className={styles.container}>
                    Here is your progress on <br></br> {userExerciseTitle}:
                    <div
                        style={{
                            margin: "0",
                            top: "50%",
                            left: "50%",
                            position: "absolute",
                            transform: "translate(-50%,-50%)",
                            border: "2px solid black",
                            borderRadius: "5px",
                            padding: "1rem",
                            backgroundColor: "#F9F6EE",
                        }}
                    >
                        {chartData ? <LineChart data={chartData} /> : <></>}
                    </div>
                </div>
            ) : (
                <div className={styles.container}>
                    Welcome lifter. Go to account and enter your details!
                </div>
            )}
        </>
    );
};

export default Exercises;
