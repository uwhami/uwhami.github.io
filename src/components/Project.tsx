import {useEffect, useState} from "react";

export type ProjectItem = {
    title: string;
    authors: string[];
    technologies: string[];
    description: string;
    responsibilities: string[];
    deployment: string;
};
export default function ProjectSection() {
    const [projects, setProjects] = useState<ProjectItem[]>([]);

    useEffect(() => {
        fetch("data/projects.json")
            .then((res) => res.json())
            .then(setProjects);
    }, []);

    return (
        <section id="projects" className="mb-32">
            <h3 className="text-2xl font-semibold mb-4 text-teal-400">Projects</h3>
            <div className="grid md:grid-cols-1 gap-6">
                {projects.map((p, idx) => (
                        <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition" key={idx} {...p}>
                            <h4 className="text-xl font-bold text-white mb-2">{p.title}</h4>
                            <p className="text-gray-400 text-sm mb-2">By {p.authors.join(", ")}</p>
                            <p className="text-gray-300 mb-4">{p.description}</p>
                            <ul className="list-disc list-inside text-gray-400 mb-4 space-y-1">
                                {p.responsibilities.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {p.technologies.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-teal-700 text-white text-xs px-3 py-1 rounded-full"
                                    >
            {tech}
          </span>
                                ))}
                            </div>
                            <p className="text-sm text-teal-400">🚀 Deployed: {p.deployment}</p>
                        </div>
                    )
                )}
            </div>
        </section>
    )
        ;
}
