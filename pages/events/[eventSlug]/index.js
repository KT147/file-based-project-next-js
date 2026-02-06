// import { useRouter } from "next/router";
// import { getEventById } from "../../../dummy-data";
import Head from "next/head";
import EventDetails from "../../../components/EventDetails";
import { getEventById, getFeaturedEvents } from "../../../helpers/api-util";
import Comments from "../../../components/input/comments";

function EventDetailsPage({ event }) {
  // const router = useRouter();

  // const eventId = router.query.eventSlug;

  if (!event) {
    return <div className="center">Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventDetails
        image={event.image}
        title={event.title}
        description={event.description}
        time={event.date}
        location={event.location}
      />
      <Comments eventId={event.id}/>
    </div>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const eventId = params.eventSlug;

  const event = await getEventById(eventId);

  return {
    props: { event: event },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventSlug: event.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}

export default EventDetailsPage;
