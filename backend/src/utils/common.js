const config = require('../../config')
let logIndex = 0
const log = require('./logger')
const { Logger } = log
const logger = new Logger(__filename)
const proj4 = require('proj4');
const Terraformer = require('terraformer');
const TerraformerProj4js = require('terraformer-proj4js');
const axios = require('axios');
const maptilerClient = require("@maptiler/client");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
maptilerClient.config.fetch = fetch;
const batchSize = 50

if (!process.dataModelMapper) process.dataModelMapper = {}
process.dataModelMapper.sleep = (ms, message) => {
    logger.info(message || "waiting")
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

TerraformerProj4js(Terraformer, proj4);

async function loadEPSGDefinition(epsgCode) {
    const proj4String = (await axios.get(`https://epsg.io/${epsgCode}.proj4`)).data;
    proj4.defs(`EPSG:${epsgCode}`, proj4String);
    logger.debug(proj4String);
}

async function convertGeoJSON(inputGeoJSON, sourceEPSGCode) {
    //logger.debug("Converting geojson")
    try {
        if (!proj4.defs[`EPSG:${sourceEPSGCode}`]) {
            await loadEPSGDefinition(sourceEPSGCode);
        }
    } catch (error) {
        logger.error("Error during EPSG code load:", error);
        return null;
    }
    const geojson = new Terraformer.Primitive(inputGeoJSON);
    const convertedGeoJSON = geojson.toGeographic();
    return convertedGeoJSON;
}

function featureMapper(properties) {
    let id = properties.id
    delete properties.id
    return {
        id,
        type: "Feature",
        properties,
        "@context": "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context-v1.6.jsonld",
        geometry: properties.location
    }

}

module.exports = {

    async transformCoordinates(sourceEpsgCode, targetEpsgCode, data, key) {
        maptilerClient.config.apiKey = key || "8JYNjx8UQfefRRQUEjwZ";

        //logger.debug("----------------------------------------------------------------------------")
        //logger.debug(data)
        if (Array.isArray(data[0]) && Array.isArray(data[0][0])) {
            for (let i in data)
                data[i] = await this.transformCoordinates(sourceEpsgCode, targetEpsgCode, data[i], key)
            return data
        }
        else {
            let result = []
            //for (let i = 0; i < data.length; i += batchSize) {
            for (let coords of data) {
                //const batch = data.slice(i, i + batchSize);
                //let coordinates = await maptilerClient.coordinates.transform(batch, { targetCrs: 4326, sourceCrs: 32633 })
                //logger.debug(data)
                //logger.debug("EPSG:" + sourceEpsgCode.toString(), "EPSG:" + targetEpsgCode.toString(), [coords[0], coords[1]])
                let coordinates = proj4("EPSG:" + sourceEpsgCode.toString(), "EPSG:" + targetEpsgCode.toString(), [coords[0], coords[1]])
                //logger.debug(coordinates)
                result.push(coordinates);
                //logger.debug(result)
                //result.push(...(coordinates.results));
            }
            //let result = await maptilerClient.coordinates.transform(data, { targetCrs: 4326, sourceCrs: 32633 })
            //logger.debug(result)

            /*data = result.map(r => [
                r.x,
                r.y
            ])*/

                
            /*[
                result.results[0].x,
                result.results[0].y
            ]*/
            //logger.debug(data)
            return result //data
        }
    },

    buildGeoJson(properties) {
        logger.debug(properties)
        if (properties[properties.length - 1].MAPPING_REPORT.Processed_objects)
            properties.pop()
        return {
            type: "FeatureCollection",
            features: properties.map(property => featureMapper(property))
        }
    },

    e(error) {
        logger.error(error)       
        let str = ""
        var util = require('util')
        for (let key in error) {
            try {
                str = str.concat("{\n", '"', key, '"', " : ", JSON.stringify(error[key]), "\n},\n")
            }
            catch (error) {
                str = str.concat("{\n", '"', key, '"', " : ", util.inspect(error[key]), "\n},\n")
            }
        }

        var fs = require('fs');

        fs.writeFile("./logs/errorLog" + JSON.stringify(logIndex) + ".json", "[" + str.substring(0, str.length - 1) + "]", function (err) {
            if (err) logger.error(err);
        })

        logIndex++

        return error
    },
    sleep(ms, message) {
        logger.info(message || "waiting")
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    isMinioWriterActive() {
        return config.writers.includes('minioWriter');
    },
    async finish(obj) {
        let logCounterFlag
        while (!obj.value) {
            await sleep(1)
            if (!logCounterFlag) {
                logCounterFlag = true
                sleep(1000).then(resolve => {
                    if (!obj.value)
                        logger.debug("waiting for value")
                    logCounterFlag = false
                })
            }
        }
        if (obj.value)
            return obj.value

    },
    convertGeoJSON: convertGeoJSON,

    lock(key) {
        process.dataModelMapper[key] = "locked"
    },

    createRandId() {
        return Date.now().toString()
            .concat(
                Math.floor(
                    Math.random() * 1000
                )
            ).toString(
        )
    }
}