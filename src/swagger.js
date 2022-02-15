const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require("swagger-ui-express")




const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Study Api",
            version: "1.0.0",
            description: "API for Study"
        },
        server: [
            { url: "http://localhost:3000", }
        ],
    },
    apis: ["./index.js"]


}
const specs = swaggerJSDoc(options)

module.exports = specs