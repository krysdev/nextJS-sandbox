import EventItem from "./EventItem";

function EventList(props) {
  const { items } = props; //destructure props

  return (
    <ul>
      {items.map((dummyevent) => (
        <EventItem
          key={dummyevent.id}
          id={dummyevent.id}
          title={dummyevent.title}
          location={dummyevent.location}
          date={dummyevent.date}
          image={dummyevent.image}
          // image={dummyevent.imageNext}
        />
      ))}
    </ul>
  );
}

export default EventList;
