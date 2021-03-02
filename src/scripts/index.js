const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const weather = document.querySelector('.weather');
const weatherTitle = document.querySelector('.weather__title');
const weatherTemp = document.querySelector('.weather__temp-value');
const weatherTempMax = document.querySelector('.weather__temp-max-value');
const weatherTempMin = document.querySelector('.weather__temp-min-value');
const weatherTempFeelsLike = document.querySelector('.weather__temp-feels-like-value');
const weatherIcon = document.querySelector('.weather__icon');
const weatherDisc = document.querySelector('.weather__disc');
const weatherHumidity = document.querySelector('.weather__humidity-value');
const weatherPressure = document.querySelector('.weather__pressure-value');
const weatherWind = document.querySelector('.weather__wind');
const weatherDateDay = document.querySelector('.weather__date-day');
const weatherMonth = document.querySelector('.weather__date-month');
const weatherYear = document.querySelector('.weather__date-year');
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
const month = ['Янв.', 'Февр.', 'Марта', 'Апр.', 'Мая', 'Июня', 'Июля', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'];

document.addEventListener('DOMContentLoaded', () => {
  navigator.geolocation.getCurrentPosition(success, error, options);
});

const success = (pos) => {
  const crd = pos.coords;
  getWeather(crd);
};

const error = (err) => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorMessage = errorElement.querySelector('.error__message');
  const errorButtonClose = errorElement.querySelector('.error__button');

  switch (err.code) {
    case 1: errorMessage.textContent = "Разрешите доступ к геоданным в настройках вашего браузера и попробуйте снова.";
      break;
    case 2: errorMessage.textContent = "Техническая ошибка";
      break;
    case 3: errorMessage.textContent = "Превышено время ожидания";
      break;
    default: errorMessage.textContent = "Что то случилось не так";
  }


  errorButtonClose.addEventListener('click', () => {
    location.reload();
  });

  weather.before(errorElement)
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

const getWeather = (crd) => {

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&units=metric&lang=ru&appid=b00a081494024fb25e79d3993f4fbdea`)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {

      setCardMainInfo(data)
    })
    .catch(() => {
      // error
    })
}

const setCardMainInfo = (apiData) => {
  weatherDateDay.textContent = new Date().getDate();
  weatherMonth.textContent = month[new Date().getMonth()];
  weatherYear.textContent = new Date().getFullYear();
  weatherTitle.textContent = apiData.name;
  weatherTemp.textContent = Math.round(apiData.main.temp);
  weatherTempFeelsLike.textContent = Math.round(apiData.main.feels_like);
  weatherIcon.src = `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`;
  weatherDisc.textContent = apiData.weather[0]['description'];
  weatherTempMax.textContent = Math.round(apiData.main.temp_max);
  weatherTempMin.textContent = Math.round(apiData.main.temp_min);
  weatherHumidity.textContent = apiData.main.humidity;
  weatherPressure.textContent = Math.trunc((apiData.main.pressure / 133.3) * 100);
  weatherWind.textContent += ` ${apiData.wind.speed} м/с`;
}