import {useEffect, useState} from "react";

interface RoleItem {
    type: string;
    details: string[];
}

interface MemberItem {
    name: string;
    role: string;
}

interface ProjectItem {
    id: number;
    title: string;
    description: string;
    stack: string[];
    imageUrl?: string;
    liveUrl: string;
    githubUrl: {
        frontend: string;
        backend: string;
    };
    period: string;
    members: MemberItem[];
    role: RoleItem[];
}

export default function Projects() {
    const [show, setShow] = useState(false);
    const [projects, setProjects] = useState<ProjectItem[]>([]);

    useEffect(() => {
        handleToggle();
    }, []);

    const handleToggle = async () => {
        if (!show && projects.length === 0) {
            const res = await fetch("data/projects/projects.ko.json");
            const data = await res.json();
            setProjects(data.projects);
        }
        setShow(!show);
    };

    return (
        <section id="projects" className="mb-32 scroll-mt-20">
            <h3
                className="text-2xl font-semibold mb-4 text-teal-400 cursor-pointer"
                onClick={handleToggle}
            >
                {show ? "▲" : "▼"} Projects
            </h3>

            {show &&
                projects.map((project) => (
                    <div key={project.id} className="mb-8">
                        <div className="bg-[#1e293b] rounded-lg p-6 shadow-md hover:shadow-lg transition">
                            <div className="text-white font-bold text-lg">
                                {project.title}
                                <span className="text-sm text-gray-400 ml-2">({project.period})</span>
                            </div>
                            <div className="text-gray-300 mt-1">{project.description}</div>

                            <div className="mt-2 text-sm text-gray-400">
                                <strong>Members :</strong>
                                {project.members.map((member, idx) => (
                                    <div key={idx} className="ml-2">
                                        - {member.name} ({member.role})
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                {project.role.map((role, idx) => (
                                    <div key={idx} className="mb-4">
                                        <div className="text-teal-300 font-medium">{role.type}</div>
                                        <ul className="list-disc list-inside text-white text-sm mt-2 space-y-1">
                                            {role.details.map((line, lIdx) => (
                                                <li key={lIdx}>{line}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.stack.map((tech, tIdx) => (
                                    <span
                                        key={tIdx}
                                        className="bg-gray-800 text-teal-300 px-3 py-1 text-xs rounded-full"
                                    >
                  {tech}
                </span>
                                ))}
                            </div>

                            <div className="text-sm text-gray-400 mt-2">
                                🔗 <a href={project.liveUrl} className="text-teal-400 hover:underline"
                                     target="_blank">Live</a> |
                                <a href={project.githubUrl.frontend} className="text-teal-400 hover:underline ml-2"
                                   target="_blank">Frontend</a> |
                                <a href={project.githubUrl.backend} className="text-teal-400 hover:underline ml-2"
                                   target="_blank">Backend</a>
                            </div>
                        </div>
                    </div>
                ))}
        </section>
    );
}
