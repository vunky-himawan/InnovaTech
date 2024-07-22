import { useEffect, useRef, useState } from "react";
import Text from "@/utils/textReveal";
import type { CollectionEntry } from "astro:content";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import Card from "./Card";
import { $projectsAtom } from "@/stores/ProjectStore";
import { useStore } from "@nanostores/react";


const ProjectTrending = () => {
    const projects = useStore($projectsAtom);
    const [trendingProjects, setTrendingProjects] = useState<CollectionEntry<"projects">[]>([]);

    useEffect(() => {
        const sortedProjects = [...projects].sort((a, b) => {
            const totalA = a.data.totalLikes + a.data.totalComments;
            const totalB = b.data.totalLikes + b.data.totalComments;
            return totalB - totalA;
        });
        setTrendingProjects(sortedProjects);
    }, [projects]);

    const [project, setProject] = useState<CollectionEntry<"projects"> | null>(null);
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

    useEffect(() => {
        if (trendingProjects.length > 0) {
            setProject(trendingProjects[0]);
            setActiveProjectId(trendingProjects[0].id);
        }
    }, [trendingProjects]);

    const changeProject = (projectId: string) => {
        const selectedProject = trendingProjects.find((p) => p.id === projectId);
        if (selectedProject) {
            setProject(selectedProject);
            setActiveProjectId(projectId);
        }
    };

    return (
        <>
            <section className="bg-white w-screen max-w-[1800px] mx-auto h-fit p-5 flex flex-col gap-15 mt-20">
                <div className="flex flex-col justify-center items-center gap-3 px-5">
                    <div className="bg-blue-5/20 w-10rem md:w-12rem p-3 rounded-full md:py-3 md:px-5">
                        <h1 className="text-blue-500 font-medium text-center md:text-lg">
                            Trending Projects
                        </h1>
                    </div>
                    <Text
                        input="Contribute to and learn from the most exciting open source projects in the tech community."
                        className="font-medium text-center text-xl md:text-3xl"
                        duration={0.03}
                    />
                </div>
                <div className="lg:flex-row 2xl:h-[70vh] landscape:flex-row gap-5 flex flex-col">
                    <AnimatePresence mode="wait">
                        {project && (
                            <motion.div key={project.id} className="flex-1">
                                <Card slug={project.slug} userId={project.data.authorId} cover={project.data.cover} title={project.data.title} description={project.data.description} totalContributors={project.data.totalContributor} totalLikes={project.data.totalLikes} totalComments={project.data.totalComments} link={project.data.github} tags={project.data.tags} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="flex flex-col flex-1 md:grid">
                        {trendingProjects.length > 1 &&
                            trendingProjects.slice(0, 4).map((p) => (
                                <ChangeProjectButton
                                    key={p.id}
                                    active={activeProjectId === p.id}
                                    projectId={p.id}
                                    projectTitle={p.data.title}
                                    setter={changeProject}
                                />
                            ))}
                    </div>
                </div>
            </section>
        </>
    );
};

type ChangeProjectButtonProps = {
    projectId: string;
    projectTitle: string;
    setter: (projectId: string) => void;
    active?: boolean;
};

const ChangeProjectButton = ({
    projectId,
    projectTitle,
    setter,
    active,
}: ChangeProjectButtonProps) => {
    return (
        <button
            className={`${active ? "bg-gray-blue font-semibold" : "border-b"
                } p-5 text-left rounded-lg md:text-xl`}
            onClick={() => setter(projectId)}
        >
            <p>{projectTitle}</p>
        </button>
    );
};

export default ProjectTrending;
