const axios = require("axios");

// City coordinates

const cities = {

  Mumbai: {
    latitude: 19.0760,
    longitude: 72.8777
  },

  Delhi: {
    latitude: 28.7041,
    longitude: 77.1025
  },

  Bangalore: {
    latitude: 12.9716,
    longitude: 77.5946
  },

  Chennai: {
    latitude: 13.0827,
    longitude: 80.2707
  }

};

// Main function

async function getWeather(city) {

  const location = cities[city];

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,rain`;

  try {

    const response = await axios.get(url);

    const data = response.data.current;

    const temperature = data.temperature_2m;

    const rain = data.rain;

    let condition = "normal";

    // Rain gets priority

    if (rain > 0) {
      condition = "rainy";
    }

    else if (temperature >= 35) {
      condition = "hot";
    }

    return {

      city,

      temperature,

      rain,

      condition

    };

  }

  catch (error) {

    console.log("Weather API failed");

    return null;

  }

}

// VERY IMPORTANT EXPORT

module.exports = {
  getWeather
};