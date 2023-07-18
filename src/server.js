const express = require("express");
const mysql = require('mysql');
const cors = require('cors');




const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'HarshPatel@2023',
  database: 'second',
  insecureAuth: true
});

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }

  console.log('Connected to MySQL database!');
  // You can perform database operations here
});

app.use(cors({
  origin: '*'
}));

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/status", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

app.get("/students/get-all", async (request, response) => {
  try {
    const query = 'SELECT * FROM second.students';
    const users = await executeQuery(query);
    response.json(users);
    console.log(query);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'An error occurred.' });
  }
});





















// Close the connection when you're done
process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection:', err);
      return;
    }
    console.log('MySQL connection closed.');
    process.exit(0);
  });
});
