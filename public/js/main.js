const datepicker = document.querySelector('#datepicker input');
const timeSlots = document.querySelectorAll('.timeSlot');

// set meeting bounds
let earliestTime;
let latestTime;
let dayRange;

// Create an AudioContext to handle browser gesture errors
let context;
window.onload = function(){
  context = new AudioContext();
}
const updateOptions = () => {
  // Generate array of dates for the selected date plus up to 7 more days
  const selectedDate = new Date(`${datepicker.value} UTC`);
  const days = [];
  for (let i = 0; i < dayRange; i++) {
    const date = new Date(selectedDate.getTime() + i * 24 * 60 * 60 * 1000);
    days.push(date);
  }

  // Generate array of time slots based on earliest and latest times
  const hours = [];
  const startHour = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), earliestTime);
  const endHour = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), latestTime);
  for (let i = 0; i <= 23; i++) {
    const time = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), i);
    if (time >= startHour && time <= endHour) {
      hours.push(time);
    }
  }

  // Clear the current options for the schedule
  const schedule = document.querySelector('#schedule');
  schedule.innerHTML = '';

  // Generate the new options for each day and hour
  days.forEach((day, index) => {
    const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'long' });
    const dayOfMonth = day.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    const dayId = dayOfWeek.toLowerCase();

    const dayOption = document.createElement('li');
    dayOption.classList.add('day');
    dayOption.setAttribute('id', dayId);
    dayOption.textContent = `${dayOfWeek} ${dayOfMonth}`;

    const hourOptions = document.createElement('ol');
    const dayHours = [];
    for (let i = 0; i < hours.length; i++) {
      const time = hours[i];
      if (time.getDate() === day.getDate()) {
        dayHours.push(time);
      }
    }

    dayHours.forEach(hour => {
      const hourOption = document.createElement('li');
      hourOption.classList.add('hour');

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('name', 'facilitatorTime');
      checkbox.setAttribute('class', 'timeSlot');
      checkbox.setAttribute('value', `${dayOfWeek}, ${hour.toISOString()}`);
      hourOption.appendChild(checkbox);

      const label = document.createElement('label');
      label.textContent = hour.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      hourOption.appendChild(label);
      hourOptions.appendChild(hourOption);
    });

    dayOption.appendChild(hourOptions);
    schedule.appendChild(dayOption);
  });
}

document.getElementById('earliestTime').addEventListener('change', () => {
  earliestTime = Number(document.getElementById('earliestTime').value);
  updateOptions();
});

document.getElementById('latestTime').addEventListener('change', () => {
  latestTime = Number(document.getElementById('latestTime').value);
  updateOptions();
});

document.getElementById('dayRange').addEventListener('change', () => {
  dayRange = Number(document.getElementById('dayRange').value);
  updateOptions();
});

// Date picker and event listener to the datepicker
$(document).ready(function() {
  $('#datepicker').datepicker()
      .on('changeDate', function(e) {
        updateOptions();
      });
});
