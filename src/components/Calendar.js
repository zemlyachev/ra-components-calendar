import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/ru";
import { getMonthMatrix } from "../utils/CalendarUtils.js";

let weekNames = [];
const weekdaysShort = moment.weekdaysShort(true);
const weekdays = moment
  .weekdays(true)
  .map((weekday) => weekday[0].toUpperCase() + weekday.slice(1));
for (let i = 0; i < 7; i++) {
  weekNames.push([weekdaysShort[i], weekdays[i]]);
}

const weekends = [5, 6].map((day) => weekNames[day]);

function Calendar(props) {
  const { date } = props;
  const currentDate = moment(date);

  const dayNum = currentDate.date();
  const dayOfWeek = moment.weekdays(currentDate.isoWeekday());
  const month = currentDate.month();
  const yearNum = currentDate.year();

  const collGroup = (
    <colgroup>
      {weekNames.map((name) => (
        <col
          key={name}
          className={weekends.includes(name) ? "ui-datepicker-week-end" : null}
        />
      ))}
    </colgroup>
  );

  const weekendHeader = (
    <thead>
      <tr>
        {weekNames.map((name) => (
          <th key={name[0]} scope="col" title={name[1]}>
            {name[0]}
          </th>
        ))}
      </tr>
    </thead>
  );

  const monthMatrix = getMonthMatrix(date);
  const mothGrid = (
    <tbody>
      {monthMatrix.map((week) => (
        <tr key={week.weekNum}>
          {week.map((day) => (
            <td key={day.day} className={day.className}>
              {day.day}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{dayOfWeek}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{dayNum}</div>
          <div className="ui-datepicker-material-month">
            {moment.months("D MMMM", month)}
          </div>
          <div className="ui-datepicker-material-year">{yearNum}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{moment.months(month)}</span>
          &nbsp;
          <span className="ui-datepicker-year">{yearNum}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        {collGroup}
        {weekendHeader}
        {mothGrid}
      </table>
    </div>
  );
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default Calendar;
