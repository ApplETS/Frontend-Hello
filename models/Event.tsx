interface Event {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    state: number;
    publicationDate: string;
    eventDate: string;
    createdAt: string;
    updatedAt: string;
    moderator: null; // Replace 'null' with a proper type if 'moderator' can have other values
    organizer: Organizer | null;
    tags: string[]; // Assuming tags are strings; adjust if necessary
  }