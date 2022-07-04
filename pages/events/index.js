import { getAllEvents } from "../../dummy-data";
import EventList from "../../componets/events/EventList";
import EventSearch from "../../componets/events/EventSearch";
import { Fragment } from "react";

function AllEventsPage() {
  const events = getAllEvents();

  function onSearch(month, year) {
    
  }
  
  return (
    <Fragment>
      <h1>ALL EVENTS</h1>
      <EventSearch />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;
