require('dotenv').config();
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
      servers: ['http://localhost:8000'],
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
 *            description: Failure of data recovery
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
 *            description: Failure of data recovery
 *  /api/golegal/load:
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
 *            description: Failure of data recovery
 */
app.use('/api/golegal', require('./routes/ordersRoutes'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
