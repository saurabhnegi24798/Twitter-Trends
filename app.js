const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const path = require('path')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "frontend", "build")));


app.use('/api', require('./routes/api.route'));

app.get('*', async (req, res, next) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
});


app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
