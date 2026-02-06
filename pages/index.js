import EventList from "../components/EventList";
import NewsletterRegistration from "../components/input/newsletter-registration";
import { getFeaturedEvents } from "../helpers/api-util";
// import { getFeaturedEvents } from "../dummy-data"
import Head from "next/head";

function HomePage(props) {
  // const featuredEvents = getFeaturedEvents()

  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find events" />
      </Head>
      <NewsletterRegistration/>
      <EventList events={props.events} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: { events: featuredEvents },
    revalidate: 1800,
  };
}
