  const path = require('path');
  const http = require('http');
  const express = require('express');
  const app = express();
  const swaggerTools = require('swagger-tools');
  const cors = require('cors');
  const YAML = require('yamljs');
  const session = require('express-session');
  const swaggerConfig = YAML.load('./api/swagger.yaml');
  const connect = require('./models/db')

  
  module.exports = app;

  app.use(cors());

  app.use(session({
    secret: 'your_secret_key', // Replace with your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  }));

  // // IP Whitelist
  // const whitelist = ['49.207.52.220'];

  // app.use((req, res, next) => {
  //   console.log(req.ip)
  //     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //     if (whitelist.includes(ip)) {
  //         next();
  //     } else {
  //         res.status(403).send('Forbidden');
  //     }
  // });

  // app.use(favicon());
  app.use(express.static(path.join(__dirname, 'public')));

  const serverPort = 6003;
    
  // swaggerRouter configuration
  const options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './api/controllerLogic'),
    useStubs: true, // Conditionally turn on stubs (mock mode)
  };
  
  // Initialize the Swagger middleware
  swaggerTools.initializeMiddleware(swaggerConfig, (middleware) => {
    // Interpret Swagger resources and attach
    // metadata to request - must be first in swagger-tools middleware chain
    app.use('/', middleware.swaggerMetadata());
    
    // Validate Swagger requests
    app.use('/', middleware.swaggerValidator());
  
    // Route validated requests to appropriate controller
    app.use('/', middleware.swaggerRouter(options));
  
    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());
  
    app.use('/payment', middleware.swaggerUi());
  
    // Start the server
    http.createServer(app).listen(serverPort, () => {
      connect()
      console.log(
        'Your server is listening on port %d (http://localhost:%d)',
        serverPort,
      );
      console.log(
        'Swagger-ui is available on http://localhost:%d/docs',
        serverPort,
      );
    });
  });