import { useRouter } from "next/router";
import useSWR from "swr";
import EventList from "../../../components/EventList";
// import { getFilteredEvents } from "../../../dummy-data";
import ResultsTitle from "../../../components/ResultsTitle";
// import { getFilteredEvents } from "../../../helpers/api-util";
import { useEffect, useState } from "react";
import Head from "next/head";
// import { redirect } from "next/dist/server/api-utils";

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.eventSlug;

  const { data, error } = useSWR(
    "https://database-982fe-default-rtdb.europe-west1.firebasedatabase.app/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedEvents = [];
      for (const key in data) {
        transformedEvents.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(transformedEvents);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered events</title>
      <meta name="description" content={`A list of filtered events`} />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <p className='center'>Loading...</p>
      </>
    );
  }

  const year = filterData[0];
  const month = filterData[1];
  const numYear = +year;
  const numMonth = +month;


  pageHeadData = (
    <Head>
      <title>Filtered events</title>
      <meta
        name="description"
        content={`All events for ${numYear}/${numMonth}`}
      />
    </Head>
  );


  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return <p>Invalid filter</p>;
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p className="center">No Events found for the chosen filter.</p>;
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.eventSlug;

//   const year = filterData[0];
//   const month = filterData[1];
//   const numYear = +year;
//   const numMonth = +month;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       notFound: true,
//       // redirect: {
//       //   destination: "/"
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       filteredEvents: filteredEvents,
//       numYear: numYear,
//       numMonth: numMonth,
//     },
//   };
// }

export default FilteredEventsPage;
