import { getFeaturedEvents } from "../dummy-data";
import EventList from "../componets/events/EventList";

import Button from "../componets/ui/Button";

function HomePage() {
  const featuredEvents = getFeaturedEvents(); //function from DUMMY-DATA.js

  function funHandleClick() {
    console.log("xxxxx")
  }

  return (
    <div>
      <h1>HOME</h1>
      <EventList items={featuredEvents} />

      <Button linkprop="/events">
        <span>All events</span>
      </Button>
      <br />
      <Button handleClick={funHandleClick}>[Console Log]</Button>
    </div>
  );
}

export default HomePage;
