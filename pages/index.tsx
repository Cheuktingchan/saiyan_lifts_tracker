import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabaseUtil";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "./account";
import Navbar from "../components/Navbar";

const Home = () => {
    const session = useSession();
    return (
        <>
            <Navbar session={session}></Navbar>
            <div
                className="container"
                style={{ padding: "50px 0 100px 0" }}
            ></div>
        </>
    );
};

export default Home;
