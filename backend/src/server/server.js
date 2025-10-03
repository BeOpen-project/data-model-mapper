const utils = require("../utils/utils.js")
utils.init()
module.exports = () => {
  const routes = require("./api/routes/router.js")
  const express = require("express");
  const mongoose = require("mongoose");
  const cors = require('cors');
  const config = require('../../config')
  const swaggerUi = require('swagger-ui-express');
  let swaggerDocument = require('./swagger/swagger.json');
  let minioDocument = require('./swagger/minio.json');
 // const service = require("./api/services/service.js")
  const log = require('../utils/logger')//.app(module);
  //const {trace, debug, info, warn, err} = log
  //const e = log.error
  //function logger(fn, ...msg) { fn(__filename, ...msg) }
  const { type } = require('os');

  const { Logger } = log
  const logger = new Logger(__filename)

  const dmmServer = express();

  swaggerDocument.host = (config.host == "host.docker.internal" ? "localhost" : config.host) + (config.externalPort ? ":" + (config.externalPort || 5500) : "")
  if (config.basePath)
    swaggerDocument.basePath = config.basePath
  /*
    for (let path in minioDocument.paths)
      swaggerDocument.paths[path] = minioDocument.paths[path]
  */
  let path = "/minio/getObject/{bucketName}/{objectName}"
  swaggerDocument.paths[path] = minioDocument.paths[path]
  dmmServer.use(express.json({ limit: '50mb' }));
  dmmServer.use(express.urlencoded({ limit: '50mb', extended: false }));
  dmmServer.use(cors());
  dmmServer.use(express.json());
  //dmmServer.use(service.resetConfig)
  dmmServer.use(config.basePath || "/api", routes);
  dmmServer.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );

  function getOs() {
    /*const { exec } = require('child_process');

    exec('pwd', (error, stdout, stderr) => {
      if (error) {
        logger.error(`Error: ${error}`);
        //return;
      }
      if (stderr) {
        logger.error(`Stderr: ${stderr}`);
        //return;
      }

      const currentDirectory = stdout.trim();*/
    return type()
  }

  function init() {


    mongoose
      //.connect((currentDirectory == "/app" ? config.mongo.replace(/localhost/g, 'host.docker.internal') : config.mongo), { useNewUrlParser: true })
      .connect((!getOs().startsWith("Windows") ? config.mongo.replace(/localhost/g, 'host.docker.internal') : config.mongo), {})
      .then(() => {
        dmmServer.listen(config.httpPort || 5500, () => {
          logger.info("Server has started!");
          logger.info("listening on port: " + config.httpPort || 5500);
          //config.backup = JSON.parse(JSON.stringify(config))
          logger.info({
            logLevel: config.logLevel,
            activeWriters: config.writers
          })

          /*if (config.writers.filter(writer => writer == "minioWriter")[0]) {
            const minioWriter = require('../writers/minioWriter')
            logger.info("Minio connection enabled")
          }*/
        });
      })
    //});
  }

  init()
}
