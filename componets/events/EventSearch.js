import { useRef } from "react";
import Button from "../ui/Button";
import style from "./EventSearch.module.css";

function EventSearch(props) {
  const yearInputRef = useRef();
  const monthInputRef = useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
    const selectedYear = yearInputRef.current.value
    const selectedMonth = monthInputRef.current.value

    props.onSearch(selectedMonth,selectedYear)
  }
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.controls}>
        <div className={style.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={style.control}>
          <label htmlFor="month">Month</label>
          <select name="" id="month" ref={monthInputRef}>
            <option value="1">January</option>
            <option value="2">Feb</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}

export default EventSearch;
