import { useRef } from "react";
import GlowText from "../components/GlowText";
import WorkCard from "../components/WorkCard";

const projectsData = [
    {
        thumbnail:
            "https://ik.imagekit.io/mfac8dwut/Portfolio-Ambient-V3/Orin%20Ai%20Thumbnail?updatedAt=1761819795814",
        year: 2025,
        role: "Full Stack",
        title: "Orin AI Chatbot",
        link: "https://orin-ai.onrender.com",
    },
    {
        thumbnail:
            "https://ik.imagekit.io/mfac8dwut/Portfolio-Ambient-V3/K72%20Web%20UI%20Thumbnail%20?updatedAt=1761819825764",
        year: 2025,
        role: "Frontend",
        title: "k72 Web UI",
        link: "https://k72-ca-frontend-ui.onrender.com",
    },
];

const Works = () => {
    const sectionRef = useRef(null);
    const imagesLoadedCountRef = useRef(0);

    const handleImageLoaded = () => {
        imagesLoadedCountRef.current += 1;

        if (window.locomotiveScroll) {
            window.locomotiveScroll.update();
        }

        if (imagesLoadedCountRef.current === projectsData.length) {
            setTimeout(() => {
                if (window.locomotiveScroll) {
                    window.locomotiveScroll.update();
                }
            }, 100);
        }
    };

    const transformProjectsToWorkData = (projects) => {
        if (!projects || projects.length === 0) {
            return [];
        }

        const rows = [];
        let currentRow = [];
        let rowIndex = 0;

        projects.forEach((project, index) => {
            const card = {
                wrapperClass: getWrapperClass(index),
                image: project.thumbnail || "/images/comingsoon.webp",
                year: project.year.toString(),
                role: project.role,
                title: project.title,
                link: project.link,
                onImageLoad: handleImageLoaded,
            };

            currentRow.push(card);

            const shouldEndRow =
                (rowIndex % 3 === 0 && currentRow.length === 2) ||
                (rowIndex % 3 === 1 && currentRow.length === 1) ||
                (rowIndex % 3 === 2 && currentRow.length === 2) ||
                index === projects.length - 1; // Last project

            if (shouldEndRow) {
                rows.push({
                    rowClass: getRowClass(rowIndex),
                    cards: [...currentRow],
                });
                currentRow = [];
                rowIndex++;
            }
        });

        return rows;
    };

    const getWrapperClass = (index) => {
        const mod = index % 5;
        // Pattern for 5 projects: large, small, medium, large, small
        if (mod === 0) {
            return "relative w-full md:w-[55%] aspect-[1/1] overflow-hidden rounded-3xl md:rounded-4xl";
        } else if (mod === 1) {
            return "relative w-full md:w-[32%] aspect-[5/5] overflow-hidden rounded-3xl md:rounded-4xl";
        } else if (mod === 2) {
            return "relative w-full md:w-[50%] aspect-[1/1] overflow-hidden rounded-4xl";
        } else if (mod === 3) {
            return "relative w-full md:w-[55%] aspect-[2/2] overflow-hidden rounded-3xl md:rounded-4xl";
        } else {
            return "relative w-full md:w-[32%] aspect-[5/5] overflow-hidden rounded-3xl md:rounded-4xl";
        }
    };

    const getRowClass = (rowIndex) => {
        const mod = rowIndex % 3;
        if (mod === 0) {
            return "flex md:flex-row flex-col justify-start md:gap-50 gap-10 px-5 py-5 md:py-10 items-end";
        } else if (mod === 1) {
            return "flex md:flex-row flex-col justify-center md:gap-50 gap-10 px-5 py-5 md:py-10 items-end";
        } else {
            return "flex flex-col md:flex-row-reverse justify-start md:gap-50 gap-10 px-5 py-5 md:py-10 items-end";
        }
    };

    const workData = transformProjectsToWorkData(projectsData);

    return (
        <div
            id="work"
            data-scroll-section
            ref={sectionRef}
            className="w-full pt-25 pb-10"
        >
            <div className="heading pb-10 md:pb-20 flex flex-col items-baseline justify-start">
                <span className="md:text-[1.5vw] font-semibold text-[4.5vw] flex items-center gap-3 leading-7 tracking-tight">
                    <div className="dash h-0.5 bg-white w-10"></div>
                    What I do
                </span>
                <GlowText title={"Work Samples."} />
            </div>

            {workData.map((row, idx) => (
                <div key={idx} className={`row${idx + 1} ${row.rowClass}`}>
                    {row.cards.map((card, cardIdx) => (
                        <WorkCard key={cardIdx} card={card} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Works;
