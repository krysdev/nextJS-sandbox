import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import EventList from "../../componets/events/EventList";
import ResultsTitle from "../../componets/events/ResultsTitle";
import Button from "../../componets/ui/Button";
import ErrorAlert from "../../componets/ui/ErrorAlert";
import useSWR from "swr";
import { firebasePath } from "../../componets/helpers/api-util";
import Head from "next/head";

function FilteredEventsPage() {
  const [events, setEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR(firebasePath, (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedData = [];
      // transform Object into Array
      for (const record in data) {
        transformedData.push({
          id: record,
          ...data[record],
        });
      }

      setEvents(transformedData); // set 'events'
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered EVENTS</title>
      <meta name="description" content={`List of events.`} />
    </Head>
  );

  if (!events) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear; // transforms a string "2021" to a number 2021
  const numMonth = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Filtered EVENTS</title>
      <meta
        name="description"
        content={`Events that take place in ${numMonth} / ${numYear} .`}
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
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter (SLUG)</p>
        </ErrorAlert>
        <div className="center">
          <Button linkprop="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found (SLUG)</p>
        </ErrorAlert>
        <div className="center">
          <Button linkprop="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHeadData}
      <h1>Filtered EVENTS</h1>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
