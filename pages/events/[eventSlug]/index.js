import { useRouter } from "next/router";
import { getEventById } from "../../../dummy-data";
import EventDetails from "../../../components/EventDetails";

function EventDetailsPage() {
  const router = useRouter();

  const eventId = router.query.eventSlug;
  const event = getEventById(eventId);

  if (!event) {
    return <p>No event found</p>;
  }

  return (
    <div>
      <EventDetails
        image={event.image}
        title={event.title}
        description={event.description}
        time={event.date}
        location={event.location}
      />
    </div>
  );
}

export default EventDetailsPage;
