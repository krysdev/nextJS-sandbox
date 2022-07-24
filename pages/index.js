import { getFeaturedEvents } from "../componets/helpers/api-util";
import EventList from "../componets/events/EventList";

import Button from "../componets/ui/Button";

function HomePage(props) {
  function funHandleClick() {
    console.log(".xXxXxXx.");
  }

  return (
    <div>
      <h1>HOME</h1>
      <EventList items={props.featured} />

      <Button linkprop="/events">
        <span>All events</span>
      </Button>
      <br />
      <Button handleClick={funHandleClick}>[Console Log]</Button>
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: { featured: featuredEvents },
    revalidate: 1800 // seconds (30min)
  };
}

export default HomePage;
