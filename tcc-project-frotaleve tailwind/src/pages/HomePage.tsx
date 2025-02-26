import Header from "../components/ui/header";
import maerskLogo from "../assets/Maersk.png";
import Footer from "@/components/ui/footer";

export function HomePage() {
    const socialLinks = [
        { name: "LinkedIn", url: "https://www.linkedin.com" },
        { name: "Facebook", url: "https://www.facebook.com" },
        { name: "Instagram", url: "https://www.instagram.com" },
        { name: "YouTube", url: "https://www.youtube.com" },
        { name: "Twitter", url: "https://www.twitter.com" },
    ];

    const policyLinks = [
        { name: "Cookie Policy", url: "/cookie-policy" },
        { name: "Cookie Preferences", url: "/cookie-preferences" },
    ];

    return (
        <div>
            <Header image={maerskLogo} />

            <Footer socialLinks={socialLinks} policyLinks={policyLinks} />
        </div>
    );
}