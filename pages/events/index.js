import { getAllEvents } from "../../dummy-data";
import EventList from "../../componets/events/EventList";
import EventSearch from "../../componets/events/EventSearch";
import { Fragment } from "react";
import { useRouter } from "next/router";

function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function onSearch(month, year) {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath);
  }

  return (
    <Fragment>
      <h1>ALL EVENTS</h1>
      <EventSearch onSearch={onSearch} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;
