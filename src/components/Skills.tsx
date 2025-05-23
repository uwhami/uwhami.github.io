import {useEffect, useState} from "react";
import {FaCertificate} from "react-icons/fa";
import {HiCalendar, HiDocumentDuplicate} from "react-icons/hi";

interface LanguageSkill {
    name: string;
    certificate: string;
    grade: string;
    description: string;
    testDate: string;
    serial: string;
    detailReport: boolean;
}

interface SkillData {
    frontend: string[];
    backend: string[];
    learning: string[];
    languages: LanguageSkill[];
}

export default function Skills() {
    const [show, setShow] = useState(true);
    const [skills, setSkills] = useState<SkillData | null>(null);

    useEffect(() => {
        const fetchSkills = async () => {
            const res = await fetch("data/skills/skills.ko.json");
            const data = await res.json();
            setSkills(data.skills);
        };

        fetchSkills();
    }, []);

    if (!skills) return null;

    const handleToggle = async () => {
        setShow(!show);
    };

    return (
        <section id="skills" className="mb-20 scroll-mt-20">
            <h2 className="text-2xl font-semibold mb-4 text-teal-400 cursor-pointer" onClick={handleToggle}
            >
                {show ? "▲" : "▼"}Skills
            </h2>

            {show && (<>
                {/* 기술 스택 */}
                <div className="max-w-screen-lg mx-auto px-4 py-8">
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Frontend</h4>
                            <ul className="text-gray-300 list-disc list-inside">
                                {skills.frontend.map((tech, idx) => (
                                    <li key={idx}>{tech}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Backend</h4>
                            <ul className="text-gray-300 list-disc list-inside">
                                {skills.backend.map((tech, idx) => (
                                    <li key={idx}>{tech}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Learning</h4>
                            <ul className="text-gray-300 list-disc list-inside">
                                {skills.learning.map((tech, idx) => (
                                    <li key={idx}>{tech}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* 언어 능력 */}
                <div>
                    <h3 className="text-2xl font-semibold text-teal-300 mb-4">Languages</h3>
                    {skills.languages.map((lang, idx) => (
                        <div key={idx} className="bg-gray-800 rounded-lg p-6 shadow-md mb-4">
                            <div className="flex items-center mb-4">
                                <FaCertificate className="text-yellow-400 w-6 h-6 mr-2"/>
                                <span className="text-white font-semibold text-lg">
                                   {lang.certificate} / {lang.name}
                                </span>
                            </div>

                            <div className="bg-gray-700 rounded p-4 mb-4">
                                <span className="text-2xl font-bold text-white">{lang.grade}</span>
                                <span className="text-gray-300 ml-2">({lang.description})</span>
                            </div>

                            <ul className="text-sm text-gray-300 space-y-1">
                                <li className="flex items-center gap-2">
                                    <HiCalendar className="text-gray-400"/>
                                    시험일: {lang.testDate}
                                </li>
                                {/*<li className="flex items-center gap-2">*/}
                                {/*    <HiDocumentDuplicate className="text-gray-400"/>*/}
                                {/*    수험번호: {lang.serial}*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                    ))}
                </div>
            </>)}
        </section>
    );
}
