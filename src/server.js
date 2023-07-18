const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();
app.use(express.json());

// Configure body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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
    //console.log(query);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'An error occurred.' });
  }
});

// POST route to add a student to the database
app.post('/students/add', async (req, res) => {
  const student = req.body;

  try {
    // Insert the student record into the database
    await executeQuery(`INSERT INTO second.students (Id, Name, Semester, Branch, Mobile, Result) VALUES ( ${student.Id}, '${student.Name}', '${student.Semester}', '${student.Branch}', ${student.Mobile}, '${student.Result}' )`);
    console.log('Student added to the database!');
    res.status(200).json({ message: 'Student added successfully!' });
  } catch (error) {
    console.error('Error inserting student: ', error);
    res.status(500).json({ error: 'Failed to add student.' });
  }
});


// GET route to fetch a student by ID
app.get('/students/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    // Fetch the student record from the database
    const query = `SELECT * FROM second.students WHERE id = ${studentId}`;
    const result = await executeQuery(query);

    if (result.length === 0) {
      res.status(404).json({ error: 'Student not found.' });
    } else {
      const student = result[0];
      res.status(200).json({ student });
    }
  } catch (error) {
    console.error('Error retrieving student: ', error);
    res.status(500).json({ error: 'Failed to fetch student.' });
  }
});


// PUT route to update a student by ID
app.put('/students/update/:id', async (req, res) => {
  const studentId = req.params.id;
  const updatedData = req.body;

  try {
    // Check if the student exists
    const checkQuery = `SELECT * FROM students WHERE id = ${studentId}`;
    const checkResult = await executeQuery(checkQuery);

    if (checkResult.length === 0) {
      res.status(404).json({ error: 'Student not found.' });
      return;
    }

    // Construct the SET clause for the update query
    let setClause = '';
    for (const key in updatedData) {
      if (setClause !== '') {
        setClause += ', ';
      }
      setClause += `${key} = '${updatedData[key]}'`;
    }

    // Update the student record in the database
    const updateQuery = `UPDATE students SET ${setClause} WHERE id = ${studentId}`;
    await executeQuery(updateQuery);

    console.log('Student record updated!');
    res.status(200).json({ message: 'Student record updated successfully!' });
  } catch (error) {
    console.error('Error updating student: ', error);
    res.status(500).json({ error: 'Failed to update student record.' });
  }
});


//DELETE Route to delete a student by id
app.delete('/students/delete/:id', async (req,res)=> {
  const studentId = req.params.id;

  try {
    // Check if the student exists
    const checkQuery = `SELECT * FROM second.students WHERE id = ${studentId}`;
    const checkResult = await executeQuery(checkQuery);

    if (checkResult.length === 0) {
      res.status(404).json({ error: 'Student not found.' });
      return;
    }

    // Delete the student record in the database
    const deleteQuery = `DELETE FROM second.students WHERE id = ${studentId}`;
    await executeQuery(deleteQuery);

    console.log('Student record deleted!');
    res.status(200).json({ message: 'Student record deleted successfully!' });


  } catch (error) {
    console.error('Error deleting student: ', error);
    res.status(500).json({ error: 'Failed to update student record.' });
  }
})













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
