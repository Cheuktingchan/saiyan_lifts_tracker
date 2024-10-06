import Link from "next/link";
import styles from "../../styles/FakeNavbar.module.css";
import Image from "next/image";

const FakeNavbar = ({ data }: any) => {
    return (
        <div className={styles.container}>
            <Link href="/">
                <Image src="/logo.svg" alt="Logo" height="48" width="48" />
            </Link>
            <div>
                <p className={styles.title}>Saiyan Lifts Tracker</p>{" "}
            </div>
            <ul className={styles.navContent}>
                <Link href="/">
                    <button className={styles.buttons}>Login</button>
                </Link>
            </ul>
        </div>
    );
};

export default FakeNavbar;
