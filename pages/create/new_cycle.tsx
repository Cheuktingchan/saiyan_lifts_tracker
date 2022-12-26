import { useState } from "react";
import styles from "../../styles/Create.module.css";
import { useRouter } from "next/router";
import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import Navbar from "../../components/Navbar";

const CreateNewCycle = () => {
    const session = useSession();
    const initialState = {
        title: "Cycle",
    };
    const supabase = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const [cycleData, setCycleData] = useState(initialState);

    const { title } = cycleData;

    const handleChange = (e: any) => {
        setCycleData({ ...cycleData, [e.target.name]: e.target.value });
    };

    const createCycle = async () => {
        const { data, error, status } = await supabase
            .from("cycles")
            .insert({
                title,
                user_created: user?.id,
            })
            .single();

        setCycleData(initialState);
        router.push("/");
    };

    return (
        <>
            <Navbar session={session}></Navbar>
            <div className={styles.container}>
                <div className={styles.form}>
                    <p className={styles.title}>Create a New Cycle</p>
                    <label className={styles.label}>Cycle:</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Enter a title"
                    />
                    <button className={styles.button} onClick={createCycle}>
                        Create Cycle
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreateNewCycle;
