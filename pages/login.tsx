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
            <div className="container" style={{ padding: "50px 0 100px 0" }}>
                {!session ? (
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        theme="dark"
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </>
    );
};

export default Login;
