import { getCollection, type CollectionEntry } from 'astro:content';
import { atom } from 'nanostores';


export const $articlesAtom = atom<CollectionEntry<"articles">[]>(await getCollection("articles"));
export const $selectedCategoryAtom = atom<string>("");
export const $searchAtom = atom<string>("");
export const $selectedTagAtom = atom<string[]>([]);
export const $filteredArticlesAtom = atom<CollectionEntry<"articles">[]>(await getCollection("articles"));



export const setSearch = (search: string) => {
    const articles = $articlesAtom.get();
    const filteredArticles = articles.filter(a => a.data.title.toLowerCase().includes(search.toLowerCase()));
    $searchAtom.set(search);
    $filteredArticlesAtom.set(filteredArticles);
};

export const setFilteredArticles = (filteredArticles: CollectionEntry<"articles">[]) => {
    $filteredArticlesAtom.set(filteredArticles);
};

export const setSelectedCategory = (category: string) => {
    const currentCategory = $selectedCategoryAtom.get();

    if (currentCategory === category) {
        $selectedCategoryAtom.set("");
        $filteredArticlesAtom.set($articlesAtom.get());
    } else {
        if (category === "") {
            $selectedCategoryAtom.set(category);
            $filteredArticlesAtom.set($articlesAtom.get());
        } else {
            const articles = $articlesAtom.get();
            const filteredArticles = articles.filter(a => a.data.category === category);
            $selectedCategoryAtom.set(category);
            $filteredArticlesAtom.set(filteredArticles);
        }
    }
}

export const setSelectedTags = (tag: string[]) => {
    if (tag.length === 0) {
        $selectedTagAtom.set(tag);
        $filteredArticlesAtom.set($articlesAtom.get());
    } else {
        const articles = $articlesAtom.get();
        const filteredArticles = articles.filter(a => a.data.tags.some(t => tag.includes(t)));
        $selectedTagAtom.set(tag);
        $filteredArticlesAtom.set(filteredArticles);
    }
};
