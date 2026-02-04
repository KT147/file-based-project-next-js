import { useRouter } from "next/router";
import EventList from "../../components/EventList";
import EventsSearch from "../../components/EventsSearch";
import { getAllEvents } from "../../helpers/api-util";
import Head from "next/head";

function EventsPage({ events }) {
  // const allEvents = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>NextJS Events</title>
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: { events: events },
    revalidate: 60,
  };
}

export default EventsPage;
