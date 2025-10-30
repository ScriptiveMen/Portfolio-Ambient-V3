import { useEffect, useRef, useState } from "react";

const skillsData = [
    {
        _id: "1",
        title: "AI and Generative AI",
        icon: "ri-robot-2-line",
        content: [
            { section: "LangChain", _id: "1-1" },
            { section: "LangGraph", _id: "1-2" },
            { section: "LLMs", _id: "1-3" },
            { section: "Retrieval-Augmented Generation (RAG)", _id: "1-4" },
            { section: "MCP Server", _id: "1-5" },
        ],
    },
    {
        _id: "2",
        title: "Frontend Development",
        icon: "ri-javascript-line",
        content: [
            { section: "HTML, CSS, JavaScript", _id: "2-1" },
            { section: "React.js", _id: "2-2" },
            { section: "Redux Toolkit", _id: "2-3" },
            { section: "Tailwind CSS", _id: "2-4" },
            { section: "GSAP", _id: "2-5" },
            { section: "PWA (Progressive Web Apps)", _id: "2-6" },
            { section: "Ejs", _id: "2-7" },
        ],
    },
    {
        _id: "3",
        title: "Backend Development",
        icon: "ri-server-fill",
        content: [
            { section: "Node.js", _id: "3-1" },
            { section: "Express.js", _id: "3-2" },
            { section: "REST API Development", _id: "3-3" },
            { section: "JWT Authentication", _id: "3-4" },
            { section: "Socket.IO", _id: "3-5" },
        ],
    },
    {
        _id: "4",
        title: "Databases & Vector Stores",
        icon: "ri-database-2-fill",
        content: [
            { section: "MongoDB", _id: "4-1" },
            { section: "Pinecone (Vector DB)", _id: "4-2" },
            { section: "MySQL", _id: "4-3" },
        ],
    },
    {
        _id: "5",
        title: "DevOps & Deployment",
        icon: "ri-cloud-line",
        content: [
            { section: "Docker", _id: "5-1" },
            { section: "Microservices Architecture", _id: "5-2" },
            { section: "AWS (Amazon Web Services)", _id: "5-3" },
        ],
    },
    {
        _id: "6",
        title: "Version Control",
        icon: "ri-git-branch-line",
        content: [{ section: "Git & Github", _id: "6-1" }],
    },
    {
        _id: "7",
        title: "Tools & Utilities",
        icon: "ri-tools-fill",
        content: [
            { section: "Vercel", _id: "7-1" },
            { section: "Render", _id: "7-2" },
            { section: "Postman", _id: "7-3" },
            { section: "Jest", _id: "7-4" },
            { section: "Autocannon", _id: "7-5" },
        ],
    },
];

function AccordionItem({ skill }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const toggleAccordion = () => {
        setOpen(!open);

        // Update Locomotive Scroll after animation completes
        setTimeout(() => {
            if (window.locomotiveScroll) {
                window.locomotiveScroll.update();
            }
        }, 750); // Match the transition duration
    };

    return (
        <div className="border-b border-gray-700 py-6">
            <button
                onClick={toggleAccordion}
                className="flex w-full justify-between items-center cursor-pointer"
            >
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-md bg-[#14281D] flex items-center justify-center">
                        <i
                            className={`${skill.icon} text-2xl text-[#3BE698]`}
                        ></i>
                    </div>
                    <h2 className="text-white select-none text-lg md:text-4xl font-semibold">
                        {skill.title}
                    </h2>
                </div>
                <div className="expand flex items-center justify-center gap-2">
                    <span className="hidden md:inline font-semibold">
                        Expand
                    </span>
                    <i
                        className={`ri-arrow-down-s-line text-2xl text-white transition-transform duration-500 ${
                            open ? "rotate-180" : ""
                        }`}
                    ></i>
                </div>
            </button>
            <div
                ref={ref}
                className="overflow-hidden transition-all duration-700 pl-9"
                style={{
                    maxHeight: open ? ref.current?.scrollHeight : 0,
                }}
            >
                <div className="pt-7">
                    {skill.content.map((section, idx) => (
                        <div key={idx} className="mb-3 w-[95%] m-auto">
                            <h3 className="text-white text-md md:text-2xl font-semibold">
                                {section.section}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function SkillsAccordion() {
    const [skills] = useState(skillsData);

    // Update locomotive scroll on mount
    useEffect(() => {
        setTimeout(() => {
            if (window.locomotiveScroll) {
                window.locomotiveScroll.update();
            }
        }, 100);
    }, []);

    return (
        <div className="flex flex-col items-center py-10">
            <div className="w-full md:w-[90%] space-y-3">
                {skills.map((skill, idx) => (
                    <AccordionItem key={idx} skill={skill} />
                ))}
            </div>
        </div>
    );
}
