import { useRouter } from "next/router";
import EventList from "../../../components/EventList";
import { getFilteredEvents } from "../../../dummy-data";
import ResultsTitle from "../../../components/ResultsTitle";

function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.eventSlug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const year = filterData[0];
  const month = filterData[1];
  const numYear = +year;
  const numMonth = +month;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p className="center">Invalid Filter.</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p className="center">No Events found for the chosen filter.</p>;
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;
