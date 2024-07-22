import { useEffect, useRef, useState } from 'react';
import Tabbar from '../Tabbar';
import { UserData } from '@/data/UserData';
import { useSpring } from 'framer-motion';
import type { CollectionEntry } from 'astro:content';
import { motion } from 'framer-motion';
import Filter from '../Filter';
import SearchComponent from '../SearchComponent';
import Tag from '../Tag';
import Button from '../Button';
import Card from './Card';

type FeaturedProjectsProps = {
  projects: CollectionEntry<"projects">[];
  category: string[];
  tags?: string[];
};

const ProjectBlogPost = ({ projects, category, tags }: FeaturedProjectsProps) => {
  const [filteredProjects, setFilteredProjects] = useState<CollectionEntry<"projects">[]>(projects);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTopicChange = (selected: string) => {
    setSelectedCategory(selected);
  };

  const handleTagChange = (selected: string[]) => {
    setSelectedTags(selected);
  };

  useEffect(() => {
    let result = projects;

    if (search) {
      result = result.filter((project) =>
        project.data.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // if (selectedCategory) {
    //   result = result.filter((project) =>
    //     Array.isArray(selectedCategory)
    //       ? selectedCategory.includes(project.data.category)
    //       : project.data.category === selectedCategory
    //   );
    // }

    // if (selectedTags.length > 0) {
    //   result = result.filter((project) =>
    //     selectedTags.every(tag => project.data.tags?.includes(tag))
    //   );
    // }

    setFilteredProjects(result);
  }, [search, selectedCategory, selectedTags]);


  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  return (
    <section className="gap-5 max-w-[1800px] w-full mx-auto p-5 my-10 ">
      <div className="grid grid-cols-3 gap-5 mt-15">
        <div className="col-span-3 xl:col-span-2 gap-5">
          <Tabbar category={category} selectedCategory={selectedCategory} callback={setSelectedCategory} />
          <div className="grid grid-cols-span-1 gap-5 my-5">
            {filteredProjects.length === 0 ? (
              <div>No projects found</div>
            ) : (
              filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  title={project.data.title}
                  cover={project.data.cover}
                  description={project.data.description}
                  totalContributors={140}
                  totalLikes={project.data.totalLikes}
                  totalComments={project.data.totalComments}
                  userId={project.data.authorId}
                  slug={project.slug}
                  tags={[
                    "React", "TailwindCSS", "TypeScript", "JavaScript", "Next.js", "React Native", "Node.js", "Express.js", "MongoDB", "Firebase", "AWS", "GCP", "Azure", "Docker", "Kubernetes", "GraphQL", "REST API", "CI/CD", "Jest", "Cypress", "Testing Library", "React Query", "Redux", "MobX", "Context API", "Recoil", "Apollo Client", "React Query", "React Router", "Reach Router", "React Navigation", "React Native Navigation", "React Native Paper", "React Native Elements", "React Native Vector Icons", "React Native CLI"
                  ]}
                  link={project.data.github}
                />
              ))
            )}
          </div>
        </div>
        <div className="col-span-3 xl:col-span-1 order-first xl:order-last">
          <SearchComponent placeHolder="Search Project" searchInput={search} callback={setSearch} />
          <div className="col-span-3 xl:col-span-1 space-y-20 my-10">
            {tags && <Filter title="Popular Tags" list={tags} select={[]} callback={handleTagChange} />}
            {category && <Filter title="Popular Category" list={category} select={""} callback={handleTopicChange} />}
          </div>
        </div>
      </div>
    </section>

  );
};

export default ProjectBlogPost;
