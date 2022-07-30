import EventItem from "./EventItem";
import style from "./EventList.module.css"

function EventList(props) {
  const { items } = props; //destructure props

  return (
    <ul className={style.list}>
      {items.map((eventslist) => (
        <EventItem
          key={eventslist.id}
          id={eventslist.id}
          title={eventslist.title}
          location={eventslist.location}
          date={eventslist.date}
          image={eventslist.image}
          // image={eventslist.imageNext}
        />
      ))}
    </ul>
  );
}

export default EventList;
