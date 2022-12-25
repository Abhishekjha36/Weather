let search = document.getElementById("search");
let btn = document.getElementById("btn");
let div = document.getElementById("data1");
const Api_key = `839fa1c4b2a4c37f76b7ca176abe9be0`;
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={7b33b9a845c488b3622920de6bf3c4e8}

btn.addEventListener("click", (event) => {
  event.preventDefault();
  if (search.value.length == 0) {
    alert("Please Fill City Name");
    return;
  }
  fatchdata(search.value);
  search.value = "";
});

const fatchdata = async (city) => {
  div.innerHTML = `<h3>Loding......</h3>`;

  let data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=metric`
  );
  let fullData = await data.json();
  return showData(fullData);
};

const showData = (fullData) => {
  if (fullData.cod == "404") {
    div.innerHTML = `
        <h3>please entry city name</h3>
        `;
    return;
  }
  div.innerHTML = `
    <div class="cloud">
    <h2>${fullData.weather[0].main}</h2>
    <p>${new Date().toDateString()}</p>
</div>
<div class="cloud">
    <h1>${fullData.main.temp}<sup><span>°C</span></sup> </h1>
    <img src="https://openweathermap.org/img/wn/${
      fullData.weather[0].icon
    }@2x.png" alt="img">
</div>
<div class="location">
    <span class="span"><i class="fa-solid fa-location-dot"></i></span>
    <p>${fullData.name},${fullData.sys.country}</p>
</div>
<div class="cloud info">
    <div class="div">Feels Like
        <p>${fullData.main.feels_like}°C</p>
    </div>
    <div class="div">Wind Speed
        <p>${fullData.wind.speed} m/s </p>
    </div>
</div>
            
            `;
};
