import {useEffect, useState} from "react";
import {FaGithub} from "react-icons/fa";

interface RoleItem {
    type: string;
    details: string[];
}

interface MemberItem {
    name: string;
    role: string;
}

interface AccountItem {
    id: string;
    password: string;
}

interface ProjectItem {
    id: number;
    title: string;
    description: string;
    stack: { Backend: string[], Frontend: string[], Tools: string[] };
    imageUrl?: string;
    liveUrl: string;
    githubUrl: {
        frontend: string;
        backend: string;
    };
    period: string;
    members: MemberItem[];
    role: RoleItem[];
    demoAccounts: AccountItem[];
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
        <section id="projects" className="mb-25 scroll-mt-20">
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

                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4">

                                {/* 좌측: SURVEY MATE 로고 버튼 */}
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                    <img src="images/survey-mate-login.png"
                                         className="w-full max-w-[230px] h-auto"
                                         alt="Surveymate login"

                                    />
                                </a>

                                {/* 우측: Live / GitHub 링크 */}
                                <div className="flex flex-col text-[0.95rem] text-gray-400 gap-1">
                                    {/* Live 보기 */}
                                    <a
                                        href="https://djsurveymate.duckdns.org"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-teal-400 hover:underline flex items-center gap-1"
                                    >
                                        👉 <span className="font-medium">Live 서비스 바로가기</span>
                                    </a>

                                    {/* GitHub 보기 */}
                                    <div className="flex items-center gap-2">
                                        <FaGithub size={18} className="text-white"/>
                                        <a
                                            href={project.githubUrl.backend}
                                            className="text-teal-400 hover:underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Backend
                                        </a>
                                        <span className="text-gray-500">|</span>
                                        <a
                                            href={project.githubUrl.frontend}
                                            className="text-teal-400 hover:underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Frontend
                                        </a>
                                    </div>

                                    <br/>

                                    {project.demoAccounts && (
                                        <div className="text-sm text-gray-400 mt-2 space-y-1">
                                            🔐 <span className="font-semibold text-white">체험용 계정 안내:</span>
                                            {project.demoAccounts.map((acc, idx) => (
                                                <div key={idx} className="text-white text-sm">
                                                    ID: <code className="text-teal-300">{acc.id}</code> / PW: <code
                                                    className="text-teal-300">{acc.password}</code>
                                                </div>
                                            ))}
                                            <div className="mt-1">
                                                <span className="text-gray-300">♣ 위 계정으로 로그인 후 자유롭게 둘러보세요.</span>
                                                <p><br/></p>
                                                <p className="text-white underline">※ 현재 EC2 서버에 문제가 발생해 홈페이지 접속이 일시적으로 중단되었습니다.</p>
                                                <p className="text-white underline">2025년 5월 27일 안으로 복구를 마칠 예정이며, 빠르게 정상화하겠습니다.</p>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>

                            <div className="mt-2 text-sm text-gray-400">
                                <strong>Built by :</strong>
                                {project.members.map((member, idx) => (
                                    <div key={idx} className="ml-2">
                                        - {member.name} ({member.role})
                                    </div>
                                ))}
                            </div>


                            <div className="mt-8">
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

                            <div className="space-y-4 mt-6 p-4 rounded-lg bg-[#1e293b]/60 border border-gray-700">
                                {Object.entries(project.stack).map(([category, techList]) => (
                                    <div key={category}>
                                        <h5 className="text-sm font-semibold text-gray-400 mb-2">{category}</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {techList.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-[#21252f] text-teal-300 text-xs px-3 py-1 rounded-full shadow-sm"
                                                >
                                                   {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                ))}
        </section>
    );
}
