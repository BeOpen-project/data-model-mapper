module.exports = () => {
  const routes = require("./api/routes/router.js")
  const express = require("express");
  const mongoose = require("mongoose");
  const cors = require('cors');
  const config = require('../../config')
  const swaggerUi = require('swagger-ui-express');
  let swaggerDocument = require('./swagger.json');
  const service = require("./api/services/service.js")
  const log = require('../utils/logger')//.app(module);
  //const {trace, debug, info, warn, err} = log
  //const e = log.error
  //function logger(fn, ...msg) { fn(__filename, ...msg) }

  const { Logger } = log
  const logger = new Logger(__filename)

  const dmmServer = express();

  swaggerDocument.host = config.host + (config.externalPort ? ":" + (config.externalPort || 5500) : "")
  if (config.basePath)
    swaggerDocument.basePath = config.basePath

  dmmServer.use(cors());
  dmmServer.use(express.json());
  dmmServer.use(express.urlencoded({ extended: false }));
  dmmServer.use(service.resetConfig)
  dmmServer.use(config.basePath || "/api", routes);
  dmmServer.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );

  function init() {
    mongoose
      .connect(config.mongo, { useNewUrlParser: true })
      .then(() => {
        dmmServer.listen(config.httpPort || 5500, () => {
          logger.info("Server has started!");
          logger.info("listening on port: " + config.httpPort || 5500);
          config.backup = JSON.parse(JSON.stringify(config))
          logger.info({ test: "test new logger" })

          /*if (config.writers.filter(writer => writer == "minioWriter")[0]) {
            const minioWriter = require('../writers/minioWriter')
            logger.info("Minio connection enabled")
          }*/
        });

      })
  }

  init()
}
