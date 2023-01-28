const { app } = require("./app");
const { sequelize } = require("./utils/database");
const { initModels } = require("./utils/initModels");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



sequelize
  .authenticate()
  .then(() => console.log("Database authenticated"))
  .catch((err) => console.log(err));

initModels();

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log(err));



const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});



const swaggerDefinition = {
  info: {
    title: 'psql Registration Swagger API',
    version: '1.0.0',
    description: 'Endpoints to test the user registration routes',
  },
  host: 'localhost:5050',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options); app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 