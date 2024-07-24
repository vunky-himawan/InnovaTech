import { UserData } from "@/data/UserData";
import type { ProjectModel } from "@/models/ProjectModel";
import type { CollectionEntry } from "astro:content";
import { useEffect, useState } from "react";
import Button from "../Button";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import Text from "@/utils/textReveal";

type FeaturedProjectsProps = {
  projects: CollectionEntry<"projects">[];
};

const TopProjects = ({ projects }: FeaturedProjectsProps) => {
  const [project, setProject] = useState<CollectionEntry<"projects">>(
    projects[0]
  );
  const [activeProjectId, setActiveProjectId] = useState<string>(
    projects[0].id
  );

  const changeProject = (projectId: string) => {
    setProject(
      projects.find((p) => p.id === projectId) as CollectionEntry<"projects">
    );
    setActiveProjectId(projectId);
  };

  const scale = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    scale.set(1);
  }, [project, scale]);

  return (
    <>
      <section className="bg-white w-screen max-w-1300px mx-auto h-fit p-5 flex flex-col gap-15 mt-20">
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
            <motion.div key={project.id} className="flex-1">
              <Card slug={project.slug} project={project.data} />
            </motion.div>
          </AnimatePresence>
          <div className="flex flex-col flex-1 md:grid">
            {projects.length > 1 &&
              projects.map((p) => (
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

type CardProps = {
  project: ProjectModel;
  slug: string;
};

const Card = ({ project, slug }: CardProps) => {
  const user = UserData.find((user) => user.userId === project.authorId);

  const scale = useSpring(2, { stiffness: 200, damping: 50 });

  useEffect(() => {
    scale.set(1);
  }, [project, scale]);

  return (
    <>
      <div className="flex 2xl:h-full flex-col bg-gray-blue p-5 rounded-xl gap-3 md:gap-5">
        <h1 className="font-semibold text-2xl md:text-3xl 2xl:line-height-none">
          {project.title}
        </h1>
        <picture className="w-full h-15rem 2xl:h-full md:h-30rem overflow-hidden rounded-lg">
          <motion.img
            style={{ scale }}
            src={`/images/projects/${slug}/${project.cover}`}
            alt=""
            className="rounded-lg w-full h-full object-cover object-center"
          />
        </picture>
        <div className="flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <picture>
              <img
                src={`/images/${user?.profileImage}`}
                alt=""
                className="w-7 h-7 rounded-full"
              />
            </picture>
            <p>{user?.name}</p>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-1 items-center">
              <div className="i-heroicons:heart-20-solid w-5 h-5 text-red-5"></div>
              <p>{project.totalLikes}</p>
            </div>
            <div className="flex gap-1 items-center">
              <div className="i-heroicons:chat-bubble-left-ellipsis-20-solid w-5 h-5 text-blue-5"></div>
              <p>{project.totalComments}</p>
            </div>
          </div>
        </div>
        <div>
          <p>{project.description}</p>
        </div>
        <div>
          <a href={`/project/${slug}`}>
            <Button
              color="bg-primary text-white before:content-[''] before:w-full before:h-[10rem] before:absolute before:-top-15 before:-left-1 before:bg-[radial-gradient(30%_100%_at_50%_50%,_#05CD77_0%,_rgba(6,_205,_119,_0.00)_100%)] before:-rotate-55"
              border="rounded-md border border-secondary/50"
            >
              View Project
            </Button>
          </a>
        </div>
      </div>
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
    <>
      <button
        className={`${
          active ? "bg-gray-blue font-semibold" : "border-b"
        } p-5 text-left rounded-lg md:text-xl`}
        onClick={() => setter(projectId)}
      >
        <p>{projectTitle}</p>
      </button>
    </>
  );
};

export default TopProjects;
