window.addEventListener("load", () => {
  let lon;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let weatherIcon = document.querySelector(".weather-icon");
  let temperatureSection = document.querySelector(".degree-section");
  let temperatureSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f55392ac8bf8a9080971f28188929b02`;

      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          //Set DOM elements from IPI:
          temperatureDegree.innerHTML = data.main.temp;

          temperature = data.weather[0].description;
          temperatureToString = temperature.toString().split(" ");
          for (let i = 0; i < temperatureToString.length; i++) {
            temperatureToString[i] =
              temperatureToString[i].charAt(0).toUpperCase() +
              temperatureToString[i].slice(1);
          }
          temperatureDescription.innerHTML = temperatureToString.join(" ");

          locationTimezone.innerHTML = data.name;

          weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

          // Formula F to C:

          let celsius = (data.main.temp - 32) * (5 / 9);
          console.log(celsius);
          // Convert temperature degree from F to C:
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.innerHTML === "F") {
              temperatureSpan.innerHTML = "C";
              temperatureDegree.innerHTML = Math.floor(celsius);
            } else {
              temperatureSpan.innerHTML = "F";
              temperatureDegree.innerHTML = data.main.temp;
            }
          });
        });
    });
  }
});
