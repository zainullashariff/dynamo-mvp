const sqlite3 = require("sqlite3").verbose();

// Create database file

const db = new sqlite3.Database("./dynamo.db");

// Run setup safely

db.serialize(() => {

  console.log("Creating tables...");

  // =========================
  // LINE ITEMS TABLE
  // =========================

  db.run(`
    CREATE TABLE IF NOT EXISTS line_items (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      city TEXT,

      creative TEXT,

      state TEXT,

      bid REAL,

      daily_budget REAL,

      reason TEXT,

      weather TEXT,

      manual_override INTEGER DEFAULT 0,

      updated_at TEXT
    )
  `);

  // =========================
  // AUDIT LOG TABLE
  // =========================

  db.run(`
    CREATE TABLE IF NOT EXISTS audit_logs (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      city TEXT,

      creative TEXT,

      old_state TEXT,

      new_state TEXT,

      message TEXT,

      created_at TEXT
    )
  `);

  console.log("Tables created!");

  // =========================
  // STARTER ADS
  // =========================

  const starterItems = [

    ["Mumbai", "Beat the Heat", "paused"],
    ["Mumbai", "Rainy Day Pick Me Up", "paused"],
    ["Mumbai", "Refresh Anytime", "active"],

    ["Delhi", "Beat the Heat", "paused"],
    ["Delhi", "Rainy Day Pick Me Up", "paused"],
    ["Delhi", "Refresh Anytime", "active"],

    ["Bangalore", "Beat the Heat", "paused"],
    ["Bangalore", "Rainy Day Pick Me Up", "paused"],
    ["Bangalore", "Refresh Anytime", "active"],

    ["Chennai", "Beat the Heat", "paused"],
    ["Chennai", "Rainy Day Pick Me Up", "paused"],
    ["Chennai", "Refresh Anytime", "active"]

  ];

  // =========================
  // CHECK IF DATA ALREADY EXISTS
  // =========================

  db.get(
    `
    SELECT COUNT(*) as count
    FROM line_items
    `,
    (err, row) => {

      if (err) {

        console.log(err);

        return;

      }

      // Only insert if table is empty

      if (row.count === 0) {

        console.log("Inserting starter ads...");

        starterItems.forEach((item) => {

          db.run(
            `
            INSERT INTO line_items
            (
              city,
              creative,
              state,
              bid,
              daily_budget,
              reason,
              weather,
              updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
              item[0],
              item[1],
              item[2],
              10,
              1000,
              "Initial setup",
              "Unknown",
              new Date().toISOString()
            ]
          );

        });

        console.log("Starter ads inserted!");

      }

      else {

        console.log("Starter ads already exist.");

      }

    }
  );

});

module.exports = db;