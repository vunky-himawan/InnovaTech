import { getCollection, type CollectionEntry } from 'astro:content';
import { atom } from 'nanostores';


export const listCategories = (events: CollectionEntry<"events">[]) => {
    const categories = events.map(a => a.data.category);
    const uniqueCategories = [...new Set(categories)];
    return uniqueCategories;
};

export const $eventsAtom = atom<CollectionEntry<"events">[]>(await getCollection("events"));
export const $selectedCategoryAtom = atom<string>("");
export const $searchAtom = atom<string>("");
export const $filteredEventsAtom = atom<CollectionEntry<"events">[]>(await getCollection("events"));



export const setSearch = (search: string) => {
    const events = $eventsAtom.get();
    const filteredEvents = events.filter(a => a.data.title.toLowerCase().includes(search.toLowerCase()));
    $searchAtom.set(search);
    $filteredEventsAtom.set(filteredEvents);
};

export const setFilteredEvents = (filteredEvents: CollectionEntry<"events">[]) => {
    $filteredEventsAtom.set(filteredEvents);
};

export const setSelectedCategory = (category: string) => {
    const currentCategory = $selectedCategoryAtom.get();

    if (currentCategory === category) {
        $selectedCategoryAtom.set("");
        $filteredEventsAtom.set($eventsAtom.get());
    } else {
        if (category === "") {
            $selectedCategoryAtom.set(category);
            $filteredEventsAtom.set($eventsAtom.get());
        } else {
            const events = $eventsAtom.get();
            const filteredEvents = events.filter(a => a.data.category === category);
            $selectedCategoryAtom.set(category);
            $filteredEventsAtom.set(filteredEvents);
        }
    }
}
