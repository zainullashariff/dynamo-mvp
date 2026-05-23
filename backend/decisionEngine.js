const db = require("./database");

// Main decision engine

async function updateAds(weatherData) {

  const city = weatherData.city;

  let activeCreative = "";

  // =========================
  // DECIDE WINNING CREATIVE
  // =========================

  if (weatherData.condition === "rainy") {

    activeCreative = "Rainy Day Pick Me Up";

  }

  else if (weatherData.condition === "hot") {

    activeCreative = "Beat the Heat";

  }

  else {

    activeCreative = "Refresh Anytime";

  }

  // =========================
  // GET ALL ADS FOR CITY
  // =========================

  db.all(
    `
    SELECT * FROM line_items
    WHERE city = ?
    `,
    [city],

    (err, rows) => {

      if (err) {

        console.log(err);

        return;

      }

      rows.forEach((row) => {

        // =========================
        // SKIP MANUAL OVERRIDE
        // =========================

        if (row.manual_override === 1) {

          console.log(
            `${city} is under manual override`
          );

          return;

        }

        // =========================
        // DECIDE ACTIVE / PAUSED
        // =========================

        const newState =
          row.creative === activeCreative
            ? "active"
            : "paused";

        // =========================
        // ONLY UPDATE IF CHANGED
        // =========================

        if (row.state !== newState) {

          // =========================
          // UPDATE DATABASE
          // =========================

          db.run(
            `
            UPDATE line_items
            SET
              state = ?,
              reason = ?,
              weather = ?,
              updated_at = ?
            WHERE id = ?
            `,
            [
              newState,

              `Weather is ${weatherData.condition}`,

              JSON.stringify(weatherData),

              new Date().toISOString(),

              row.id
            ]
          );

          // =========================
          // CREATE AUDIT LOG
          // =========================

          db.run(
            `
            INSERT INTO audit_logs
            (
              city,
              creative,
              old_state,
              new_state,
              message,
              created_at
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
              city,

              row.creative,

              row.state,

              newState,

              `${row.creative} changed because weather is ${weatherData.condition}`,

              new Date().toISOString()
            ]
          );

          // =========================
          // CLEAN TERMINAL LOG
          // =========================

          console.log(
            `${city} → ${row.creative} is now ${newState}`
          );

        }

      });

    }

  );

}

module.exports = {
  updateAds
};