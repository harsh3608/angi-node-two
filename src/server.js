const express = require("express");
const mysql = require('mysql');
//const sql = require("mssql/msnodesqlv8");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'HarshPatel@2023',
  database: 'second',
});


// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }

  console.log('Connected to MySQL database!');
  // You can perform database operations here
});

// Close the connection when you're done
connection.end();


// const config = {
//   server: 'DESKTOP-E4P3JV3\\SQLEXPRESS',
//   database: "NodeJSDatabase",
//   driver: "SQL Server ODBC DSN",
//   options: {
//     encrypt: true, // If your SQL Server uses SSL
//     trustedConnection: true, // Use Windows Authentication
//   },
// };

// const userTable = '[NodeJSDatabase].[dbo].[Students]';

// async function executeQuery(query) {
//   try {
//     await sql.connect(config);
//     const result = await sql.query(query);
//     return result.recordset;
//   } catch (err) {
//     console.error("Error executing query:", err);
//     throw err;
//   } finally {
//     sql.close();
//   }
// }



app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/status", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

app.get("/students/get-all",async  (request, response) => {
   try {
      const query = 'SELECT * FROM [NodeJSDatabase].[dbo].[Students]';
      //const users = await executeQuery(query);
      response.json(users);
      console.log(query);
    } catch (err) {
      response.status(500).json({ error: 'An error occurred.' });
    }
 })
