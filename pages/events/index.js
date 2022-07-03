import { getAllEvents } from "../../dummy-data";
import EventList from "../../componets/events/EventList";
import EventSearch from "../../componets/events/EventSearch";

function AllEventsPage() {
  const events = getAllEvents();

  return (
    <div>
      <h1>ALL EVENTS</h1>
      
      <EventList items={events}/>
    </div>
  );
}

export default AllEventsPage;
