import { getFeaturedEvents } from "../dummy-data.js";
import styles from "./EventsList.module.css";
import Button from "./ui/Button.js"
import DateIcon from "./icons/date-icon.js";
import AdressIcon from "./icons/address-icon.js";
import ArrowRightIcon from "./icons/arrow-right-icon.js";
import Image from "next/image.js";

function EventList({events}) {


  return (
    <ul className={styles.list}>
      {events.map((event) => (
        <li className={styles.item} key={event.id}>
          <Image src={`/${event.image}`} alt={event.title} width={250} height={160} />
          <div className={styles.content}> 
            <div className={styles.summary}>
              <h2>{event.title}</h2>
              <div className={styles.date}>
                <DateIcon />
                <time>{event.date}</time>
              </div>
              <div>
                <div className={styles.address}>
                  <AdressIcon />
                  <address>{event.location}</address>
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <Button link={`/events/${event.id}`}>
                <span>Explore Events</span>
                <span className={styles.icon}>
                  <ArrowRightIcon />
                </span>
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default EventList;
