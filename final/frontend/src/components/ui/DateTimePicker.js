import React from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import moment from 'moment';

export default function DateAndTimePicker({ selectedDate, setSelectedDate }) {
  return (
  // <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DateTimePicker
      disablePast
      format="yyyy-MM-dd HH:mm"
      value={selectedDate}
      onChange={(e) => setSelectedDate(() => setSelectedDate(moment(e).format('YYYY-MM-DD HH:mm')))}
    />
  // </MuiPickersUtilsProvider>
  );
}
