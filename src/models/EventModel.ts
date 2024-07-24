export type EventModel = {
  eventId: string;
  title: string;
  description: string;
  timeline: {
    registration: Array<{
      start: Date;
      end: Date;
    }>;
    start: Date;
    end: Date;
    timezone: string;
    location: string;
  };
  registrationLink: string;
  fee: number;
  location: string;
  cover: string;
  totalLikes: number;
  totalComments: number;
  totalInterested: number;
  category: string;
  authorId: string;
  contacts: {
    email: string | null;
    phone: string | null;
    twitter: string | null;
    linkedin: string | null;
    github: string | null;
    instagram: string | null;
    website: string | null;
  };
};
