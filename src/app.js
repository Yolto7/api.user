
const express = require('express');
const routes = require('./controllers/routes');
const cors = require('cors');
const { dbConnection } = require("./config/database");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT

//DATABASE
dbConnection()

//MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.use("/user", routes);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
}).on('error', (err) => {
  console.log(err)
})