import { useRouter } from "next/router";
import EventList from "../../components/EventList";
import EventsSearch from "../../components/EventsSearch";
import { getAllEvents } from "../../dummy-data";

function EventsPage() {
  const allEvents = getAllEvents();
  const router = useRouter()

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`

    router.push(fullPath)
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={allEvents} />
    </>
  );
}

export default EventsPage;
