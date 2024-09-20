const keys = require("./keys");

// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

// Create tables if they don't exist
pgClient.on("connect", client => {
  client
    .query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        shift VARCHAR(20),
        team VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (team, shift, username) -- Ensuring unique combinations
      );
      
      CREATE TABLE IF NOT EXISTS values (
        id SERIAL PRIMARY KEY,
        number INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
    .catch(err => console.log("PG ERROR", err));
});

// Express route definitions
app.get("/", (req, res) => {
  res.send("Hi");
});

// Get all values
app.get("/values/all", async (req, res) => {
  try {
    const result = await pgClient.query("SELECT * FROM values");
    res.send(result.rows);
  } catch (err) {
    console.error("Error fetching values:", err);
    res.status(500).send("Error fetching values");
  }
});

// Insert a new value
app.post("/values", async (req, res) => {
  const { value } = req.body;
  if (value === undefined) {
    return res.status(400).send({ working: false, message: "Value is required" });
  }

  try {
    await pgClient.query("INSERT INTO values(number) VALUES($1)", [value]);
    res.send({ working: true });
  } catch (err) {
    console.error("Error inserting value:", err);
    res.status(500).send("Error inserting value");
  }
});


// Register route (for user registration)
app.post("/register", async (req, res) => {
  const { username, password, shift, team } = req.body;

  if (!username || !password || !shift || !team) {
    return res.status(400).send({ working: false, message: "Username, password, shift, and team are required" });
  }

  try {
    // Check how many users are registered for the given team and shift
    const countResult = await pgClient.query(
      "SELECT COUNT(*) FROM users WHERE shift = $1 AND team = $2",
      [shift, team]
    );

    const count = parseInt(countResult.rows[0].count, 10);

    if (count >= 2) {
      return res.status(409).send({ working: false, message: "Team limit reached for this shift." });
    }

    // Insert the new user
    await pgClient.query(
      "INSERT INTO users(username, password, shift, team) VALUES($1, $2, $3, $4)",
      [username, password, shift, team]
    );

    res.send({ working: true, message: "Registration successful" });
  } catch (err) {
    console.error("Error inserting user:", err);
    if (err.code === '23505') { // Unique violation error
      return res.status(409).send({ working: false, message: "User already registered for this team and shift" });
    }
    res.status(500).send({ working: false, message: "Error registering user" });
  }
});



// Get all users
app.get("/users/all", async (req, res) => {
  try {
    const result = await pgClient.query("SELECT * FROM users");
    res.send(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users");
  }
});



// Login route
app.post("/users", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ working: false, message: "Username and password are required" });
  }

  try {
    const result = await pgClient.query("SELECT * FROM users WHERE username = $1", [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Check if password matches (for simplicity, comparing plain text passwords)
      if (user.password === password) {
        return res.send({ working: true, message: "Login successful" });
      } else {
        return res.status(401).send({ working: false, message: "Invalid credentials" });
      }
    } else {
      return res.status(404).send({ working: false, message: "User not found" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).send({ working: false, message: "Error logging in" });
  }
});

// Route to delete all users and values
app.delete("/clear-data", async (req, res) => {
  try {
    await pgClient.query("DELETE FROM users");
    res.send({ working: true, message: "All data cleared" });
  } catch (err) {
    console.error("Error clearing data:", err);
    res.status(500).send({ working: false, message: "Error clearing data" });
  }
});

// Start the server
app.listen(5000, err => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log("Listening on port 5000");
  }
});
