import Link from "next/link";
import styles from "../../styles/FakeNavbar.module.css";
import Image from "next/image";
import { BsBoxArrowInRight } from "react-icons/bs";

const FakeNavbar = ({ data }: any) => {
    return (
        <div className={styles.container}>
            <div></div>
            <div>
                <Link href="/">
                    <button className={styles.login}>
                        <BsBoxArrowInRight size={35} />
                    </button>
                </Link>
            </div>
            <Link href="/" className={styles.logo}>
                <Image src="/logo.svg" alt="Logo" height="100" width="100" />
            </Link>
        </div>
    );
};

export default FakeNavbar;
