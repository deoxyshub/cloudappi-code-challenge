'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

    
var app = require('connect')();
var swagger = require('swagger-tools');
var jsyaml = require('js-yaml');
var cors = require('cors');

var config = require('config');
var serverHost = config.get('server.host');
var serverPort = config.get('server.port');
var environment = process.env.NODE_ENV || 'development';

var corsOptions = config.get('cors');

// swaggerRouter configuration
var swaggerRouterOptions = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: environment === 'development' // Conditionally turn on stubs (mock mode)
};

console.log('[%s]', environment.toUpperCase());

var spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

swagger.initializeMiddleware(swaggerDoc, function (middleware) {

  app.use(cors(corsOptions));

  // Interpret Swagger resources and attach metadata to request
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(swaggerRouterOptions));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Server running at http://%s:%d/', serverHost, serverPort);
    console.log('Swagger-ui is available on http://%s:%d/docs', serverHost, serverPort);
  });
});
