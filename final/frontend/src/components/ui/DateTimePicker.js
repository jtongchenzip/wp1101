import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export default function DateAndTimePicker({ selectedDate, handleDateChange }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        inputVariant="outlined"
        disablePast
        format="yyyy / MM / dd,  hh:mm a"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
}
