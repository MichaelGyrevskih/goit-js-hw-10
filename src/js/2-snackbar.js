import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
let userSelectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      alert("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};
flatpickr("#datetime-picker", options);
const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector("button")
startBtn.disabled = true;
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

stardBtn.eventListener('click', onTimerStart);

onTimerStart()
{
  startBtn.disable = true;
  dateInput.disable = true;
  const time = convertMs(userSelectedDate - new Date());
  updateTimer(time);
}
function updateTimer(time) {
  days.textContent = formatDays(time.days);
  hours.textContent = addZero(time.hours);
  minutes.textContent = addZero(time.minutes);
  seconds.textContent = addZero(time.seconds);
}
function addZero(value) {
  return String(value).padStart(2, '0');
}
function formatDays(value) { return value < 10 ? String(value).padStart(2, '0') : value; }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}