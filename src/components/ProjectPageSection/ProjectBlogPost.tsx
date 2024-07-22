import Tabbar from '../Tabbar';
import Filter from '../Filter';
import SearchComponent from '../SearchComponent';
import Card from './Card';
import { useStore } from '@nanostores/react';
import { $filteredProjectsAtom, $searchAtom, $selectedCategoryAtom, $selectedTagAtom, setSearch, setSelectedCategory, setSelectedTags } from '@/stores/ProjectStore';

type FeaturedProjectsProps = {
  categories: string[];
  tags?: string[];
};

const ProjectBlogPost = ({ categories, tags }: FeaturedProjectsProps) => {
  const projects = useStore($filteredProjectsAtom);
  const search = useStore($searchAtom);
  const selectedCategory = useStore($selectedCategoryAtom);
  const selectedTag = useStore($selectedTagAtom);

  return (
    <section className="gap-5 max-w-[1800px] w-full mx-auto p-5 my-10 ">
      <div className="grid grid-cols-3 gap-5 mt-15">
        <div className="col-span-3 xl:col-span-2 gap-5">
          <Tabbar category={categories} selectedCategory={selectedCategory} callback={setSelectedCategory} />
          <div className="grid grid-cols-span-1 gap-5 my-5">
            {projects.length === 0 ? (
              <div>No projects found</div>
            ) : (
              projects.map((project) => (
                <Card
                  key={project.id}
                  title={project.data.title}
                  cover={project.data.cover}
                  description={project.data.description}
                  totalContributors={project.data.totalContributor}
                  totalLikes={project.data.totalLikes}
                  totalComments={project.data.totalComments}
                  userId={project.data.authorId}
                  slug={project.slug}
                  tags={project.data.tags}
                  link={project.data.github}
                />
              ))
            )}
          </div>
        </div>
        <div className="col-span-3 xl:col-span-1 order-first xl:order-last">
          <SearchComponent placeHolder="Search Project" searchInput={search} callback={setSearch} />
          <div className="col-span-3 xl:col-span-1 space-y-20 my-10">
            {tags && <Filter title="Popular Tags" list={tags} select={selectedTag} callback={setSelectedTags} />}
            {categories && <Filter title="Popular Category" list={categories} select={selectedCategory} callback={setSelectedCategory} />}
          </div>
        </div>
      </div>
    </section>

  );
};

export default ProjectBlogPost;
