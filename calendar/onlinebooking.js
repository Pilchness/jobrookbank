import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const getDatesArray = () => {
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
      monthFromNow.push({
        date: `${day} ${number} ${month}`,
        disabled: false,
        appointments: ['10:00', '11:00', '13:00', '14:00', '15:00']
      });
    }
  }

  return monthFromNow;
};

export const OnlineBooking = () => {
  const [selectedDate, updateSelectedDate] = useState();
  const [selectedAppointments, updateSelectedAppointments] = useState([]);
  const [selectedTime, updateSelectedTime] = useState();

  const dateButtonHandler = (data) => {
    updateSelectedDate(data.date);
    updateSelectedAppointments(data.appointments);
  };

  const timeButtonHandler = (event) => {
    updateSelectedTime(event.target.value);
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
            {getDatesArray().map((data) => {
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
                {selectedAppointments ? (
                  selectedAppointments.map((time) => {
                    return (
                      <button value={time} onClick={(event) => timeButtonHandler(event)}>
                        {time}
                      </button>
                    );
                  })
                ) : (
                  <div></div>
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
