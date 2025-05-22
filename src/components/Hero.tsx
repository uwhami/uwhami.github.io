import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {FaBloggerB, FaGithub} from "react-icons/fa";

interface HeroContent {
    greeting: string;
    name: string;
    description: string;
    links: {
        github: string;
        blog: string;
    };
}

export default function Hero() {
    const [content, setContent] = useState<HeroContent | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch("data/hero/hero.ko.json");
                const data = await res.json();
                setContent(data);
                setMounted(true);
            } catch (err) {
                console.error("Failed to load hero content:", err);
            }
        };

        fetchContent();
    }, []);

    if (!content) return null;

    return (
        <section className="mt-10 mb-25 px-4 max-w-5xl mx-auto scroll-mt-20" id="hero">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={mounted ? {opacity: 1, y: 0} : {}}
                transition={{duration: 0.8}}
            >
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                    {/* 프로필 이미지 */}
                    <div className="flex flex-col items-center">
                        <img
                            src="/profile.jpeg"
                            alt="Profile"
                            className="w-35 h-35 md:w-40 md:h-40 object-cover rounded-full shadow-md"
                        />

                        {/* 깃헙 및 블로그 */}
                        <div className="flex mt-4 space-x-4">
                            <a href={content.links.github} target="_blank" rel="noopener noreferrer">
                                <FaGithub size={25}/>
                            </a>
                            <a href={content.links.blog} target="_blank" rel="noopener noreferrer">
                                <FaBloggerB size={25}/>
                            </a>
                        </div>
                    </div>
                    {/* 이름 및 소개글 */}
                    <div>
                        <p className="text-teal-400 text-lg">{content.greeting}</p>
                        <h2 className="text-4xl font-bold mt-2">{content.name}</h2>
                        <p className="mt-4 text-lg text-gray-300">{content.description}</p>
                    </div>
                </div>

            </motion.div>
        </section>
    );
}
