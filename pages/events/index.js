import { getAllEvents } from "../../componets/helpers/api-util";
import EventList from "../../componets/events/EventList";
import EventSearch from "../../componets/events/EventSearch";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

function AllEventsPage(props) {
  const events = props.events;
  const router = useRouter();

  function onSearch(month, year) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="what is it all about" />
      </Head>
      <h1>ALL EVENTS</h1>
      <EventSearch onSearch={onSearch} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const allevents = await getAllEvents();
  return {
    props: { events: allevents },
    revalidate: 60, // seconds
  };
}

export default AllEventsPage;
