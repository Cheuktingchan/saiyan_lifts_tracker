import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "./account";
import Navbar from "../components/Navbar";

const Home = () => {
    const session = useSession();
    return (
        <>
            <Navbar session={session}></Navbar>
            <div className="container"></div>
        </>
    );
};

export default Home;
