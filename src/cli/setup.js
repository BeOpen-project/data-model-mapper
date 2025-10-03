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

const commandLine = require('../utils/confUtils');
const dmmProcess = require('../utils/process');
const config = require('../../config')

const log = require('../utils/logger')//.app(module);
const { Logger } = log
const logger = new Logger(__filename)
const utils = require('../utils/utils');

module.exports = async (sourceDataIn, mapPathIn, dataModelIn, schema, NGSI_entity, minioObj, config, res) => {
    logger.info("Initializing Mapper in " + (config.mode == "commandLine" ? "Command Line " : "Server ") + "Mode");

    if (Array.isArray(sourceDataIn)) sourceDataIn = sourceDataIn[0]

    if (commandLine.init(sourceDataIn, mapPathIn, dataModelIn, config)) {

        logger.debug("commandLine.init()");

        // file path or directly string/binary content 
        var sourceData = sourceDataIn || commandLine.getParam('sourceDataPath');
        var mapPath = mapPathIn || commandLine.getParam('mapPath');
        var dataModelPath = utils.getDataModelPath(dataModelIn) || commandLine.getParam('targetDataModel');

        try {
            await dmmProcess.processSource(sourceData, "", mapPath, dataModelPath, schema, NGSI_entity, minioObj, config, res)
        } catch (error) {
            logger.error(error)
            dmmProcess.dataModelMapper.setupError = error
            return error
        }

        logger.debug("process.processSource end")

    } else {
        logger.error(sourceDataIn, mapPathIn, dataModelIn, schema, NGSI_entity, minioObj, config, res.body, res.dmm)
        logger.error("There was an error while initializing Mapper configuration")
        if (!dmmProcess.dataModelMapper)
            dmmProcess.dataModelMapper = {}
        dmmProcess.dataModelMapper.setupError = "There was an error while initializing Mapper configuration"
    }
};

