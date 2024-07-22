import { getCollection, type CollectionEntry } from 'astro:content';
import { atom } from 'nanostores';


export const $projectsAtom = atom<CollectionEntry<"projects">[]>(await getCollection("projects"));
export const $selectedCategoryAtom = atom<string>("");
export const $searchAtom = atom<string>("");
export const $selectedTagAtom = atom<string[]>([]);
export const $filteredProjectsAtom = atom<CollectionEntry<"projects">[]>(await getCollection("projects"));



export const setSearch = (search: string) => {
    const projects = $projectsAtom.get();
    const filteredProjects = projects.filter(a => a.data.title.toLowerCase().includes(search.toLowerCase()));
    $searchAtom.set(search);
    $filteredProjectsAtom.set(filteredProjects);
};

export const setFilteredProjects = (filteredProjects: CollectionEntry<"projects">[]) => {
    $filteredProjectsAtom.set(filteredProjects);
};

export const setSelectedCategory = (category: string) => {
    const currentCategory = $selectedCategoryAtom.get();

    if (currentCategory === category) {
        $selectedCategoryAtom.set("");
        $filteredProjectsAtom.set($projectsAtom.get());
    } else {
        if (category === "") {
            $selectedCategoryAtom.set(category);
            $filteredProjectsAtom.set($projectsAtom.get());
        } else {
            const projects = $projectsAtom.get();
            const filteredProjects = projects.filter(a => a.data.category === category);
            $selectedCategoryAtom.set(category);
            $filteredProjectsAtom.set(filteredProjects);
        }
    }
}

export const setSelectedTags = (tag: string[]) => {
    if (tag.length === 0) {
        $selectedTagAtom.set(tag);
        $filteredProjectsAtom.set($projectsAtom.get());
    } else {
        const projects = $projectsAtom.get();
        const filteredProjects = projects.filter(a => a.data.tags.some(t => tag.includes(t)));
        $selectedTagAtom.set(tag);
        $filteredProjectsAtom.set(filteredProjects);
    }
};
