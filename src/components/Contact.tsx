import {useEffect, useState} from "react";

interface HeroContent {
    greeting: string;
    name: string;
    description: string;
    links: {
        github: string;
        blog: string;
        email: string;
    };
}

export default function Contact() {
    const [content, setContent] = useState<HeroContent | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch("data/hero/hero.ko.json");
                const data = await res.json();
                setContent(data);
            } catch (err) {
                console.error("Failed to load hero content:", err);
            }
        };

        fetchContent();
    }, []);

    if (!content) return null;

    return (<section id="contact" className="mb-32 text-center">
        <h3 className="text-2xl font-semibold mb-4 text-teal-400">Contact</h3>
        <p className="text-gray-300 mb-4">Want to work together or say hello?</p>
        <a
            href={content.links.email}
            className="inline-block bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg"
        >
            Say Hello
        </a>
    </section>
    );
}
