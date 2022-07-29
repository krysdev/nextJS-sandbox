import { getFeaturedEvents } from "../componets/helpers/api-util";
import EventList from "../componets/events/EventList";
import Head from "next/head";

function HomePage(props) {
  function funHandleClick() {
    console.log(".xXxXxXx.");
  }

  return (
    <div>
      <h1>HOME</h1>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="what is it all about" />
      </Head>
      <EventList items={props.featured} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: { featured: featuredEvents },
    revalidate: 1800, // seconds (30min)
  };
}

export default HomePage;
