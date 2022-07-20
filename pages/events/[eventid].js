import { Fragment } from "react";
import { getAllEvents, getEventById } from "../../componets/helpers/api-util";
import EventSummary from "../../componets/event-detail/EventSummary";
import EventLogistics from "../../componets/event-detail/EventLogistics";
import EventContent from "../../componets/event-detail/EventContent";
import ErrorAlert from "../../componets/ui/ErrorAlert";

function EventDetailPage(props) {
  const event = props.singleEvent;

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

export async function getStaticProps(context) {
  const eventID = context.params.eventid; // eventid -> name of the file
  const justOneEvent = await getEventById(eventID); //function from API-UTIL.js

  return {
    props: { singleEvent: justOneEvent },
    // revalidate: 60 // seconds
  };
}

export async function getStaticPaths() {

  const allevents = await getAllEvents();
  
  const paramsForPaths = allevents.map((event) => ({
    params: { eventid: event.id }, // eventid -> name of the file
  }));

  // const paramsForPaths = [
  //   { params: { pageid: 'p1' } },  // pageid is the name of the dynamic file
  //   { params: { pageid: 'p2' } },
  //   { params: { pageid: 'p3' } }
  // ]

  return {
    paths: paramsForPaths,
    fallback: false,
  };
}

export default EventDetailPage;