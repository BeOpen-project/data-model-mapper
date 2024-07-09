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

const apiOutput = require('../server/api/services/service')
const config = require('../../config');
const base64 = require('./encoders/base64');
const path = require('path');
const pathParse = require('parse-filepath');
const isValidPath = require("is-valid-path");
const isFileStream = require('is-file-stream');
const extensionPattern = /\.[0-9a-z]+$/i;
const httpPattern = /http:\/\//g;
const filenameFromPathPattern = /^(.:)?\\(.+\\)*(.+)\.(.+)$/;
const minioWriter = require("../writers/minioWriter")
const { isMinioWriterActive, sleep } = require('./common')
const log = require('./logger')
const { Logger } = log
const logger = new Logger(__filename)

function ngsi() {
    return (((apiOutput.NGSI_entity == undefined) && config.NGSI_entity || apiOutput.NGSI_entity).toString() === 'true')
}

const cleanString = (string) => {
    var result = '';
    if (typeof string === 'string')
        result = string.replace(config.regexClean[ngsi() ? "default" : "custom"], ' ');

    return result;

};

const cleanIdString = (string) => {
    var result = '';
    if (typeof string === 'string')
        result = string.replace(config.regexClean[ngsi() ? "default" : "custom"], ' ')
            .replace(/à/g, 'a')
            .replace(/ù/g, 'u')
            .replace(/é|è/g, 'e')
            .replace(/ò/g, 'o');

    return result;
};


const cleanNumber = (number) => {
    return number;
};

const cleanPair = (key, value) => {


    if (value instanceof Array) {
        var arrayResult = {};
        var arrayValues = [];
        for (var i = 0; i < value.length; i++) {
            var elem = value[i];

            arrayValues[i] = cleanPair(key, elem).value;
        }
        arrayResult.key = cleanString(key);
        arrayResult.value = arrayValues;
        return arrayResult;

    } else if (value !== null && typeof value === 'object') {
        var result = {};
        var objResult = {};
        Object.keys(value).forEach(function (objKey) {
            var aux = cleanPair(objKey, value[objKey]);
            objResult[aux.key] = aux.value;
        });
        result.key = cleanString(key);
        result.value = objResult;
        return result;

    } else {

        var result = {};
        result.key = cleanString(key);
        if (typeof value === 'string')
            result.value = cleanString(value);
        else if (value !== null) {
            result.value = cleanNumber(value);
        }
        else
            result.value = '';

        return result;
    }
};

const cleanRow = (row) => {

    var result = {};

    Object.keys(row).forEach(function (key) {
        var value = row[key];
        var newPair = cleanPair(key, value);
        result[newPair.key] = newPair.value;
    });

    return result;
};

const uuid = () => {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
};


/* Create Final SynchroniCity id, according to defined Id Pattern
 * 
 *  If the entityName is not empty
 *     if it isIdPrefix, concatenate entityName with rowNumber
 *     else use only EntityName (should have a mapped unique value)
 *  else
 *     use as entityName the sourcefilename + rowNumber
 * 
 * 
 */
const createSynchId = (type, site, service, group, entityName, isIdPrefix, rowNumber) => {
    if (type === undefined)
        type = "SomeType"
    if (entityName) {
        if (isIdPrefix)
            entityName = ('' + entityName).replace(/\s/g, "") + "-" + rowNumber;
        else
            entityName = ('' + entityName).replace(/\s/g, "");
    } else {
        entityName = extractFilenameFromPath(config.sourceDataPath.replace(/\s/g, "") + "-" + rowNumber);
    }

    // Group field is optional
    return "urn:ngsi-ld:" + type + ":" + (site ? site + ":" : "") + (service ? service + ":" : "") + (group ? group + ":" : "") + cleanIdString(entityName);
};


const parseFunction = (str) => {
    var fn_body_idx = str.indexOf('{'),
        fn_body = str.substring(fn_body_idx + 1, str.lastIndexOf('}')),
        fn_declare = str.substring(0, fn_body_idx),
        fn_params = fn_declare.substring(fn_declare.indexOf('(') + 1, fn_declare.lastIndexOf(')')),
        args = fn_params.split(',');

    args.push(fn_body);

    function Fn() {
        return Function.apply(this, args);
    }
    Fn.prototype = Function.prototype;

    return new Fn();
};

const extractFilenameFromPath = (string) => {

    var match = string.match(filenameFromPathPattern);
    if (match && match.length > 2)
        return match[3];
    else
        return string;

};

const parseFilePath = (pathString) => {

    return pathParse(pathString);

};
// Utility function that prints the final report by using the input logger

function spaceCleaner(object) {
    for (let sub in object)
        if (typeof object[sub] === "object" || typeof object[sub] === "array") object[sub] = spaceCleaner(object[sub]);
        else if (typeof object[sub] === "string" && object[sub][0] == " ") object[sub] = object[sub].substring(1, object[sub].length)
    return object
}



const bodyMapper = (body) => {

    if (body.mapperRecordID || body.adapterID) body.mapID = body.mapperRecordID || body.adapterID

    let sourceData = {
        name: body.sourceDataIn,
        minioObjName: body.sourceDataMinio?.name || body.prefix,
        minioBucketName: body.sourceDataMinio?.bucket || body.bucketName,
        //minioObjEtag: body.sourceDataMinio.etag,
        id: body.sourceDataID,
        type: body.sourceDataType,
        url: body.sourceDataURL,
        data: body.sourceData,
        path: body.path
    }

    let map
    if (body.mapPathIn)
        map = config.sourceDataPath + body.mapPathIn
    else if (body.mapID) {
        map = {
            id: body.mapID
        }
    }
    else if (body.mapData) {
        map = [
            body.mapData,
            "mapData"
        ]
    }

    let dataModel = {
        name: body.dataModelIn,
        id: body.dataModelID,
        data: body.dataModel,
        url: body.dataModelURL,
        schema_id: body.dataModel?.$id
    }

    return {
        sourceData,
        map,
        dataModel
    }
};

const sendOutput = async () => {
    if (config.deleteEmptySpaceAtBeginning) apiOutput.outputFile = spaceCleaner(apiOutput.outputFile)
    //if (parseInt((apiOutput.outputFile[apiOutput.outputFile.length - 1].MAPPING_REPORT.Mapped_and_NOT_Validated_Objects)[0].charAt(0))) process.res.status(400).send({ errors: apiOutput.outputFile.errors || "Validation errors", report: apiOutput.outputFile[apiOutput.outputFile.length - 1] })
    //else 
    if (!config.mappingReport) process.res.send(apiOutput.outputFile.slice(0, apiOutput.outputFile.length - 1));
    else process.res.send(apiOutput.outputFile);
    apiOutput.outputFile = [];
    logger.debug("Processing time : ", Date.now() - process.env.start)
};

const printFinalReportAndSendResponse = async (loggerr) => {

    await logger.info('\n--------  MAPPING REPORT ----------\n' +
        '\t Processed objects: ' + config.rowNumber + '\n' +
        '\t Mapped and Validated Objects: ' + config.validCount + '/' + config.rowNumber + '\n' +
        '\t Mapped and NOT Validated Objects: ' + config.unvalidCount + '/' + config.rowNumber + '\n' +
        '-----------------------------------------');

    if (config.validCount + config.unvalidCount < config.rowNumber)
        config.unvalidCount = config.rowNumber - config.validCount

    if (config.mode == 'server') {
        //Mapping report in output file

        while (isOrionWriterActive() && (config.orionWrittenCount + config.orionUnWrittenCount < config.validCount)) {
            await sleep(1)
        }

        apiOutput.outputFile[apiOutput.outputFile.length] = {
            MAPPING_REPORT: {
                Processed_objects: config.rowNumber,
                Mapped_and_Validated_Objects: config.validCount + '-' + config.rowNumber,
                Mapped_and_NOT_Validated_Objects: config.unvalidCount + '-' + config.rowNumber,
            },
            ORION_REPORT: isOrionWriterActive() ? {
                "Object written to Orion Context Broker": config.orionWrittenCount.toString() + '/' + config.validCount.toString(),
                "Object NOT written to Orion Context Broker": config.orionUnWrittenCount.toString() + '/' + config.validCount.toString(),
                "Object SKIPPED": config.orionSkippedCount.toString() + '/' + config.validCount.toString()
            } : "Orion writer not enabled"
        }

        try {
            /*if (isMinioWriterActive()) {
                logger.debug("minio is enabled")
                for (let obj of apiOutput.outputFile) {
                    logger.debug("minio writing")
                    try {
                        logger.debug("apiOutput.minioObj.name")
                        logger.debug(apiOutput.minioObj.name)
                        let bucketName = apiOutput.minioObj.bucket || config.minioWriter.defaultOutputFolderName || "output"
                        let objectName = (obj[apiOutput.minioObj.name]?.concat(obj[config.entityNameField] || obj.id || Date.now().toString()) || apiOutput.minioObj.name.concat("/output_processed_").concat(Date.now().toString()) || Date.now().toString())//.toLowerCase()
                        logger.debug("bucket name")
                        logger.debug(bucketName)
                        logger.debug("object name")
                        logger.debug(objectName)
                        if (!obj.MAPPING_REPORT && !obj.ORION_REPORT)
                            await minioWriter.stringUpload(bucketName, objectName, obj)
                    }
                    catch (error) {
                        logger.error(error)
                    }
                    logger.debug("minio writing done")
                }
                logger.debug("written to minio")
            }*/
            await sendOutput();
        }
        catch (error) {
            logger.error(error.message)
            apiOutput.outputFile = [];
        }
    }
};

const addAuthenticationHeader = (headers) => {
    if (config.OAUTH_TOKEN) {
        headers.Authorization = ('Bearer ' + config.OAUTH_TOKEN);
    }
    if (config.PAUTH_TOKEN) {
        headers['x-auth-token'] = config.PAUTH_TOKEN;
    }
};

const getDataModelPath = (dataModelName) => {
    if (dataModelName && checkInputDataModel(config.modelSchemaFolder, dataModelName))
        return path.join(config.modelSchemaFolder, dataModelName + '.json');
    else
        return undefined;
};

const checkInputDataModel = (folderPath, dataModel) => {

    var schemaFiles = require('fs').readdirSync(folderPath);
    if (schemaFiles)
        return schemaFiles.indexOf(dataModel + '.json') > -1;
    else
        return false;

};

const getActiveWriters = () => {

    return config.writers;
};

const isFileWriterActive = () => {
    return config.writers.includes('fileWriter');
};

const isOrionWriterActive = () => {
    return config.writers.includes('orionWriter');
};

const isWriterActive = (writerName) => {
    return config.writers.includes(writerName);
};

const isReadableFileStream = (obj) => {
    return isFileStream.readable(obj);
};

const isReadableStream = (obj) => {
    return obj.readable;
};

const promiseTimeout = (ms, promise) => {

    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
        let id = setTimeout(() => {
            clearTimeout(id);
            reject('Timed out in ' + ms + 'ms.');
        }, ms);
    });

    // Returns a race between our timeout and the passed in promise
    return Promise.race([
        promise,
        timeout
    ]);
};

/*
 * Restore the default configurations, if any was ovverriden by the request ones
 */
const restoreDefaultConfs = () => {
    config.rowStart = config.old_rowStart;
    config.rowEnd = config.old_rowEnd;
    config.orionUrl = config.old_orionUrl;
    config.updateMode = config.old_updateMode;
    config.fiwareService = config.old_fiwareService;
    config.fiwareServicePath = config.old_fiwareServicePath;
    config.outFilePath = config.old_outFilePath;
    config.idSite = config.old_idSite;
    config.idService = config.old_idService;
    config.idGroup = config.old_idGroup;
};

const encode = (encoding, value) => {
    if (encoding == "base64")
        return base64.encode(value)
    return value
};

module.exports = {
    cleanString: cleanString,
    cleanPair: cleanPair,
    cleanRow: cleanRow,
    uuid: uuid,
    createSynchId: createSynchId,
    extensionPattern: extensionPattern,
    httpPattern: httpPattern,
    parseFunction: parseFunction,
    printFinalReportAndSendResponse: printFinalReportAndSendResponse,
    extractFilenameFromPath: extractFilenameFromPath,
    addAuthenticationHeader: addAuthenticationHeader,
    getDataModelPath: getDataModelPath,
    checkInputDataModel: checkInputDataModel,
    parseFilePath: parseFilePath,
    isValidPath: isValidPath,
    getActiveWriters: getActiveWriters,
    isFileWriterActive: isFileWriterActive,
    isOrionWriterActive: isOrionWriterActive,
    isWriterActive: isWriterActive,
    isMinioWriterActive: isMinioWriterActive,
    isReadableFileStream: isReadableFileStream,
    isReadableStream: isReadableStream,
    promiseTimeout: promiseTimeout,
    restoreDefaultConfs: restoreDefaultConfs,
    encode: encode,
    bodyMapper: bodyMapper,
};