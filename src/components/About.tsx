import {useEffect, useState} from 'react';

interface AboutProps {
    title: string;
    data: string[];
}

export default function About() {
    const [show, setShow] = useState(true);
    const [content, setContent] = useState<AboutProps>();

    useEffect(() => {
        aboutData();
    }, []);

    const aboutData = async () => {
        const res = await fetch("data/about/about.ko.json");
        const data = await res.json();
        setContent(data);
    }

    const handleToggle = () => {
        setShow(!show);
    };

    if (!content) {
        return;
    }

    return (
        <section id="about" className="mb-25 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-4 text-teal-400 cursor-pointer" onClick={handleToggle}>{show ? "▲" : "▼"} {content.title}</h3>
            {show && (<>
                {content.data.map((paragraph, index) => (
                    <p key={index}
                       className="text-gray-300 mb-4 leading-relaxed"> {/* Added mb-4 for spacing between paragraphs and leading-relaxed for better readability */}
                        {paragraph}
                    </p>
                ))}
            </>)}
        </section>
    );
};
