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

const rp = require('promise-request-retry');

//let orionReport = {}
//const config = require('../../config')
//const orionConfig = config.orionWriter;
const report = require('../utils/logger').orionReport;
const log = require('../utils/logger')//.app(module);
const { Logger } = log
const logger = new Logger(__filename)
//const proxyConf = config.orionWriter.enableProxy ? config.orionWriter.proxy : undefined;
const axios = require("axios")
const mongoose = require("mongoose");

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const fixVertices = (obj, first, second) => {
    //TODO this is is incorrect because works only if the duplicates vertice is the first
    logger.debug(obj)
    obj.productBbox.coordinates[0][0].shift()
    obj.location.coordinates[0][0].shift()
    return obj
}

const lines = "--------_----------_-----------------|-------------------_----------------|----------------_-------------------|--------------_----------------------"


const insertLargeFiles = async (id, obj, config, modelSchema) => {
    logger.debug("insertLargeFiles")
    const uri = "mongodb://" + config.orionWriter.mongoHost + ":" + config.orionWriter.mongoPort + "/orion-" + (config.fiwareService || config.orionWriter.fiwareService);
    const orionDB = await mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const Entity = await orionDB.model("Entity", new mongoose.Schema({}, { strict: false, _id: false }), "entities");
    let update, del
    try {
        //del = await Entity.findOneAndDelete({
        //    "_id.id": id
        //})
        //logger.debug(del)
        //update = await Entity.insertMany([{...toMongoOrionObject(obj)}])
        //logger.debug(await Entity.collection.getIndexes())
        for (const index of Object.keys(await Entity.collection.getIndexes())) {
            if (index !== '_id_') {
                await Entity.collection.dropIndex(index);
                console.log(`Removed index: ${index}`);
            }
        }

        update = await Entity.findOneAndUpdate(
            {
                "_id.id": id
            },
            {

                ...toMongoOrionObject(obj)
            }
        )
    }
    catch (error) {
        if (error.toString().includes("Duplicate vertices:"))
            try {
                update = await Entity.findOneAndUpdate(
                    {
                        "_id.id": id
                    },
                    {

                        ...toMongoOrionObject(fixVertices(obj))
                    }
                )
            }
            catch (error) {
                logger.error(error)
                logger.error(error.toString())
                logger.debug("Now closing connection to orion mongo")
                await orionDB.close();
                logger.debug("Now closed connection to orion mongo")
                throw { error: "no entity updated" }
            }
        logger.error(error)
        logger.error(error.toString())
        logger.debug("Now closing connection to orion mongo")
        await orionDB.close();
        logger.debug("Now closed connection to orion mongo")
        throw { error: "no entity updated" }
    }
    //console.log({
    //    update,
    //    obj
    //})
    //const entities = await Entity.find()//{ "_id.id": id })
    //let ent = entities.pop()
    //await console.debug({uri})
    //await console.debug("ENTITIES", entities, id)
    //await new Promise(resolve => setTimeout(resolve, 10000))
    //if (ent){
    //    console.debug({ent}, "-_-")
    //    await ent.update({ ...(!config.orionWriter.keyValues && obj || toOrionObject(obj, modelSchema)) });
    //}
    //else {
    //    const newEntity = new Entity({ "_id.id": id, ...(toOrionObject(obj, modelSchema)) });
    //    await newEntity.save();
    //    console.log(`Entity con ID ${id} creata.`);
    //}
    logger.debug("Now closing connection to orion mongo")
    await orionDB.close();
    logger.debug("Now closed connection to orion mongo")
}

/*
const sendToOrion = async (options, retries) => {
    let startTime = Date.now()
    let response
    rp(options).then(res => {
        response = res
    })
    while (!response)
        if ((Date.now() - startTime) > config.orionWriter.requestTimeout || 30000)
            if (retries < config.orionWriter.maxRetry)
                return await sendToOrion(options, retries ? retries++ : 1)
            else
                throw { error: "Orion did not sent yet any response" }
        else
            await sleep(1)
    return response
}*/

const buildRequestHeaders = (config) => {

    var headerObject = {
        'Fiware-Service': config.fiwareService || config.orionWriter.fiwareService,
        'Fiware-ServicePath': config.fiwareServicePath || config.orionWriter.fiwareServicePath
    };

    if ((config.orionAuthHeaderName || config.orionWriter.orionAuthHeaderName) && (config.orionAuthToken || config.orionWriter.orionAuthToken))
        headerObject[config.orionAuthHeaderName || config.orionWriter.orionAuthHeaderName] = config.orionAuthToken || config.orionWriter.orionAuthToken;

    return headerObject;

};

//let wrObj = false


const writeObject = async (objNumber, obj, modelSchema, config) => {

    let proxyConf = config.orionWriter.enableProxy ? config.orionWriter.proxy : undefined;

    //if (!wrObj)
    //    wrObj = true
    //else
    //    while (wrObj) {
    //        logger.info(objNumber)
    //        await (require('../utils/common.js')).sleep(10)
    //    }

    let orionUrl = config.mode == "server" ? config.orionWriter.orionUrl : config.orionUrl
    logger.debug(config.orionWriter.orionUrl)

    if (obj) {
        logger.debug('Sending to Orion CB object number: ' + objNumber + ' , id: ' + obj.id);
        logger.debug({ToOrionObject : !config.orionWriter.keyValues || obj})

        var orionedObj = !config.orionWriter.keyValues && toOrionObject(obj, modelSchema) || obj;

        var options = {
            method: 'POST',
            headers: buildRequestHeaders(config),
            uri: !config.orionWriter.keyValues ? orionUrl + config.orionWriter.relativeUrl : orionUrl + config.orionWriter.relativeUrl + config.orionWriter.keyValuesOption,
            body: orionedObj,
            json: true,
            simple: false,
            resolveWithFullResponse: true,
            proxy: proxyConf,
            rejectUnauthorized: false,
            ...config.orionWriter.promiseRequestRetryExternalLibrary
        };

        let postOptions = JSON.parse(JSON.stringify(options))
        try {
            var id = JSON.parse(JSON.stringify(obj.id))
        }
        catch (e) {
            logger.error(e)
            id = "ID" + Date.now().toString()
        }

        //logger.trace("Options")
        //logger.trace(JSON.stringify(options))
        logger.debug("Orioned obj")
        logger.debug(JSON.stringify(orionedObj).substring(0, 20) + "...")
        let createResponse, updateResponse, e
        let attempts = 0
        if (!config.orionWriter.maxRetry)
            config.orionWriter.maxRetry = 1
        try {
            // Wait for Create Response
            while (//(
                (attempts < config.orionWriter.maxRetry) && !createResponse)// (
                //     (createResponse && !(199 < createResponse.statusCode < 400)) || !createResponse
                // ))) {
                try {
                    e = undefined
                    //if (attempts)
                    //    createResponse = await axios.post(options.uri, options.body, { headers: options.headers })
                    //else
                    createResponse = await rp(options);
                }
                catch (error) {
                    e = error
                    attempts++;
                    logger.error(error)
                    if ((attempts < config.orionWriter.maxRetry))// && !(199 < createResponse?.statusCode < 400))
                        await sleep(config.orionWriter.retryDelay * attempts)
                    else
                        throw error
                }
            //}

            if (!createResponse)
                throw { message: { error: "no response...", details: e?.message } }
            logger.debug("status ", createResponse?.statusCode, "number", objNumber)

            // Entity is new
            if (createResponse?.statusCode == 201) {

                report.info('Entity Number: ' + objNumber + ' with Id: ' + obj.id + ' correctly CREATED in the Context Broker');
                logger.debug('Entity Number: ' + objNumber + ' with Id: ' + obj.id + ' correctly CREATED in the Context Broker');
                wrObj = false
                return Promise.resolve(config.orionWrittenCount++);

            }
            else if (createResponse?.statusCode == 409 || (createResponse?.statusCode == 400 && createResponse.body.detail == 'Error from Mongo-DB backend') || (createResponse?.statusCode == 422 && createResponse.body && createResponse.body.description == 'Already Exists' || createResponse.body.detail == 'Error from Mongo-DB backend')) {
                logger.debug("I have to update the entity")

                // Update existing entity
                if (!config.orionWriter.skipExisting) {

                    // If entity already exists, try to update it
                    var existingId = orionedObj.id;
                    delete orionedObj.id;
                    if (config.orionWriter.protocol == "v2")
                        delete orionedObj.type;

                    // Replace request URI and Method with the onse for updating entities attribute
                    if (config.orionWriter.protocol == "v2") {
                        options.uri = config.orionWriter.orionUrl + config.orionWriter.relativeUrl || "/v2/entities" + "/" + existingId + (!config.orionWriter.keyValues ? '/attrs' : '/attrs' + config.orionWriter.keyValuesOption);
                        options.method = config.updateMode == 'REPLACE' || config.orionWriter.updateMode == 'REPLACE' ? 'PUT' : 'POST';
                    }
                    else if (config.orionWriter.protocol == "v1") {
                        options.uri = config.orionWriter.orionUrl + config.orionWriter.relativeUrl
                        options.method = 'POST';
                        options.body.id = existingId + Date.now().toString()
                    }

                    try {
                        // Wait for update response
                        if (config.orionWriter.keyValues && config.orionWriter.protocol == "v2")
                            options.body.id = undefined

                        //logger.trace(JSON.stringify(options))
                        if (config.orionWriter.delayBetweenPostAndPut)
                            await sleep(config.orionWriter.delayBetweenPostAndPut)
                        attempts = 0
                        while (//(
                            (attempts < config.orionWriter.maxRetry) && !updateResponse)// (
                            //    (updateResponse && !(199 < updateResponse.statusCode && updateResponse.statusCode < 400)) || !updateResponse
                            //))) {
                            try {
                                //if (attempts)
                                //    updateResponse = await axios.put(options.uri, options.body, { headers: options.headers, timeout: 50000 })
                                //else
                                if (attempts || config.orionWriter.avoidPut) {
                                    let deleteOptions = JSON.parse(JSON.stringify(postOptions))
                                    deleteOptions.uri = options.uri + "/" + id
                                    deleteOptions.body = undefined
                                    deleteOptions.method = "DELETE"
                                    await rp(deleteOptions);
                                    options = postOptions
                                }
                                updateResponse = await rp(options);
                            }
                            catch (error) {
                                attempts++;
                                logger.error(error)
                                if ((attempts < config.orionWriter.maxRetry))// && !(199 < updateResponse?.statusCode && updateResponse?.statusCode < 400))
                                    await sleep(config.orionWriter.retryDelay * attempts)
                                else
                                    throw error
                            }
                        //}
                        logger.debug("I tried to update the entity and orion replied with statuscode ", updateResponse?.statusCode)
                        if ((199 < updateResponse?.statusCode) && (updateResponse?.statusCode < 300)) {
                            logger.debug(199, "<", updateResponse?.statusCode, "<", 300)
                            report.info('Entity Number: ' + objNumber + ' with Id: ' + existingId + ' already exists! Correctly UPDATED in the Context Broker');
                            logger.debug('Entity Number: ' + objNumber + ' with Id: ' + existingId + ' already exists! Correctly UPDATED in the Context Broker');
                            wrObj = false
                            return Promise.resolve(config.orionWrittenCount++);

                        }
                        else if (updateResponse?.statusCode == 400) {
                            attempts = 0
                            updateResponse = undefined
                            let id = options.body.id
                            let type = options.body.type
                            options.body = { id, type }
                            logger.debug("Now another orion call ? ", ((attempts < config.orionWriter.maxRetry) && !updateResponse))
                            while ((attempts < config.orionWriter.maxRetry) && !updateResponse)
                                try {
                                    updateResponse = await rp(options);
                                    logger.debug("Response updated ", objNumber, " ", id, " ", existingId)
                                }
                                catch (error) {
                                    attempts++;
                                    logger.error(error)
                                    if ((attempts < config.orionWriter.maxRetry))// && !(199 < updateResponse?.statusCode && updateResponse?.statusCode< 400))
                                        await sleep(config.orionWriter.retryDelay * attempts)
                                    else
                                        throw error
                                }
                            logger.debug({
                                id: options.body.id
                            })
                            if ((199 < updateResponse?.statusCode) && (updateResponse?.statusCode < 300)) {

                                report.info('Entity Number: ' + objNumber + ' with Id: ' + existingId + ' already exists! Correctly UPDATED in the Context Broker');
                                logger.debug('Entity Number: ' + objNumber + ' with Id: ' + existingId + ' already exists! Correctly UPDATED in the Context Broker');
                                wrObj = false
                                await insertLargeFiles(options.body.id, obj, config, modelSchema)
                                return Promise.resolve(config.orionWrittenCount++);
                            }
                            else {
                                wrObj = false
                                if (!config.orionWriter.details)
                                    config.orionWriter.details = [{ count: objNumber.toString(), updateResponse: updateResponse?.body, status: updateResponse?.statusCode }]
                                else
                                    config.orionWriter.details.push({ count: objNumber.toString(), updateResponse: updateResponse?.body, status: updateResponse?.statusCode })
                                logger.debug("Details ", objNumber, obj)
                                //logger.debug(config.orionWriter)
                                logger.error('There was an error while writing Mapped Object: ')
                                logger.error(updateResponse?.body || updateResponse || "No response?", "\n", updateResponse?.statusCode)
                                logger.debug("----Details ----")
                                logger.debug(objNumber)
                                return Promise.reject('Update Error').catch((error) => {
                                    wrObj = false
                                    if (!config.orionWriter.details)
                                        config.orionWriter.details = [{ count: objNumber.toString(), updateResponse: updateResponse?.body, status: updateResponse?.statusCode }]
                                    else
                                        config.orionWriter.details.push({ count: objNumber.toString(), updateResponse: updateResponse?.body, status: updateResponse?.statusCode })
                                    logger.debug("Details ", objNumber, obj)
                                    //logger.debug(config.orionWriter)
                                    logger.error('There was an error while writing Mapped Object: ')
                                    logger.error(error)
                                });
                            }
                        }
                        else {
                            wrObj = false
                            if (!config.orionWriter.details)
                                config.orionWriter.details = [{ count: objNumber.toString(), updateResponse: updateResponse?.body, status: updateResponse?.statusCode }]
                            else
                                config.orionWriter.details.push({ count: objNumber.toString(), updateResponse: updateResponse?.body, status: updateResponse?.statusCode })
                            logger.debug("Details ", objNumber, obj)
                            //logger.debug(config.orionWriter)
                            logger.error('There was an error while writing Mapped Object: ')
                            logger.error(updateResponse?.body || updateResponse || "No response?", "\n", updateResponse?.statusCode)
                            logger.debug("----Details ----")
                            logger.debug(objNumber)
                            return Promise.reject('Update Error').catch((error) => {
                                wrObj = false
                                if (!config.orionWriter.details)
                                    config.orionWriter.details = [{ count: objNumber.toString(), updateResponse: updateResponse?.body, status: updateResponse?.statusCode }]
                                else
                                    config.orionWriter.details.push({ count: objNumber.toString(), updateResponse: updateResponse?.body, status: updateResponse?.statusCode })
                                logger.debug("Details ", objNumber, obj)
                                //logger.debug(config.orionWriter)
                                logger.error('There was an error while writing Mapped Object: ')
                                logger.error(error)
                            });
                        }

                    } catch (error) {
                        logger.error(error)
                        report.info('----------------------------------------------------------\n' +
                            'Entity Number: ' + objNumber + ' with Id: ' + existingId + ' NOT UPDATED in the Context Broker');
                        logger.debug('Entity Number: ' + objNumber + ' with Id: ' + existingId + ' NOT UPDATED in the Context Broker');

                        report.info('error: ' + error); // Print the error if one occurred
                        logger.debug('error: ' + error);

                        if (error)
                            report.info('statusCode: ' + error?.statusCode); // Print the response status code if a response was received
                        report.info('body: ' + JSON.stringify(error) + "\n" + error.toString);
                        report.info('Mapped and unwritten object:\n' + JSON.stringify(orionedObj).substring(0, 30) + '\n ------------------------------\n');
                        logger.debug('Mapped and unwritten object:\n' + JSON.stringify(orionedObj).substring(0, 30) + '\n ------------------------------\n');
                        config.orionUnWrittenCount++;
                        wrObj = false
                        if (!config.orionWriter.details)
                            config.orionWriter.details = [{ count: objNumber.toString(), error: { error: error.message, updateResponse: updateResponse?.body, createResponse: createResponse?.body, updateStatus: updateResponse?.statusCode, createStatus: createResponse?.statusCode } }]
                        else
                            config.orionWriter.details.push({ count: objNumber.toString(), error: { error: error.message, updateResponse: updateResponse?.body, createResponse: createResponse?.body, updateStatus: updateResponse?.statusCode, createStatus: createResponse?.statusCode } })
                        logger.debug("Details ", objNumber, obj)
                        //logger.debug(config.orionWriter)
                        logger.error('There was an error while writing Mapped Object: ')
                        logger.error(error)
                        logger.debug("----Details ----")
                        logger.debug(objNumber)
                        return Promise.reject(error).catch((error) => {
                            wrObj = false
                            if (!config.orionWriter.details)
                                config.orionWriter.details = [{ count: objNumber.toString(), error: { error: error.message, updateResponse: updateResponse?.body, createResponse: createResponse?.body, updateStatus: updateResponse?.statusCode, createStatus: createResponse?.statusCode } }]
                            else
                                config.orionWriter.details.push({ count: objNumber.toString(), error: { error: error.message, updateResponse: updateResponse?.body, createResponse: createResponse?.body, updateStatus: updateResponse?.statusCode, createStatus: createResponse?.statusCode } })
                            logger.debug("Details ", objNumber, obj)
                            //logger.debug(config.orionWriter)
                            logger.error('There was an error while writing Mapped Object: ')
                            logger.error(error)
                        });

                    }

                } else {

                    // Skip existing entity
                    report.info('Entity Number: ' + objNumber + ' with Id: ' + orionedObj.id + ' SKIPPED');
                    logger.debug('Entity Number: ' + objNumber + ' with Id: ' + orionedObj.id + ' SKIPPED');
                    wrObj = false
                    return Promise.resolve(config.orionSkippedCount++);

                }

            }
            else {
                config.orionUnWrittenCount++;
                wrObj = false
                if (!config.orionWriter.details)
                    config.orionWriter.details = [{ count: objNumber.toString(), response: createResponse?.body || "No response, why?", status: createResponse?.statusCode || "No status, why?" }]
                else
                    config.orionWriter.details.push({ count: objNumber.toString(), response: createResponse?.body || "No response, why?", status: createResponse?.statusCode || "No status, why?" })
                logger.debug("----Details ----")
                logger.debug(objNumber)
                logger.debug("Details ", objNumber, obj)
                //logger.debug(config.orionWriter)
                logger.error('There was an error while writing Mapped Object: ')
                logger.error(updateResponse || createResponse)
                return Promise.reject('Error returned from Context Broker: ' + JSON.stringify(createResponse) + '\n').catch((error) => {
                    wrObj = false
                    if (!config.orionWriter.details)
                        config.orionWriter.details = [{ count: objNumber.toString(), error: { error: error.message, response: createResponse?.body || "No response, why?", status: createResponse?.statusCode || "No status, why?" } }]
                    else
                        config.orionWriter.details.push({ count: objNumber.toString(), error: { error: error.message, response: createResponse?.body || "No response, why?", status: createResponse?.statusCode || "No status, why?" } })
                    logger.debug("Details ", objNumber, obj)
                    //logger.debug(config.orionWriter)
                    logger.error('There was an error while writing Mapped Object: ')
                    logger.error(error)
                });
            }

        } catch (error) {
            logger.error(error)

            report.info('----------------------------------------------------------\n' +
                'Entity Number: ' + objNumber + ' with Id: ' + obj.id + ' NOT CREATED in the Context Broker');
            logger.debug('Entity Number: ' + objNumber + ' with Id: ' + obj.id + ' NOT CREATED in the Context Broker');

            report.info('error: ' + error); // Print the error if one occurred
            logger.debug('error: ' + error);

            if (error)
                report.info('statusCode: ' + error?.statusCode);
            report.info('body: ' + JSON.stringify(error));
            report.info('Mapped and unwritten object:\n' + JSON.stringify(orionedObj).substring(0, 30) + '\n ------------------------------\n');
            logger.debug('Mapped and unwritten object:\n' + JSON.stringify(orionedObj).substring(0, 30) + '\n ------------------------------\n');
            config.orionUnWrittenCount++;
            wrObj = false
            if (!config.orionWriter.details)
                config.orionWriter.details = [{ count: objNumber.toString(), error: error.message }]
            else
                config.orionWriter.details.push({ count: objNumber.toString(), error: error.message })
            logger.debug("Details ", objNumber, obj)
            //logger.debug(config.orionWriter)
            logger.debug("----Details ----")
            logger.debug(objNumber)
            return Promise.reject(error);

        }

    } else {
        wrObj = false
        logger.debug("Details ", objNumber, obj)
        //logger.debug(config.orionWriter)
        logger.debug("----Details ----")
        logger.debug(objNumber)
        return new Promise((resolve, reject) => {
            logger.debug("Mapped Object is undefined!, nothing to send to Orion Context Broker")
            resolve();
        });
    }
}

function toOrionObject(obj, schema) {

    logger.debug("Transforming Mapped object to an Orion Entity (explicit types in attributes)");

    for (key in obj) {
        if (key != 'id' && key != 'type') {

            var modelField = schema.allOf[0].properties[key];
            var modelFieldType = modelField.type;
            var modelFieldFormat = modelField.format;
            var objField = obj[key];
            logger.debug({key : obj[key], modelField});

            if (key == 'location') {

                var newValue = {};
                newValue = {
                    type: modelFieldType,//"geo:json",
                    value: objField
                };
                obj['location'] = newValue;

            } else if (modelFieldType === 'object') {

                //var nestedValue = {};
                //for (fieldKey in objField) {

                //    var modelSubField = modelField.properties[fieldKey];
                //    var modelSubFieldType = modelSubField.type;
                //    var modelSubFieldFormat = modelSubField.format;

                //    if (modelSubFieldFormat)
                //        nestedValue[fieldKey] = {
                //            value: objField[fieldkey],
                //            type: modelSubFieldType,
                //            format: modelSubFieldFormat
                //        }
                //    else
                //        nestedValue[fieldKey] = {
                //            value: objField[fieldKey],
                //            type: modelSubFieldType
                //        }

                //    delete objField[fieldKey];
                //}

                var nestedObject = objField;
                delete objField;
                obj[key] = {
                    type: modelFieldType,
                    value: nestedObject
                }

            } else {

                if (modelFieldFormat) {
                    if (modelFieldFormat === 'date-time')
                        obj[key] = {
                            type: 'DateTime',
                            value: objField
                        };
                    else
                        obj[key] = {
                            type: modelFieldType,
                            value: objField
                            // format: modelFieldFormat
                        };
                }
                else
                    obj[key] = {
                        type: modelFieldType,
                        value: objField
                    }
            }
        }
    }

    return obj;
}

function mapItem(item) {

}

function toMongoOrionObject(obj) {
    let attrs = {}
    for (let key in obj)
        attrs["https://uri=etsi=org/ngsi-ld/default-context/" + key] = {
            type: "Property",
            creDate: Date.now(),
            modDate: Date.now(),
            value: obj[key],
            mdNames: []
        }
    const attrNames = [...Object.keys(attrs)]
    console.log({
        attrs,
        attrNames
    })
    return {
        attrs,
        attrNames
    }
}


async function printOrionFinalReport(loggerr, config) {

    await logger.info('\t\n--------ORION REPORT----------\n' +
        '\t Object written to Orion Context Broker: ' + config.orionWrittenCount + '/' + config.validCount + '\n' +
        '\t Object NOT written to Orion Context Broker: ' + config.orionUnWrittenCount + '/' + config.validCount + '\n' +
        '\t Object SKIPPED: ' + config.orionSkippedCount + '/' + config.validCount + '\n' +
        '\t Details: ' + config.orionWriter.details + '\n' +
        '\t-----------------------------------------');

}

/// Use Events?
async function checkAndPrintFinalReport(config) {
    if ((parseInt(config.orionWrittenCount) + parseInt(config.orionSkippedCount) + parseInt(config.orionUnWrittenCount)) == parseInt(config.validCount)) {
        await printOrionFinalReport(log, config);
        await printOrionFinalReport(report, config);
    }

    let orionReport = {
        "Object written to Orion Context Broker": config.orionWrittenCount.toString() + '/' + config.validCount.toString(),
        "Object NOT written to Orion Context Broker": config.orionUnWrittenCount.toString() + '/' + config.validCount.toString(),
        "Object SKIPPED": config.orionSkippedCount.toString() + '/' + config.validCount.toString(),
        details: config.orionWriter.details
    }

    return orionReport
}

module.exports = {
    writeObject: writeObject,
    checkAndPrintFinalReport: checkAndPrintFinalReport
}