import Image from "next/image";

import style from "./EventItem.module.css";
import Button from "../ui/Button";
import DateIcon from "../icons/DateIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import AddressIcon from "../icons/AddressIcon";

function EventItem(props) {
  const { title, image, date, location, id } = props; //destructure props

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n"); // New Wall Street 5, 98765 New Work

  const seeEvent = `/events/${id}`; //backtick

  return (
    <li className={style.item}>
      {/* <img src={"/" + image} alt={title} /> */}
      <Image src={"/" + image} alt={title} width={250} height={160} />
      <div className={style.content}>
        <div className={style.summary}>
          <h2>{title}</h2>
          <div className={style.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={style.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={style.actions}>
          <Button linkprop={seeEvent}>
            <span>See event</span>
            <span className={style.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
