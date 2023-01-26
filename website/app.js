/* Global Variables */
const staticURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=6366d25bd31143aecc1784f5317109fd&units=imperial";

const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const generationBtn = document.getElementById("generate");

generationBtn.addEventListener("click", performAction);

function performAction(e) {
  let d = new Date();
  let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
  requestData(staticURL, zipInput.value, apiKey)
    .then(function (weatherData) {
      postData("http://127.0.0.1:8002/newWeatherEntry", {
        temp: weatherData.main.temp,
        date: newDate,
        feeling: feelingsInput.value,
      });
    })
    .then(retrieveData);
}

async function requestData(staticURL, zipInput, apiKey) {
  const res = await fetch(staticURL + zipInput + apiKey);
  try {
    const weatherData = await res.json();
    //console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
}
// Create a new date instance dynamically with JS

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

const retrieveData = async () => {
  const request = await fetch("http://127.0.0.1:8002/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    //console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      "temprature: " + Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = "feeling: " + allData.feel;
    document.getElementById("date").innerHTML = "date: " + allData.date;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
