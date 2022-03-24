require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express")

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
// app.use('/user', require('./routes/userRoute')); //Utilisateur

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
