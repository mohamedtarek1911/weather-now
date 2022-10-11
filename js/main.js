"use strict";

let app = document.querySelector(".weather-app");
let temp = document.querySelector(".temp");
let dateOutput = document.querySelector(".date");
let timeOutput = document.querySelector(".time");
let condition = document.querySelector(".condition");
let nameOutput = document.querySelector(".name");
let icon = document.querySelector(".icon");
let cloud = document.querySelector(".cloud");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let form = document.querySelector("#locationInput");
let search = document.querySelector(".search");
let submitBtn = document.querySelector(".submit");
let cities = document.querySelectorAll(".cities");

let defualtCity = "cairo";

cities.forEach((city) => {
  city.addEventListener("click", function (e) {
    console.log(e.target.innerText);
    console.log(e.target.innerHTML);
    defualtCity = e.target.innerHTML;

    weatherData();
    app.style.opacity = "0";
  });
});

form.addEventListener("sumbit", function (e) {
  if (search.value.length == 0) {
    alert("please enter your city name");
  } else {
    defualtCity = search.value;
    weatherData();
    search.value = "";
    app.style.opacity = "0";
  }
});

async function searchCity(term) {
  let searchCities = [];
  let result = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=6f9e7a024cb64777875203600220910&q=${term}`
  );
  let finalResult = await result.json();
  searchCities.push(finalResult);
  console.log(finalResult);
  for (let i = 0; i < finalResult.length; i++) {
    if (
      finalResult[i].name.toLowerCase().includes(term.toLowerCase()) == true
    ) {
      defualtCity = term;
      weatherData();
    }
    console.log(finalResult[i].name);
  }

  // console.log(searchCities);
}

search.addEventListener("keypress", function () {
  searchCity(this.value);
  if (search.value == "" || search.value == " " || search.value == null) {
    defualtCity = "cairo";
    weatherData();
  }
});

submitBtn.addEventListener("click", function () {
  defualtCity = search.value;
  weatherData();
  search.value = "";
});

document.addEventListener("keypress", function (e) {
  console.log(e);
  if (e.key == "Enter") {
    weatherData();
  }
});

function datee(day, month, year) {
  let week = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  return week[new Date(`${day}/${month}/${year}`).getDay() + 1];
}

function weatherData() {
  ///////////fetch way (async,await)//////////////

  //   let result = await fetch(
  //     `https://api.weatherapi.com/v1/current.json?key=6f9e7a024cb64777875203600220910&q=${defualtCity}`
  //   );
  //   let finalResult = await result.json();
  //   console.log(finalResult);

  ///////////fetch way (axios way)//////////////

  fetch(
    `https://api.weatherapi.com/v1/current.json?key=6f9e7a024cb64777875203600220910&q=${defualtCity}`
  )
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      temp.innerHTML = data.current.temp_c.toFixed() + "&#176;";
      condition.innerHTML = data.current.condition.text;
      let date = data.location.localtime;
      let y = parseInt(date.substr(0, 4));
      let m = parseInt(date.substr(5, 2));
      let d = parseInt(date.substr(8, 2));

      let time = date.substr(11);
      console.log(y, m, d, time);

      dateOutput.innerHTML = `${datee(d, m, y)} ${d} ,${m},${y}`;
      timeOutput.innerHTML = time;
      nameOutput.innerHTML = data.location.name;
      let iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );
      console.log(iconId);
      icon.src = data.current.condition.icon;
      cloud.innerHTML = data.current.cloud + "%";
      humidity.innerHTML = data.current.humidity + "%";
      wind.innerHTML = data.current.wind_kph.toFixed() + "km/h";

      let timeOfDay = "day";
      let code = data.current.condition.code;
      console.log(code);

      if (data.current.is_day == 0) {
        timeOfDay = "night";
      } else {
        timeOfDay = "day";
      }

      if (code == 1000) {
        app.style.backgroundImage = ` linear-gradient(
              to right,
              rgba(0, 0, 0, 0.6),
              rgba(0, 0, 0, 0.6)
            ),
            url(./imgs/${timeOfDay}/cloudy_1.jpg)`;

        submitBtn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          submitBtn.style.background = "#181e27";
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = ` linear-gradient(
              to right,
              rgba(0, 0, 0, 0.6),
              rgba(0, 0, 0, 0.6)
            ),
            url(./imgs/${timeOfDay}/cloudy_1.jpg)`;
        submitBtn.style.background = "#fa6d1b";

        if (timeOfDay == "night") {
          submitBtn.style.background = "#181e27";
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = ` linear-gradient(
              to right,
              rgba(0, 0, 0, 0.6),
              rgba(0, 0, 0, 0.6)
            ),
            url(./imgs/${timeOfDay}/rainy_1.jpg)`;
        submitBtn.style.background = "#647d75";
        if (timeOfDay == "night") {
          submitBtn.style.background = "#325c80";
        }
      } else {
        app.style.backgroundImage = ` linear-gradient(
              to right,
              rgba(0, 0, 0, 0.6),
              rgba(0, 0, 0, 0.6)
            ),
            url(./imgs/${timeOfDay}/snowy_1.jpg)`;
        submitBtn.style.background = "#4d72aa";
        if (timeOfDay == "night") {
          submitBtn.style.background = "#1b1b1b";
        }
      }

      app.style.opacity = "1";
    })
    .catch(() => {
      alert("city is not found,please try again");
      app.style.opacity = "1";
    });
}

weatherData();
