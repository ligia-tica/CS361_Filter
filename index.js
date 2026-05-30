const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, '../MainProgram/server/data.json');

app.use(cors());
app.use(express.json());

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

// GET - Filter by exercise and/or date
app.get('/api/filter', (req, res) => {
  const { exercise, date } = req.query;
  const data = readData();
  let workouts = data.workouts;

  if (!exercise && !date) {
    return res.status(400).json({ error: "Please provide at least one filter: exercise or date." });
  }

  if (exercise) {
    workouts = workouts.filter(w =>
      w.exercise.toLowerCase().includes(exercise.toLowerCase())
    );
  }

  if (date) {
    workouts = workouts.filter(w => w.date === date);
  }

  res.status(200).json(workouts);
});

app.listen(3004, () => console.log('Filter service running on port 3004'));