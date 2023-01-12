const axios = require("axios");

const openweathermapKey = "ec5ca29a3b20f47f8b0bd42b174e740b";
const weatherstackKey = "93f42f89abeeace257f74f03fcce280a";

class Reservation {
  constructor(name, date, weather) {
    this.name = name;
    this.date = date;
    this.weather = weather;
  }
}

class ReservationsManager {
  constructor() {
    this.reservations = [];
  }

  async addReservation(name, date) {
    try {
      const locationUrl = `http://api.openweathermap.org/data/2.5/weather?q=Jerez de la Frontera,ES&appid=${openweathermapKey}&units=metric`;
      const locationResponse = await axios.get(locationUrl);
      const lat = locationResponse.data.coord.lat;
      const lon = locationResponse.data.coord.lon;

      const weatherUrl = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=Jerez de la Frontera&lat=${lat}&lon=${lon}`;
      const weatherResponse = await axios.get(weatherUrl);
      const temperature = weatherResponse.data.current.temperature;
      const humidity = weatherResponse.data.current.humidity;
      const weather = { temperature, humidity };

      const reservation = new Reservation(name, date, weather);
      this.reservations.push(reservation);
      console.log(`Successfully created reservation for ${name} on ${date}.`);
      console.log(reservation);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  ReservationsManager,
};
