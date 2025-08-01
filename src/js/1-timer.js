import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
let userSelectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  dateFormat: "Y-m-d H:i",
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] === new Date() || selectedDates[0] < new Date()){
        iziToast.show({
          title: 'Error',
          message: 'Please choose a date in the future'
        });
          startBtn.disabled = true;
      }else{
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

startBtn.addEventListener('click', onTimerStart);

function onTimerStart() {
    startBtn.disabled = true;
    dateInput.disabled = true;
    const intervalId = setInterval(() => {
        const time = convertMs(userSelectedDate - new Date());
        if (time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
            clearInterval(intervalId);
            return;
        }
        updateTimer(time);
    }, 1000);
}

function updateTimer(time)
{
    days.textContent = formatDays(time.days);
    hours.textContent = addLeadingZero(time.hours);
    minutes.textContent = addLeadingZero(time.minutes);
    seconds.textContent = addLeadingZero(time.seconds);
}
 



function addLeadingZero(value)
{
  return String(value).padStart(2, '0');
}
function formatDays(value)
{ return value < 10 ? String(value).padStart(2, '0') : value; }

function convertMs(ms)
{
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


