const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Documentation for the API",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 8080}/api/v1`,
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "Coupons",
      description: "Operations related to coupons",
    },
    {
      name: "default",
      description: "Operations related to users",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Coupon: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "60c72b2f9b1e8a001f8e4cbb",
          },
          code: {
            type: "string",
            example: "PRIMERPEDIDO",
          },
          discount: {
            type: "number",
            example: 10,
            description: "Discount percentage applied to the order total",
          },
          expiresAt: {
            type: "string",
            format: "date-time",
            example: "2025-13-31T23:59:59Z",
          },
          isActive: {
            type: "boolean",
            example: true,
          },
        },
      },

      CouponInput: {
        type: "object",
        properties: {
          code: {
            type: "string",
            example: "PRIMERPEDIDO",
          },
          discount: {
            type: "number",
            example: 10,
          },
          expiresAt: {
            type: "string",
            format: "date-time",
            example: "2025-12-31T23:59:59Z",
          },
          isActive: {
            type: "boolean",
            example: true,
          },
        },
      },

      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "60c72b2f9b1e8a001f8e4caa",
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            example: "jhon.doe@example.com",
          },
          roles: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["user"],
          },
        },
      },
      UserInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            example: "jhon.doe@exmaple.com",
          },
          password: {
            type: "string",
            example: "password123",
          },
          roles: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["user"],
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/presentation/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
