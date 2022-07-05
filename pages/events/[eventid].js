import { useRouter } from "next/router";
import { Fragment } from "react";
import { getEventById } from "../../dummy-data";
import EventSummary from "../../componets/event-detail/EventSummary";
import EventLogistics from "../../componets/event-detail/EventLogistics";
import EventContent from "../../componets/event-detail/EventContent";
import ErrorAlert from "../../componets/ui/ErrorAlert";

function EventDetailPage() {
  const router = useRouter();

  const eventID = router.query.eventid; // name of the file (eventid.js) is the dynamic name (key) of the KEY:VALUE of 'query' - so we access the value e1, e2 or e3
  const event = getEventById(eventID); //function from DUMMY-DATA.js
  if (!event) {
    return (
      <ErrorAlert>
        <p>NO DATA</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <h1>Event DETAIL</h1>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;
