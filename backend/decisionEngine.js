const db = require("./database");

// ==========================================
// MAIN DECISION ENGINE
// ==========================================

async function updateAds(weather) {

  const city = weather.city;

  let activeCreative = "";

  let reason = "";

  // ==========================================
  // DETERMINE WHICH CREATIVE SHOULD BE ACTIVE
  // ==========================================

  if (weather.condition === "hot") {

    activeCreative = "Beat the Heat";

    reason = "Weather is hot";

  }

  else if (weather.condition === "rainy") {

    activeCreative = "Rainy Day Pick Me Up";

    reason = "Weather is rainy";

  }

  else {

    activeCreative = "Refresh Anytime";

    reason = "Weather is normal";

  }

  // ==========================================
  // GET ALL LINE ITEMS FOR CITY
  // ==========================================

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

        // ==========================================
        // SKIP MANUAL OVERRIDES
        // ==========================================

        if (row.manual_override === 1) {

          console.log(
            `${city} skipped because override is active`
          );

          return;

        }

        // ==========================================
        // DECIDE NEW STATE
        // ==========================================

        const newState =

          row.creative === activeCreative
            ? "active"
            : "paused";

        // ==========================================
        // UPDATE DATABASE
        // ==========================================

        db.run(

          `
          UPDATE line_items
          SET state = ?,
              reason = ?
          WHERE id = ?
          `,

          [newState, reason, row.id],

          function(err) {

            if (err) {

              console.log(err);

              return;

            }

            console.log(
              `${city} → ${row.creative} is now ${newState}`
            );

          }

        );

        // ==========================================
        // WRITE AUDIT LOG ONLY IF STATE CHANGED
        // ==========================================

        if (row.state !== newState) {

          db.run(

            `
            INSERT INTO audit_logs
            (message)
            VALUES (?)
            `,

            [
              `${row.creative} changed because ${reason.toLowerCase()}`
            ]

          );

        }

      });

    }

  );

}

// ==========================================
// EXPORT FUNCTION
// ==========================================

module.exports = {

  updateAds

};