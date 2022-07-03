import { getFeaturedEvents } from "../dummy-data";
import EventList from "../componets/events/EventList";

function HomePage() {
  const featuredEvents = getFeaturedEvents(); //function from DUMMY-DATA.js

  return (
    <div>
      <h1>HOME</h1>
      <EventList items={featuredEvents}/>
    </div>
  );
}

export default HomePage;
