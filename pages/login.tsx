import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

const Login = () => {
    const session = useSession();
    const supabase = useSupabaseClient();
    const router = useRouter();

    if (session) {
        router.push("/");
    }
    return (
        <>
            <Navbar session={session}></Navbar>
            <div
                className="container"
                style={{ padding: "50px 50px 100px 50px" }}
            >
                {!session ? (
                    <Auth
                        supabaseClient={supabase}
                        appearance={{
                            theme: ThemeSupa,
                            variables: {
                                default: {
                                    colors: {
                                        brand: "#1c4595",
                                        brandAccent: "#1c4595",
                                    },
                                },
                            },
                            style: {
                                button: {
                                    fontFamily: "Monofonto",
                                    fontSize: "1.5rem",
                                },
                                container: {
                                    fontFamily: "Monofonto",
                                    fontSize: "1.5rem",
                                },
                                label: {
                                    fontFamily: "Monofonto",
                                    fontSize: "1.5rem",
                                    color: "black",
                                },
                            },
                        }}
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </>
    );
};

export default Login;
