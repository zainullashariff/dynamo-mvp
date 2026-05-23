const db = require("./database");

// ==========================================
// MAIN DECISION ENGINE
// ==========================================

async function updateAds(weather) {

  const city = weather.city;

  let activeCreative = "";

  let reason = "";

  // ==========================================
  // DETERMINE WHICH CREATIVE SHOULD RUN
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
  // GET ALL ADS FOR THIS CITY
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
            `${city} skipped due to manual override`
          );

          return;

        }

        // ==========================================
        // DECIDE ACTIVE VS PAUSED
        // ==========================================

        const newState =

          row.creative === activeCreative
            ? "active"
            : "paused";

        // ==========================================
        // ONLY UPDATE IF STATE CHANGED
        // ==========================================

        if (row.state !== newState) {

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
          // WRITE AUDIT LOG
          // ==========================================

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

        // ==========================================
        // UPDATE REASON EVEN IF STATE DIDN'T CHANGE
        // ==========================================

        else {

          db.run(

            `
            UPDATE line_items
            SET reason = ?
            WHERE id = ?
            `,

            [reason, row.id]

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