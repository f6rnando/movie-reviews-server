const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
  host: 'host.docker.internal',
  user: 'root',
  password: 'rootuser',
  database: 'cruddb'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/movies', (req, res) => {
  const select = "SELECT * FROM cruddb.movie_reviews";
  db.query(select, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.post('/movies/add', (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const insert = "INSERT INTO cruddb.movie_reviews (movieName, movieReview) VALUES (?,?)";
  db.query(insert, [movieName, movieReview], (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/movies/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM cruddb.movie_reviews WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/movies/update/:id', (req, res) => {
  const id = req.params.id;
  const movieReview = req.body.newReview;
  const sql = "UPDATE cruddb.movie_reviews SET movieReview = ? WHERE id = ?";
  db.query(sql, [movieReview, id], (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
