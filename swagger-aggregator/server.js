const express = require('express');
const swaggerCombine = require('swagger-combine');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();
const PORT = 4000; // Port for the aggregation service

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Configuration for swagger-combine
const swaggerConfig = {
  swagger: '2.0',
  info: {
    title: 'Unified API Documentation',
    version: '1.0.0',
  },
  apis: [
    { url: 'http://book-service:3000/api-json' },
    { url: 'http://order-service:3000/api-json' },
    { url: 'http://customer-service:3000/api-json' },
  ],
  basedir: __dirname, // necessary for swagger-combine
  files: [],
};

// Custom CSS to change the topbar color and hide the default logo
const customCss = `
.swagger-ui .topbar {
  background-color: #201821; /* Your desired color */
}
.swagger-ui .topbar .swagger-ui-logo {
  display: none;
}
`;

// Endpoint to serve aggregated Swagger JSON
app.get('/docs-json', async (req, res) => {
  try {
    const combinedSwagger = await swaggerCombine(swaggerConfig);
    res.json(combinedSwagger);
  } catch (error) {
    console.error('Error combining Swagger docs:', error);
    res.status(500).send('Error combining Swagger docs');
  }
});

// Serve Swagger UI with aggregated Swagger JSON and customizations
app.use('/docs', swaggerUi.serve, async (req, res, next) => {
  try {
    const combinedSwagger = await swaggerCombine(swaggerConfig);
    swaggerUi.setup(combinedSwagger, {
      customCss: customCss,
      customJs: '/custom.js',
      customSiteTitle: "Unified Api Documentation",
    })(req, res, next);
  } catch (error) {
    console.error('Error setting up Swagger UI:', error);
    res.status(500).send('Error setting up Swagger UI');
  }
});

app.listen(PORT, () => {
  console.log(`Unified Swagger docs available at http://localhost:${PORT}/docs`);
});
