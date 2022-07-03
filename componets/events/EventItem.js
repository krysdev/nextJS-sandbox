import Image from "next/image";
import Link from "next/link";
import pic1 from "../../public/images/1.jpg"
import pic2 from "../../public/images/2.jpg"
import pic3 from "../../public/images/3.jpg"

function EventItem(props) {
  const { title, image, date, location, id } = props; //destructure props

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  // const humanReadableDate = date

  const formattedAddress = location.replace(", ", "\n");  // New Wall Street 5, 98765 New Work

  const seeEvent = `/events/${id}` //backtick 

  return (
    <li>
      <img src={'/'+ image} alt={title} />
      {/* <Image src={image} alt={title} width={100} height={100}/> */}
      <div>
        <div>
          <h2>{title}</h2>
        </div>
        <div>
          <time>{humanReadableDate}</time>
        </div>
        <div>
          <address>{formattedAddress}</address>
        </div>
      </div>
      <div>
        <Link href={seeEvent}>See event</Link>
      </div>
    </li>
  );
}

export default EventItem;
