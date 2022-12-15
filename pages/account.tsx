// From: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
import { useState, useEffect } from "react";
import {
    useUser,
    useSupabaseClient,
    useSession,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function Account() {
    const supabase = useSupabaseClient();
    const session = useSession();

    const user = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [bodyweight, setBodyweight] = useState(null);
    const [squat, setSquat] = useState(null);
    const [bench, setBench] = useState(null);
    const [deadlift, setDeadlift] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        getProfile();
    }, [session]);

    useEffect(() => {
        getProfile();
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from("profiles")
                .select(
                    `username, bodyweight, squat, bench, deadlift, avatar_url`
                )
                .eq("id", user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
                setBodyweight(data.bodyweight);
                setSquat(data.squat);
                setBench(data.bench);
                setDeadlift(data.deadlift);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            router.push("/login");
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({
        username,
        bodyweight,
        squat,
        bench,
        deadlift,
        avatar_url,
    }) {
        try {
            setLoading(true);

            const updates = {
                id: user.id,
                username,
                bodyweight,
                squat,
                bench,
                deadlift,
                avatar_url,
                updated_at: new Date().toISOString(),
            };

            let { error } = await supabase.from("profiles").upsert(updates);
            if (error) throw error;
            alert("Profile updated!");
        } catch (error) {
            alert("Error updating the data!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar session={session}></Navbar>
            <div>
                {session ? (
                    <div className="form-widget">
                        <div>
                            <label htmlFor="email">Email: </label>
                            <input
                                id="email"
                                type="text"
                                value={session.user.email}
                                disabled
                            />
                        </div>
                        <div>
                            <label htmlFor="username">Username: </label>
                            <input
                                id="username"
                                type="text"
                                value={username || ""}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="bodyweight">Bodyweight: </label>
                            <input
                                id="bodyweight"
                                type="bodyweight"
                                value={bodyweight || ""}
                                onChange={(e) => setBodyweight(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="squat">Squat: </label>
                            <input
                                id="squat"
                                type="squat"
                                value={squat || ""}
                                onChange={(e) => setSquat(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="bench">Bench: </label>
                            <input
                                id="bench"
                                type="bench"
                                value={bench || ""}
                                onChange={(e) => setBench(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="deadlift">Deadlift: </label>
                            <input
                                id="deadlift"
                                type="deadlift"
                                value={deadlift || ""}
                                onChange={(e) => setDeadlift(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                className="button primary block"
                                onClick={() =>
                                    updateProfile({
                                        username,
                                        bodyweight,
                                        squat,
                                        bench,
                                        deadlift,
                                        avatar_url,
                                    })
                                }
                                disabled={loading}
                            >
                                {loading ? "Loading ..." : "Update"}
                            </button>
                        </div>

                        <div>
                            <button
                                className="button block"
                                onClick={() => supabase.auth.signOut()}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    );
}
