import Image from "next/image";
import classes from "./EventDetails.module.css";
import LogisticsItem from "./LogisticsItem";
import AddressIcon from "./icons/address-icon";
import DateIcon from "./icons/date-icon";

function EventDetails(props) {
  return (
    <div>
      <section className={classes.summary}>
        <h1>{props.title}</h1>
      </section>
      <section className={classes.logistics}>
        <div className={classes.image}>
          <Image src={`/${props.image}`} alt={props.title} width={400} height={400} />
        </div>
        <ul className={classes.list}>
          <LogisticsItem icon={DateIcon}>
            <time>{props.time}</time>
          </LogisticsItem>
          <LogisticsItem icon={AddressIcon}>
            <address>{props.location}</address>
          </LogisticsItem>
        </ul>
      </section>
      <section className={classes.content}>{props.description}</section>
    </div>
  );
}

export default EventDetails;
