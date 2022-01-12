import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';

export default function DateAndTimePicker({ selectedDate, setSelectedDate }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        disablePast
        format="yyyy-MM-dd HH:mm"
        value={selectedDate}
        onChange={(e) => setSelectedDate(() => moment(e).toDate())}
      />
    </MuiPickersUtilsProvider>
  );
}
