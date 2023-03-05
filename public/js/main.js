// date picker 
const datepicker = document.querySelector('#datepicker input');
const timeSlots = document.querySelectorAll('.timeSlot');

// Date picker and event listener to the datepicker
$(document).ready(function() {
  $('#datepicker').datepicker()
      .on('changeDate', function(e) {
          // Get the selected date in UTC format
const selectedDate = new Date(`${datepicker.value} UTC`);

// Generate array of dates for the next 7 days (including the selected date)
const days = [];
const tzOffset = selectedDate.getTimezoneOffset() * 60 * 1000; 
console.log('tzOffset', tzOffset)
for (let i = 0; i < 7; i++) {
const date = new Date(selectedDate.getTime() + i * 24 * 60 * 60 * 1000 + tzOffset);
days.push(date);
}
console.log(tzOffset, 'tzoffset')
// Generate array of time slots
const hours = [];
const now = new Date();
const startHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0); 
const endHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23); 
  for (let i = 0; i <= 23; i++) {
    const time = new Date(startHour.getTime() + i * 60 * 60 * 1000);
    if (time <= endHour || selectedDate > now) {
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
const startHour = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0); // updated to represent 12:00AM
const endHour = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23);

  for (let i = 0; i <= 23; i++) {
    const time = new Date(startHour.getTime() + i * 60 * 60 * 1000);
    if (time <= endHour || day > now) {
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
})

  });
});




// const deleteBtn = document.querySelectorAll('.del')
// const todoItem = document.querySelectorAll('span.not')
// const todoComplete = document.querySelectorAll('span.completed')

// Array.from(deleteBtn).forEach((el)=>{
//     el.addEventListener('click', deleteTodo)
// })

// Array.from(todoItem).forEach((el)=>{
//     el.addEventListener('click', markComplete)
// })

// Array.from(todoComplete).forEach((el)=>{
//     el.addEventListener('click', markIncomplete)
// })

// async function deleteTodo(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/deleteTodo', {
//             method: 'delete',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// async function markComplete(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/markComplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// async function markIncomplete(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/markIncomplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

