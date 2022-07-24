const firebase =
  "https://nextjs-udemy-32a96-default-rtdb.europe-west1.firebasedatabase.app/";
const firebaseNode = "events";
export const firebasePath = firebase + firebaseNode + ".json";

export async function getAllEvents() {
  const response = await fetch(firebasePath);
  const data = await response.json();
  //error handling needed

  const transformedData = [];

  // transform Object into Array
  for (const record in data) {
    transformedData.push({
      id: record,
      ...data[record],
    });
  }

  return transformedData;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

/*  //! Firebase structure

{
  "events": {
    "e1": {
      "title": "Programming NOT for everyone",
      "description": "Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.",
      "location": "Somestreet 25, 12345 San Somewhereo",
      "date": "2021-05-12",
      "image": "images/1.jpg",
      "imageNext": "pic1",
      "isFeatured": false
    },
    "e2": {
      "title": "How to hack you grandma's laptop",
      "description": "Hacking is so difficult. That's why we came up with this event - it'll be so much easier. Promised!",
      "location": "New Wall Street 5, 98765 New Work",
      "date": "2021-05-30",
      "image": "images/2.jpg",
      "imageNext": "pic2",
      "isFeatured": true
    },
    "e3": {
      "title": "When your battery goes flat",
      "description": "Focusing your energy correctly - that is something where most people can improve.",
      "location": "My Street 12, 10115 Broke City",
      "date": "2022-04-10",
      "image": "images/3.jpg",
      "imageNext": "pic3",
      "isFeatured": true
    }
  }
}

*/
