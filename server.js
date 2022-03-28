require('dotenv').config();
const multer = require('multer');
const fs = require('fs');
const { Client } = require('pg');
var Batch = require('batch'),
  batch = new Batch();
const { sequelize } = require('./models');
const { QueryTypes } = require('@sequelize/core');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Golegal API',
      description: 'Golegal API description',
      contact: {
        name: '',
      },
      servers: ['http://localhost:8000', 'https://golegalapi.herokuapp.com'],
    },
  },
  //['.routes/*.js']
  apis: ['server.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(
  '/api/golegal/documentation',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);
// Routes
/**
 * @swagger
 * definitions:
 *   Script:
 *     type: object
 *     properties:
 *      script:
 *        type: string
 *        description: SQL scripting for postgresql
 *        example: CREATE TABLE action_participant_custom_data_values...
 */
/**
 *@swagger
 * tags:
 * - name: "Golegal"
 *   description: "Operations about Golegal"
 * paths:
 *  /api/golegal:
 *    get:
 *       tags:
 *       - "Golegal"
 *       summary: get all tables
 *       description: Use to get all tables
 *       responses :
 *          200:
 *             description: A successful response
 *          500:
 *            description: Failure of response
 *  /api/golegal/{table_slug}:
 *    get:
 *       tags:
 *       - "Golegal"
 *       summary: get all data by table slug
 *       description: Use to get all data by table slug in the data base
 *       parameters:
 *         - in: path
 *           name: table_slug
 *           schema:
 *             type: string
 *           required: true
 *           description: Table name
 *           example: action_participant_custom_data_values
 *       responses :
 *          200:
 *             description: A successful response
 *          500:
 *            description: Failure of response
 *  /api/golegal/uploadfile:
 *    post:
 *       tags:
 *       - "Golegal"
 *       summary: create data tables and load data in the data base
 *       description: Use to create data tables and to load data in the data base
 *       parameters:
 *         - in: body
 *           name: body
 *           required: true
 *           description: Body of request
 *           schema:
 *             $ref: '#/definitions/Script'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Script'
 *       responses :
 *          200:
 *             description: A successful response
 *          500:
 *            description: Failure of response
 */
app.use('/api/golegal', require('./routes/ordersRoutes'));

// Upload file
// SET STORAGE
const regex = new RegExp('[^.]+$');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.match(regex);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.post(
  '/api/golegal/uploadfile',
  upload.single('script'),
  async (req, res, next) => {
    try {
      const file = req.file;
      const client = new Client();
      if (!file) return res.status(500).json({ msg: 'Please upload a file' });

      const extension = file.originalname.match(regex);
      if (extension != 'sql')
        return res.status(400).json({ msg: 'Please upload a sql file' });
      const path = __dirname + '/uploads/' + file.originalname;
      const queries = fs
        .readFileSync(path)
        .toString()
        .replace(/(\r\n|\n|\r)/gm, ' ') //remove newlines
        .replace(/\s+/g, ' ') //excess white space
        .split(';') //split into all statements
        .map(Function.prototype.call, String.prototype.trim)
        .filter(function (el) {
          return el.length != 0;
        }); //remove any empty ones
      const [results, metadata] = await sequelize.query(queries.join(';'));
      fs.unlinkSync(path);
      res.send({ msg: 'Success' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
