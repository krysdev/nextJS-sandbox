import { Fragment } from "react";
import {
  getEventById,
  getFeaturedEvents,
} from "../../componets/helpers/api-util";
import EventSummary from "../../componets/event-detail/EventSummary";
import EventLogistics from "../../componets/event-detail/EventLogistics";
import EventContent from "../../componets/event-detail/EventContent";
import ErrorAlert from "../../componets/ui/ErrorAlert";
import Head from "next/head";

function EventDetailPage(props) {
  const event = props.singleEvent;

  // fallback check (for 'true')
  if (!event) {
    return (
      <div className="center">Loading...</div>
      // <ErrorAlert>
      //   <p>NO DATA</p>
      // </ErrorAlert>
    );
  }

  return (
    // event. is from props
    <Fragment>
      <Head>
        <title>{event.title}</title> 
        <meta name="description" content={event.description} />
      </Head>
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
    revalidate: 60, // seconds
  };
}

export async function getStaticPaths() {
  const allevents = await getFeaturedEvents();

  const paramsForPaths = allevents.map((event) => ({
    params: { eventid: event.id }, // eventid -> name of the file
  }));

  // const paramsForPaths = [
  //   { params: { pageid: 'p1' } },  // pageid is the name of the dynamic file
  //   { params: { pageid: 'p2' } },
  //   { params: { pageid: 'p3' } }
  // ]

  // false - we specified ALL pages to pre-render (anything else is 404)
  // true - only some of pages static, the rest on the fly (fallback checking needed - 'Loading...' or skeleton page)
  // 'blocking' - page fully generated on the server before sent (so fallback checking not needed, but it takes a while before showing something)
  return {
    paths: paramsForPaths,
    fallback: true,
  };
}

export default EventDetailPage;
