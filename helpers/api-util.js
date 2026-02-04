export async function getAllEvents() {
  const response = await fetch(
    "https://database-982fe-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  );
  const data = await response.json();

  const transformedEvents = [];
  for (const key in data) {
    transformedEvents.push({
      id: key,
      ...data[key],
    });
  }
  return transformedEvents;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  const filteredEvents = allEvents.filter((event) => event.isFeatured);
  return filteredEvents;
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const allEvents = await getAllEvents();
  const { year, month } = dateFilter;

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
