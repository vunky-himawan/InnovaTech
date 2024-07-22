import { getCollection } from "astro:content";

const events = await getCollection("events");

export const getUpcomingEvents = (eventId: string) => {
  const upcomingEvents = events.filter(
    (event) => event.data.eventId !== eventId
  );
  const sortedUpcomingEvents = upcomingEvents
    .sort((a, b) => {
      const aStart = new Date(a.data.timeline.start);
      const bStart = new Date(b.data.timeline.start);
      return aStart.getTime() - bStart.getTime();
    })
    .slice(0, 4);
  return sortedUpcomingEvents;
};
