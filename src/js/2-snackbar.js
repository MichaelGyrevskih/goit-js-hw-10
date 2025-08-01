
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const userTime = document.querySelector('input[name="delay"]').value;
  const userState = document.querySelector('input[name="state"]:checked').value;
  createPromise(userTime, userState);
}

function createPromise(userTime, userState)
{
  new Promise((resolve, reject) => {
    form.reset();
    setTimeout(() => {
      if (userState === 'fulfilled') {
        resolve(userTime);
      } else {
        reject(userTime);
      }
    }, userTime);
  }).then(time => iziToast.show({
    message: `✅ Fulfilled promise in ${time}ms`,
    position: 'topRight',
    color: 'green',
    icon: 'ico-success',
  }))
  .catch(time => iziToast.show({
    message: `❌ Rejected promise in ${time}ms`,
    position: 'topRight',
    color: 'red',
    icon: 'ico-error',
  }) );
}