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
const { isMinioWriterActive, sleep, createRandId, finish } = require('./common')
const log = require('./logger')
const { Logger } = log
const logger = new Logger(__filename)
const fs = require("fs");

function ngsi(NGSI_entity) {
    return (((NGSI_entity == undefined) && config.NGSI_entity || NGSI_entity).toString() === 'true')
}

const cleanString = (string, NGSI_entity, config) => {
    var result = '';
    if (typeof string === 'string')
        result = string.replace(config.regexClean[ngsi(NGSI_entity) ? "default" : "custom"], ' ');

    return result;

};

const cleanIdString = (string, NGSI_entity, config) => {
    var result = '';
    if (typeof string === 'string')
        result = string.replace(config.regexClean[ngsi(NGSI_entity) ? "default" : "custom"], ' ')
            .replace(/à/g, 'a')
            .replace(/ù/g, 'u')
            .replace(/é|è/g, 'e')
            .replace(/ò/g, 'o');

    return result;
};


const cleanNumber = (number) => {
    return number;
};

const cleanPair = (key, value, NGSI_entity) => {


    if (value instanceof Array) {
        var arrayResult = {};
        var arrayValues = [];
        for (var i = 0; i < value.length; i++) {
            var elem = value[i];

            arrayValues[i] = cleanPair(key, elem, NGSI_entity).value;
        }
        arrayResult.key = cleanString(key, NGSI_entity, config);
        arrayResult.value = arrayValues;
        return arrayResult;

    } else if (value !== null && typeof value === 'object') {
        var result = {};
        var objResult = {};
        Object.keys(value).forEach(function (objKey) {
            var aux = cleanPair(objKey, value[objKey], NGSI_entity);
            objResult[aux.key] = aux.value;
        });
        result.key = cleanString(key, NGSI_entity, config);
        result.value = objResult;
        return result;

    } else {

        var result = {};
        result.key = cleanString(key, NGSI_entity, config);
        if (typeof value === 'string')
            result.value = cleanString(value, NGSI_entity, config);
        else if (value !== null) {
            result.value = cleanNumber(value, NGSI_entity);
        }
        else
            result.value = '';

        return result;
    }
};

const cleanRow = (row, NGSI_entity) => {

    var result = {};

    Object.keys(row).forEach(function (key) {
        var value = row[key];
        var newPair = cleanPair(key, value, NGSI_entity);
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
const createSynchId = (type, site, service, group, entityName, isIdPrefix, rowNumber, NGSI_entity, config) => {
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
    return "urn:ngsi-ld:" + type + ":" + (site ? site + ":" : "") + (service ? service + ":" : "") + (group ? group + ":" : "") + cleanIdString(entityName, NGSI_entity, config);
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

/*function spaceCleaner(object) {//TODO IMPORTANT prevent stack overflow
    for (let sub in object)
        if (typeof object[sub] === "object" || typeof object[sub] === "array") object[sub] = spaceCleaner(object[sub]);
        else if (typeof object[sub] === "string" && object[sub][0] == " ") object[sub] = object[sub].substring(1, object[sub].length)
    return object
}*/

/*function spaceCleaner(object) {
    stack = [object];

    while (stack.length > 0) {
        let current = stack.pop();

        for (let sub in current) {
            if (typeof current[sub] === "object" && current[sub] !== null) {
                stack.push(current[sub]); 
            } else if (typeof current[sub] === "string" && current[sub][0] === " ") {
                current[sub] = current[sub].substring(1); 
            }
        }
    }

    return object; 
}*/

/*function spaceCleaner(object) {//TODO this is not done yet (it should clean just the values and not also the keys)
    object = JSON.stringify(object)
    while (field.replaceAll('" ', '"') != field) field = field.replaceAll('" ', '"')
    while (field.replaceAll(' "', '"') != field) field = field.replaceAll(' "', '"')
}*/

let stackCalls = 0
let called = false
async function spaceCleaner(object) {

    /*while (called){
        await sleep(10)
        logger.debug(stackCalls)
    }
    called = true
    let r = spaceCleaner0(object)
    called = false*/
    //return r 

    for (let o of object)
        o = spaceCleaner0(o)
    return object
}

function spaceCleaner0(object) {
    stackCalls++
    //logger.debug("Stack calls ", stackCalls)
    if (stackCalls > 3000)
        console.debug(object)
    if (Array.isArray(object)) {
        for (let sub of object)
            if (typeof sub === "object")
                sub = spaceCleaner0(sub);
            else
                if (typeof sub === "string" && sub[0] == " ") sub = sub.substring(1, sub.length)
    }
    else
        for (let sub in object)
            if (typeof object[sub] === "object")
                object[sub] = spaceCleaner0(object[sub]);
            else
                if (typeof object[sub] === "string" && object[sub][0] == " ") object[sub] = object[sub].substring(1, object[sub].length)
    stackCalls--
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

const init = () => {
    let deletedCount = 0
    fs.readdir("dataModels/", (err, files) => {
        if (err) {
            console.error("Errore durante la lettura della directory:", err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join("dataModels/", file);
            if (file.includes("DataModelTemp")) {
                fs.unlinkSync(filePath, (err) => {
                    if (err) {
                        console.error(
                            `Errore durante l'eliminazione del file ${file}:`,
                            err
                        );
                    } else {
                        console.log(`File ${file} eliminato.`);
                    }
                });
            }
            else
                deletedCount++
        });
    });
    fs.readdir(config.sourceDataPath || "", (err, files) => {
        if (err) {
            console.error("Errore durante la lettura della directory:", err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(config.sourceDataPath || "", file);
            if (file.includes("sourceFileTemp")) {
                fs.unlinkSync(filePath, (err) => {
                    if (err) {
                        console.error(
                            `Errore durante l'eliminazione del file ${file}:`,
                            err
                        );
                    } else {
                        console.log(`File ${file} eliminato.`);
                    }
                });
            }
            else
                deletedCount++
        });
    });
    logger.debug("Deleted trash files ", deletedCount)
}

const hasNull = (obj) => Object.values(obj).some(value => value === null);
const hasNumberKeys = (obj) => Object.keys(obj).some(key => Number.isFinite(parseInt(key)));

const sendOutput = async (config, res) => {
    try {
        while (res?.dmm?.outputFile && !res?.dmm?.outputFile[0])
            res.dmm.outputFile.shift()
        if (config.deleteEmptySpaceAtBeginning)
            res.dmm.outputFile = await spaceCleaner(res.dmm.outputFile)
        if (config.rowStart)// && hasNull(res?.dmm?.outputFile[0] && hasNumberKeys(res?.dmm?.outputFile[0])))
            res.dmm.outputFile = res.dmm.outputFile.slice(config.rowStart - 1)
    }
    catch (error) {
        logger.error(error)   
        try {
            if (!res.dmm.outputFile[res.dmm.outputFile.length - 1]["MAPPING_REPORT"].details)
                res.dmm.outputFile[res.dmm.outputFile.length - 1]["MAPPING_REPORT"].details = [{ error }]
            else
                res.dmm.outputFile[res.dmm.outputFile.length - 1]["MAPPING_REPORT"].details.push([{ error }])
        }
        catch (error) {
            logger.error(error)           
        }
    }
    //if (parseInt((res.dmm.outputFile[res.dmm.outputFile.length - 1].MAPPING_REPORT.Mapped_and_NOT_Validated_Objects)[0].charAt(0))) process.res.status(400).send({ errors: res.dmm.outputFile.errors || "Validation errors", report: res.dmm.outputFile[res.dmm.outputFile.length - 1] })
    //else 
    if (!config.mappingReport)
        try {
            //await res.write(res.dmm.outputFile.slice(0, res.dmm.outputFile.length - 1));
            //await res.end()
            //await res.send(res.dmm.outputFile.slice(0, res.dmm.outputFile.length - 1));
            fs.unlinkSync(res.dmm.schemaTempName, (err) => {
                if (err) {
                    console.error(
                        `Errore durante l'eliminazione del file ${file}:`,
                        err
                    );
                } else {
                    console.log(`File ${file} eliminato.`);
                }
            })
            fs.unlinkSync(res.dmm.sourceTempName, (err) => {
                if (err) {
                    console.error(
                        `Errore durante l'eliminazione del file ${file}:`,
                        err
                    );
                } else {
                    console.log(`File ${file} eliminato.`);
                }
            })
        }
        catch (error) {
            logger.error(error)          
        }
    else
        try {
            //await res.write(res.dmm.outputFile);
            //await res.end()
            //await res.send(res.dmm.outputFile);
            fs.unlinkSync(res.dmm.schemaTempName, (err) => {
                if (err) {
                    console.error(
                        `Errore durante l'eliminazione del file ${file}:`,
                        err
                    );
                } else {
                    console.log(`File ${file} eliminato.`);
                }
            })
            fs.unlinkSync(res.dmm.sourceTempName, (err) => {
                if (err) {
                    console.error(
                        `Errore durante l'eliminazione del file ${file}:`,
                        err
                    );
                } else {
                    console.log(`File ${file} eliminato.`);
                }
            })
        }
        catch (error) {
            logger.error(error)           
        }
    let outputDataTempWriting = {}
    let outputId = res.dmm.outputID //common.createRandId() + source.type
    fs.writeFile('./output/output' + outputId + ".json", JSON.stringify(res.dmm), function (err) {
        //fs.writeFile(config.sourceDataPath + sourceTempId, source.type == "csv" ? source.data : JSON.stringify(source.data), function (err) {
        if (err) throw err;
        logger.debug('File output is created successfully.');
        outputDataTempWriting.value = 'File output is created successfully.'
    })
    await finish(outputDataTempWriting)
    //const deleteSession = 
    res.dmm.deleteSession()
    //res = null
    //res.dmm = {};
    //res.dmm.finished = true
    process.dataModelMapper.map = undefined
    process.dataModelMapper.resetConfig = undefined
    logger.debug("Processing time : ", Date.now() - process.env.start)
};

const printFinalReportAndSendResponse = async (loggerr, minioObj, config, res) => {

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
            await sleep(1000, "Orion writing progress :" + (config.orionWrittenCount + config.orionUnWrittenCount) + "/" + config.validCount)
        }

        //logger.debug(config.orionWriter)

        res.dmm.outputFile[res.dmm.outputFile.length] = {
            MAPPING_REPORT: {
                Processed_objects: config.rowNumber,
                Mapped_and_Validated_Objects: config.validCount + '-' + config.rowNumber,
                Mapped_and_NOT_Validated_Objects: config.unvalidCount + '-' + config.rowNumber,
            },
            ORION_REPORT: isOrionWriterActive() ? {
                "Object written to Orion Context Broker": config.orionWrittenCount.toString() + '/' + config.validCount.toString(),
                "Object NOT written to Orion Context Broker": config.orionUnWrittenCount.toString() + '/' + config.validCount.toString(),
                "Object SKIPPED": config.orionSkippedCount.toString() + '/' + config.validCount.toString(),
                details: config.orionWriter.details
            } : "Orion writer not enabled"
        }

        try {
            /*if (isMinioWriterActive()) {
                logger.debug("minio is enabled")
                for (let obj of res.dmm.outputFile) {
                    logger.debug("minio writing")
                    try {
                        logger.debug("minioObj.name")
                        logger.debug(minioObj.name)
                        let bucketName = minioObj.bucket || config.minioWriter.defaultOutputFolderName || "output"
                        let objectName = (obj[minioObj.name]?.concat(obj[config.entityNameField] || obj.id || Date.now().toString()) || minioObj.name.concat("/output_processed_").concat(Date.now().toString()) || Date.now().toString())//.toLowerCase()
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
            await sendOutput(config, res);
        }
        catch (error) {
            logger.error(error)           
            //crash
            res.dmm.outputFile = [];
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

const waiting = async (flag) => {
    while (process.dataModelMapper[flag])
        await process.dataModelMapper.sleep(100, "Waiting " + flag)
}

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
    waiting,
    createRandId,
    init
};