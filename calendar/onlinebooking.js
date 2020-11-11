import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';

const StarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false
});

const getDatesArray = (appointments) => {
  const monthFromNow = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let date = new Date();
  date.setDate(date.getDate() - 1 - date.getDay()); //start calendar on the last Sunday
  for (let i = 0; i < 35; i++) {
    date.setDate(date.getDate() + 1);
    let day = days[date.getDay()];
    let number = date.getDate();
    let month = months[date.getMonth()];
    if (date < new Date()) {
      //dates before today are disabled
      monthFromNow.push({
        date: '',
        disabled: true
      });
    } else {
      let isoDate = date.toISOString().slice(0, 11) + '00:00:00.000Z'; //'2020-12-12T00:00:00.000Z'; 2020-12-03T18:29:15.218Z
      //console.log(isoDate);
      monthFromNow.push({
        date: `${day} ${number} ${month}`,
        disabled: false,
        appointments: appointments[isoDate]
      });
    }
  }
  console.log('MFN:' + JSON.stringify(monthFromNow[4]));
  return monthFromNow;
};

export const OnlineBooking = (props) => {
  const [selectedDate, updateSelectedDate] = useState();
  const [selectedAppointments, updateSelectedAppointments] = useState();
  const [selectedTime, updateSelectedTime] = useState();

  //console.log(props.appointments[props.dateKeys[0]][1300]);
  const appointments = props.appointments;
  //console.log('APP:' + JSON.stringify(appointments));

  const dateButtonHandler = (data) => {
    updateSelectedDate(data.date);
    //console.log('datap:' + JSON.stringify(data.appointments));
    if (data.appointments) {
      const timesAvailable = Object.keys(data.appointments);
      console.log(timesAvailable);
      let newAppointmentSelection = [];

      timesAvailable.forEach((time) => {
        newAppointmentSelection.push(data.appointments[time] === 'available' ? time : null);
      });

      updateSelectedAppointments(newAppointmentSelection);
    } else return null;
  };

  const timeButtonHandler = (event) => {
    updateSelectedTime(event.target.value);
  };

  const checkforNullAppointments = (appointments) => {
    let nullCount = 0;
    appointments.forEach((appointment) => {
      if (appointment === null) {
        nullCount++;
      }
    });
    return nullCount !== appointments.length;
  };
  return (
    <>
      <div id="calendarcontainer">
        <div id="calendar" style={{ backgroundColor: 'lightgreen' }}>
          <br></br>
          <h3 id="calendartitle">Choose a day</h3>
          <br></br>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              margin: 4
            }}
          >
            {getDatesArray(appointments).map((data) => {
              return (
                <button
                  disabled={data.disabled}
                  onClick={() => dateButtonHandler(data)}
                  value={data.date}
                  key={uuidv4()}
                >
                  {data.date}
                </button>
              );
            })}
          </div>
        </div>
        <div id="dayselect" style={{ backgroundColor: 'lightblue' }}>
          <br></br>
          <h3 id="calendartitle">Choose a time</h3>

          {selectedDate ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <br></br>
              <strong>{selectedDate}</strong>
              <br></br>
              <div>
                {selectedAppointments && checkforNullAppointments(selectedAppointments) ? (
                  selectedAppointments.map((time) => {
                    return time ? (
                      <button value={time} onClick={(event) => timeButtonHandler(event)}>
                        {time}
                      </button>
                    ) : (
                      ''
                    );
                  })
                ) : (
                  <div>
                    <p>No appointments available</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p style={{ textAlign: 'center', fontWeight: 'lighter' }}>Please select an available date</p>
          )}
        </div>
        <div id="bookselected" style={{ backgroundColor: 'lightyellow' }}>
          <br></br>
          <h3 id="calendartitle">Book your appointment</h3>
          {selectedTime ? (
            <>
              <p style={{ textAlign: 'center', fontWeight: 'lighter' }}>
                You have selected an appointment on:
                <br></br>
                <strong>
                  {selectedDate} at {selectedTime}
                </strong>
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button style={{ borderRadius: 10 }} id="bookingbutton">
                  Book this appointment now
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button style={{ borderRadius: 10, backgroundColor: 'rgba(255, 0, 0, 0.425)' }} id="bookingbutton">
                  Reset and start again
                </button>
              </div>
            </>
          ) : (
            <p style={{ textAlign: 'center', fontWeight: 'lighter' }}>Please select an appointment time</p>
          )}
        </div>
      </div>
    </>
  );
};
