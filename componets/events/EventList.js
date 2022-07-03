import EventItem from "./EventItem";
import style from "./EventList.module.css"

function EventList(props) {
  const { items } = props; //destructure props

  return (
    <ul className={style.list}>
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
