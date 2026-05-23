const express = require("express");

const cors = require("cors");

const db = require("./database");

const { getWeather } = require("./weather");

const { updateAds } = require("./decisionEngine");

const app = express();

app.use(cors());

app.use(express.json());

// =========================
// MAIN AUTOMATION LOOP
// =========================

async function runDynamo() {

  const cities = [

    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai"

  ];

  for (const city of cities) {

    const weather = await getWeather(city);

    console.log(weather);

    if (weather) {

      await updateAds(weather);

    }

  }

}

// Run once immediately

runDynamo();

// Run every 15 minutes

setInterval(runDynamo, 15 * 60 * 1000);

// =========================
// GET ALL ADS
// =========================

app.get("/ads", (req, res) => {

  db.all(
    `
    SELECT * FROM line_items
    `,
    (err, rows) => {

      if (err) {

        res.status(500).json({
          error: err.message
        });

        return;

      }

      res.json(rows);

    }
  );

});

// =========================
// GET AUDIT LOGS
// =========================

app.get("/logs", (req, res) => {

  db.all(
    `
    SELECT * FROM audit_logs
    ORDER BY created_at DESC
    `,
    (err, rows) => {

      if (err) {

        res.status(500).json({
          error: err.message
        });

        return;

      }

      res.json(rows);

    }
  );

});

// =========================
// MANUAL OVERRIDE
// =========================

app.post("/override/:city", (req, res) => {

  const city = req.params.city;

  db.run(
    `
    UPDATE line_items
    SET manual_override = 1
    WHERE city = ?
    `,
    [city],

    function(err) {

      if (err) {

        res.status(500).json({
          error: err.message
        });

        return;

      }

      res.json({
        message:
          `Manual override enabled for ${city}`
      });

    }
  );

});

// =========================
// START SERVER
// =========================

app.listen(3000, () => {

  console.log(
    "DynaMo server running on http://localhost:3000"
  );

});