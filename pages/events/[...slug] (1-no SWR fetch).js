import { getFilteredEvents } from "../../componets/helpers/api-util";
import { useRouter } from "next/router";
import EventList from "../../componets/events/EventList";
import ResultsTitle from "../../componets/events/ResultsTitle";
import Button from "../../componets/ui/Button";
import ErrorAlert from "../../componets/ui/ErrorAlert";

function FilteredEventsPage(props) {
  const router = useRouter();

  // const filterData = router.query.slug;

  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear; // transforms a string "2021" to a number 2021
  // const numMonth = +filteredMonth;

  if (props.hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter (SLUG)</p>
        </ErrorAlert>
        <div className="center">
          <Button linkprop="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = props.filteredEvents;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found (SLUG)</p>
        </ErrorAlert>
        <div className="center">
          <Button linkprop="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <>
      <h1>Filtered EVENTS</h1>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear; // transforms a string "2021" to a number 2021
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2020 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true }, // use ErrorAlert component in the component
      // notFound: true,                       // alt 1. 404 page
      // redirect: { destination: "/error" },  // alt 2. redirection
    };
  }

  const ourfilteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  return {
    props: {
      filteredEvents: ourfilteredEvents,
      date: { year: numYear, month: numMonth },
    },
  };
}

export default FilteredEventsPage;
