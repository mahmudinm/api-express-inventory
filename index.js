import express from "express";
import cors from "cors";
import db from "./config/database.js";
import helmet from "helmet";
import Router from "./routes/routes.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
// import dotenv from "dotenv";

// dotenv.config();

const app  = express();
const port = 5000;

// Setting up bodyParser to use json and set it to req.body
app.use(fileUpload()); 
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
//   next();
// });

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// use router
app.use(Router);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});


// listen on port
app.listen(port, () => console.log('Server running at http://localhost:5000'));