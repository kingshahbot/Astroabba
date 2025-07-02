const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Dummy Swiss Ephemeris Logic (replace with real implementation)
function getPlanetRashi(planet, datetime) {
  // This is a mock - in real case, Swiss ephemeris calculations go here
  return {
    planet: planet,
    degree: Math.random() * 360,
    rashi: ["Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya", "Tula", "Vrischika", "Dhanu", "Makara", "Kumbha", "Meena"][Math.floor(Math.random() * 12)]
  };
}

app.post('/generate-kundli', (req, res) => {
  const { date, time, city } = req.body;

  const datetime = `${date}T${time}`;
  const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];

  const kundli = planets.map(planet => getPlanetRashi(planet, datetime));

  res.json({
    datetime: datetime,
    city: city || "Delhi",
    kundli: kundli
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AstroAbba Swiss Backend running on port ${PORT}`);
});