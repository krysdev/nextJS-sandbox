import pic1 from "../../public/images/1.jpg";
import pic2 from "../../public/images/2.jpg";
import pic3 from "../../public/images/3.jpg";
import Image from "next/image";

import style from "./EventItem.module.css";
import Button from "../ui/Button";
import DateIcon from "../icons/DateIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import AddresIcon from "../icons/AddressIcon";

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={"/" + image} alt={title} />
      <div className={style.content}>
        <div className={style.summary}>
          <h2>{title}</h2>
        </div>
        <div className={style.date}>
          <DateIcon />
          <time>{humanReadableDate}</time>
        </div>
        <div className={style.address}>
          <AddresIcon />
          <address>{formattedAddress}</address>
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
