/*******************************************************************************
 * Data Model Mapper
 *  Copyright (C) 2019 Engineering Ingegneria Informatica S.p.A.
 *  
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *  
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 ******************************************************************************/

//'use strict';
const schemaHandler = require('../schemaHandler.js');
const mapHandler = require('../mapHandler.js');
const csvParser = require("../parsers/csvParser.js");
const geoParser = require("../parsers/geoJsonParser.js");
const jsonParser = require("../parsers/jsonParser.js");
const orionWriter = require("../writers/orionWriter");
const fileWriter = require("../writers/fileWriter");
const log = require('../utils/logger')//.app(module);
const { Logger } = log
const logger = new Logger(__filename)
const report = require('../utils/logger').report;
const utils = require('../utils/utils.js');
const common = require('../utils/common.js');
const config = require("../../config.js");
const { load } = require('nconf');


config.validCount = 0;
config.unvalidCount = 0;
config.orionWrittenCount = 0;
config.orionUnWrittenCount = 0;
config.orionSkippedCount = 0;
config.fileWrittenCount = 0;
config.fileUnWrittenCount = 0;
config.rowNumber = 0;

var promises = [];

const processSource = async (sourceData, sourceDataType, mapData, dataModelSchemaPath) => {

    reinitializeProcessStatus();

    if (dataModelSchemaPath && mapData) {

        logger.debug("dataModelSchemaPath && mapData")

        if (sourceData) {

            logger.debug("sourceData:");
            logger.debug(sourceData);
            logger.debug(typeof sourceData)

            if (typeof sourceData === 'object') sourceData = sourceData.toString()
            logger.debug(sourceData);

            if (typeof sourceData === 'string') {

                sourceData = utils.parseFilePath(sourceData);

                for (let i in sourceData)
                    if (sourceData[i][sourceData[i].length - 1] == ",")
                        sourceData[i] = sourceData[i].slice(0, sourceData[i].length - 1)

                var extension = sourceData.ext;
                if (!extension) {
                    // No file path provided nor dataType
                    logger.error('The provided url/file path does not have file extension');
                    return Promise.reject('The provided url / file path does not have file extension');
                }

            } else if (!sourceDataType) {
                // No file path provided nor dataType
                logger.error('No file path provided nor dataType');
                return Promise.reject('No file path provided nor dataType');
            }

            if (typeof mapData === 'string' && !mapData.startsWith("{")) {
                mapData = utils.parseFilePath(mapData);
                logger.debug("typeof mapData === 'string' && !mapData.startsWith({})");
            }

            try {
                // Load Map form file/url or directly as object
                var map = await mapHandler.loadMap(mapData[1] == "mapData" ? mapData[0] : mapData); // map is the file map loaded
                logger.debug("map is the file map loaded")
            } catch (error) {
                logger.error('There was an error while loading Map: ');
                logger.error(error)
                return Promise.reject('There was an error while loading Map: ' + error);
            }


            if (map) {
                logger.info('Map loaded');

                try {

                    // Load Data Model Schema from either map field "TargetDataModel", url or local file
                    let targetDataModel;
                    if ((targetDataModel = map['targetDataModel']) !== undefined) {
                        /* Check if provided TargetDataModel is valid, otherwise return error */
                        if ((dataModelSchemaPath = utils.getDataModelPath(targetDataModel)) === undefined) {
                            logger.error("Incorrect target Data Model name: " + targetDataModel);
                            process.res?.status(400).json({ "error": "Incorrect target Data Model name: " + targetDataModel })
                            return Promise.reject("Incorrect target Data Model name");
                        }
                    }
                    delete map['targetDataModel'];
                    var loadedSchema = await schemaHandler.parseDataModelSchema(dataModelSchemaPath); // here schema is loaded
                    logger.info('Data Model Schema loaded and dereferenced');

                } catch (error) {
                    logger.error('There was an error while processing Data Model schema: ');
                    logger.error(error)
                    if (common.schema)
                        loadedSchema = JSON.parse(JSON.stringify(common.schema))
                    else
                        return Promise.reject(error);
                }

                logger.info('Starting to Map Source Object');

                switch (extension || sourceDataType.toLowerCase()) {

                    case '.txt':
                    case 'txt':
                        csvParser.sourceDataToRowStream(sourceData, map, loadedSchema, processRow, processMappedObject, finalizeProcess);
                        break;
                    case '.csv':
                    case 'csv':
                        csvParser.sourceDataToRowStream(sourceData, map, loadedSchema, processRow, processMappedObject, finalizeProcess);
                        break;
                    case '.json':
                    case 'json':
                        await jsonParser.sourceDataToRowStream(sourceData, map, loadedSchema, processRow, processMappedObject, finalizeProcess);
                        break;
                    case '.geojson':
                    case 'geojson':
                        geoParser.sourceDataToRowStream(sourceData, map, loadedSchema, processRow, processMappedObject, finalizeProcess);
                        break;
                    default:
                        break;
                }
                return await Promise.resolve("OK");

            } else {
                logger.error('There was an error while loading Map File');
                return await Promise.reject('There was an error while loading Map File');
            }

        } else {
            logger.error('The source Data is not a valid file nor a valid path/url: ');
            return await Promise.reject('The source Data is not a valid file nor a valid path/url');
        }

    } else if (!dataModelSchemaPath) {
        logger.error('Data Model Schema path not specified');
        return await Promise.reject('Data Model Schema path not specified');
    } else {
        logger.error('Map path not specified');
        return await Promise.reject('Map path not specified');
    }


};


const processRow = async (rowNumber, row, map, schema, mappedHandler) => {

    /** If any, extract site, service and group for Id Pattern from Map and 
     * set globally for each row of this mapping, otherwise use the ones initialized in the Global Vars 
     **/

    config.idSite = map['idSite'] || config.idSite;
    config.idService = map['idService'] || config.idService;
    config.idGroup = map['idGroup'] || config.idGroup;
    delete map['idSite'];
    delete map['idService'];
    delete map['idGroup'];
    try {
        var result = mapHandler.mapObjectToDataModel(rowNumber, utils.cleanRow(row), map, schema, config.idSite, config.idService, config.idGroup, config.entityNameField);
    }
    catch (error) {
        logger.error(error.message)
    }

    logger.debug("Row: " + rowNumber + " - Object mapped correctly ");
    logger.debug("Result: " + JSON.stringify(result))
    await mappedHandler(rowNumber, result, schema);

};

const processMappedObject = async (objNumber, obj, modelSchema) => {
    try {
        config.writers.forEach(async (writer) => {

            switch (writer) {

                case 'orionWriter':
                    try {
                        logger.debug("obj : " + JSON.stringify(obj))
                        promises.push(await orionWriter.writeObject(objNumber, obj, modelSchema));
                    }
                    catch (error) {
                        logger.error(error.toString())
                        logger.debug(JSON.stringify(error))
                    }
                    break;
                case 'fileWriter':
                    promises.push(await fileWriter.writeObject(objNumber, obj, config.fileWriter.addBlankLine));
                    break;
                default:
                    promises.push(await common.sleep(0));
                    break;
            }
        });
    }
    catch (error) {
        logger.error(error.toString())
        logger.debug(JSON.stringify(error))
    }
};

const finalizeProcess = async () => {

    try {
        await Promise.all(promises);

        //WARNING: this indeed restore global env but brokes the orion request
        /* If server mode, restore current per request configuration to the default ones */
        //if (config.mode.toLowerCase() === 'server')
        //utils.restoreDefaultConfs();

        // Wait until all promises resolve (defined and pushed in processMappedObject handler)
        if (utils.isFileWriterActive()) {
            await fileWriter.finalize(); // Finalize file in case of using fileWriter
            await fileWriter.checkAndPrintFinalReport();
        }

        if (utils.isOrionWriterActive()) {
            await orionWriter.checkAndPrintFinalReport();
        }

        await utils.printFinalReportAndSendResponse(log);
        await utils.printFinalReportAndSendResponse(report);

        return await Promise.resolve();

    } catch (error) {
        logger.error(error)
        return await Promise.reject(error);
    }
};

/**
 * Reset Process variables for next iteration
 **/
const reinitializeProcessStatus = () => {

    config.validCount = 0;
    config.unvalidCount = 0;
    config.orionWrittenCount = 0;
    config.orionUnWrittenCount = 0;
    config.orionSkippedCount = 0;
    config.fileWrittenCount = 0;
    config.fileUnWrittenCount = 0;
    config.rowNumber = 0;
    promises = [];

};

module.exports = {
    processSource: processSource,
    reinitializeProcessStatus: reinitializeProcessStatus
};