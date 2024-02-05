const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = (data) => {
  //destructure properties
  const { cityDets, weather } = data;
  //update details tempelate
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;</span>
   </div>

  `;
  //update the day/night image
  const iconSrc = `icons/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "day.jpg" : "night.jpg";

  time.setAttribute("src", timeSrc);

  //remove d-none

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

cityForm.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();
  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();
  // update the ui
  forecast
    .updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  //set local storage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
