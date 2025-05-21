import {useEffect,useState} from "react";

type Responsibility = {
    "module": string;
    details: string[];
};

type Project = {
    project_name: string;
    duration: string;
    location: string;
    technologies: string[];
    responsibilities: Responsibility[];

};

type ExperienceItem = {
    company: string;
    role: string;
    period: string;
    project: Project[];
};

export default function Experience() {
    const [show, setShow] = useState(false);
    const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
    const [visibleCompanies, setVisibleCompanies] = useState<Set<string>>(new Set());
    const [openProjects, setOpenProjects] = useState<Record<string, Set<number>>>({});

    useEffect(() => {
        handleToggle();
    }, []);

    const handleToggle = async () => {
        if (!show && visibleCompanies.size === 0) {
            const res = await fetch("data/experience/experience.ko.json");
            const data = await res.json();
            setExperiences(data);

            // 각 회사를 열어둠
            const initialVisibleCompanies = new Set<string>();
            data.forEach((exp: ExperienceItem) => {
                initialVisibleCompanies.add(exp.company);
            });
            setVisibleCompanies(initialVisibleCompanies);

            // 모든 프로젝트를 열어둠
            const initialProjects: Record<string, Set<number>> = {};
            data.forEach((exp: ExperienceItem) => {
                initialProjects[exp.company] = new Set(exp.project.map((_, idx) => idx));
            });
            setOpenProjects(initialProjects);
        }
        setShow(!show);
    };

    const handleCompanyClick = (company: string) => {
        setVisibleCompanies((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(company)) {
                newSet.delete(company);
            } else {
                newSet.add(company);
            }
            return newSet;
        });
    };

    const toggleProject = (company: string, index: number) => {
        setOpenProjects((prev) => {
            const currentSet = prev[company] ? new Set<number>(prev[company]) : new Set<number>();
            if (currentSet.has(index)) {
                currentSet.delete(index);
            } else {
                currentSet.add(index);
            }
            return {...prev, [company]: currentSet};
        });
    };


    return (
        <section id="experience" className="mb-32">
            <h3
                className="text-2xl font-semibold mb-4 text-teal-400 cursor-pointer"
                onClick={handleToggle}
            >
                {show ? "▲" : "▼"} Experience
            </h3>

            {show &&
                experiences.map((exp, idx) =>
                    <div key={idx} className="mb-8">
                        <div
                            className="cursor-pointer text-lg font-semibold text-white hover:text-teal-400"
                            onClick={() => handleCompanyClick(exp.company)}
                        >
                            {visibleCompanies.has(exp.company) ? "▲ " : "▼ "}{exp.company}
                            <span className="text-sm text-gray-400 ml-2">
                            ({exp.period})
                             </span>
                        </div>
                        <div className="text-m text-gray-400">{exp.role}</div>

                        {visibleCompanies.has(exp.company) ? (
                            <div className="mt-4 pl-4 border-l border-gray-700 space-y-6">
                                {exp.project.map((project, pIdx) => {
                                    const isOpen =
                                        openProjects[exp.company]?.has(pIdx) ?? true;

                                    return (
                                        <div key={pIdx}>
                                            <div
                                                className="text-white font-medium text-lg cursor-pointer hover:text-teal-300"
                                                onClick={() => toggleProject(exp.company, pIdx)}
                                            >
                                                {project.project_name}
                                                <span className="text-[15px] text-gray-400 ml-2">
                                                  {project.duration} @ {project.location}
                                                </span>
                                            </div>

                                            {isOpen && (
                                                <>
                                                    {project.responsibilities.map((res, rIdx) => (
                                                        <div key={rIdx} className="mt-4">
                                                            <div className="text-[15px] text-gray-300 font-medium">
                                                                <strong>{res["module"]}</strong>
                                                            </div>

                                                            <ul className="list-disc list-inside text-white text-[15px] mt-2 space-y-1">
                                                                {res.details.map((line, idx) => (
                                                                    <li key={idx}>{line}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}

                                                    <div className="flex flex-wrap gap-2 mt-4">
                                                        {project.technologies.map((tech, tIdx) => (
                                                            <span
                                                                key={tIdx}
                                                                className="bg-gray-800 text-teal-300 px-3 py-1 text-xs rounded-full"
                                                            >
                                                              {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <br/>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>
                )}
        </section>
    );
}
