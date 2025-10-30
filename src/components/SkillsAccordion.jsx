import { useEffect, useRef, useState } from "react";

const skillsData = [
    {
        _id: "1",
        title: "AI and Generative AI",
        icon: "ri-robot-2-line",
        content: [
            { section: "LangChain" },
            { section: "LangGraph" },
            { section: "LLMs" },
            { section: "Retrieval-Augmented Generation (RAG)" },
            { section: "MCP Server" },
        ],
    },
    {
        _id: "2",
        title: "Frontend Development",
        icon: "ri-javascript-line",
        content: [
            { section: "HTML, CSS, JavaScript" },
            { section: "React.js" },
            { section: "Redux Toolkit" },
            { section: "Tailwind CSS" },
            { section: "GSAP" },
            { section: "PWA (Progressive Web Apps)" },
            { section: "Ejs" },
        ],
    },
    {
        _id: "3",
        title: "Backend Development",
        icon: "ri-server-fill",
        content: [
            { section: "Node.js" },
            { section: "Express.js" },
            { section: "REST API Development" },
            { section: "JWT Authentication" },
            { section: "Socket.IO" },
        ],
    },
    {
        _id: "4",
        title: "Databases & Vector Stores",
        icon: "ri-database-2-fill",
        content: [
            { section: "MongoDB" },
            { section: "Pinecone (Vector DB)" },
            { section: "MySQL" },
        ],
    },
    {
        _id: "5",
        title: "DevOps & Deployment",
        icon: "ri-cloud-line",
        content: [
            { section: "Docker" },
            { section: "Microservices Architecture" },
            { section: "AWS (Amazon Web Services)" },
        ],
    },
    {
        _id: "6",
        title: "Version Control",
        icon: "ri-git-branch-line",
        content: [{ section: "Git & Github" }],
    },
    {
        _id: "7",
        title: "Tools & Utilities",
        icon: "ri-tools-fill",
        content: [
            { section: "Vercel" },
            { section: "Render" },
            { section: "Postman" },
            { section: "Jest" },
            { section: "Autocannon" },
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
