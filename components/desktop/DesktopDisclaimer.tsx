import FakeNavbar from "./FakeNavbar";
import homeStyles from "../../styles/Home.module.css";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

const DesktopDisclaimer = ({ data }: any) => {
    const [qrCodeUrl, setQrCodeUrl] = useState(""); // State to store QR code URL

    useEffect(() => {
        // Generate the QR code when the component mounts
        QRCode.toDataURL("https://saiyan-lifts-tracker.vercel.app/")
            .then((url) => {
                setQrCodeUrl(url); // Set the generated QR code URL in the state
            })
            .catch((err) => {
                console.error("Error generating QR code", err);
            });
    }, []);
    return (
        <>
            <div className="desktopBackground">
                <div className="mobileContainer">
                    <FakeNavbar data={null}></FakeNavbar>
                    <div className={homeStyles.container}>
                        Welcome Lifter. Unfortunately the desktop version is
                        currently unsupported. Please visit this site on your
                        phone browser, or scan the following QR code which will
                        take you there.
                    </div>
                    <div
                        className={homeStyles.container}
                        style={{
                            marginTop: "3rem",
                        }}
                    >
                        <img src={qrCodeUrl} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DesktopDisclaimer;
