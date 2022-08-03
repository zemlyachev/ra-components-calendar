import moment from "moment";

export function getMonthMatrix(currentDate) {
  const result = [];
  const date = moment(currentDate);
  const daysInMonth = date.daysInMonth();
  const monthStartsOn = date.clone().startOf("month").weekday();

  let lastDayPrevMonth = moment(currentDate)
    .subtract(1, "month")
    .endOf("month")
    .date();

  let day = 1;
  let dayNexMonth = 1;
  let dayPrevMont = monthStartsOn;
  let weekNum = date.clone().startOf("month").week();

  for (let i = 0; i < (daysInMonth + monthStartsOn) / 7; i++) {
    result[i] = [];
    result[i].weekNum = weekNum++;

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < monthStartsOn) {
        result[i][j] = {
          className: "ui-datepicker-other-month",
          day: lastDayPrevMonth - --dayPrevMont,
        };
      } else if (day > daysInMonth) {
        result[i][j] = {
          className: "ui-datepicker-other-month",
          day: dayNexMonth++,
        };
      } else {
        result[i][j] = {
          className: day === date.date() ? "ui-datepicker-today" : null,
          day: day++,
        };
      }
    }
  }
  
  return result;
}
