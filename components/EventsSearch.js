import { useRef } from "react";
import styles from "./EventsSearch.module.css";
import Button from "./ui/Button";

function EventsSearch({onSearch}) {

    const yearRef = useRef()
    const monthRef = useRef()

    function sumbitHandler(event) {
        event.preventDefault();
        const year = yearRef.current.value
        const month = monthRef.current.value

        onSearch(year, month)
    }

  return (
    <form onSubmit={sumbitHandler} className={styles.form}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="year">Year</label>
          <select ref={yearRef} id="year">
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor="month">Month</label>
          <select ref={monthRef} id="month">
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}

export default EventsSearch;
