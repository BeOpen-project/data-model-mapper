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

const mapper = require('json-mapper');
const fs = require('fs');
const config = require('../config');
const utils = require('./utils/utils.js');
const validator = require('./schemaHandler.js');
const unorm = require('unorm');
const staticPattern = /static:(.*)/;
const dotPattern = /(.*)\.(.*)/;

const log = require('./utils/logger')//.app(module);
const { Logger } = log
const logger = new Logger(__filename)
const Debugger = require('./utils/debugger');
const report = require('./utils/logger').report;
const service = require("./server/api/services/service")

const loadMap = (mapData) => {

    if (typeof mapData === 'object' && mapData.absolute) {
        logger.info('Loading Map File');
        return new Promise(function (resolve, reject) {
            resolve(JSON.parse(fs.readFileSync(mapData.absolute, 'utf8')));
        });
    } else {

        return new Promise(function (resolve, reject) {
            resolve(mapData);
        });
    }

};

const cleanValue = (value) => {
    let parsed = false
    let valueWithHeadCleaned
    for (let index = 0; (index < value.length) && !parsed; index++)
        if (value[index] == '"') {
            valueWithHeadCleaned = value.substring(index + 1)
            parsed = true
        }
        else if (value[index] == " ")
            valueWithHeadCleaned = value.substring(index + 1)
        else parsed = true
    parsed = false
    let valueWithTailCleaned = valueWithHeadCleaned
    for (let index = valueWithHeadCleaned.length - 1; (index > 0) && !parsed; index--)
        if (valueWithHeadCleaned[index] == '"') {
            valueWithTailCleaned = valueWithHeadCleaned.substring(0, index)
            parsed = true
        }
        else if (valueWithHeadCleaned[index] == " ")
            valueWithTailCleaned = valueWithHeadCleaned.substring(0, index)
        else parsed = true
    return valueWithTailCleaned;
};

const encodingHandler = (mapSourceSubField, source) => {
    let encoding = mapSourceSubField.split(":")[1]
    let outputValue = ""
    mapSourceSubField = mapSourceSubField.split("encode:" + encoding + ":")[1]
    if (mapSourceSubField[0] == "[" && mapSourceSubField[mapSourceSubField.length - 1] == "]") {
        mapSourceSubField = mapSourceSubField.substring(1, mapSourceSubField.length - 1)
        mapSourceSubField = mapSourceSubField.split(",")
        for (let value of mapSourceSubField) {
            value = cleanValue(value);
            if (value.startsWith("static"))
                outputValue = outputValue.concat(value.split("static:")[1])
            else
                outputValue = outputValue.concat(source[value])
        }
    }
    else if (mapSourceSubField.startsWith("concat:")) {
        mapSourceSubField = mapSourceSubField.split("concat:")[1]
        for (let sourceSubField in source)
            outputValue = outputValue.concat(outputValue == "" ? "" : mapSourceSubField).concat(source[sourceSubField])
    }
    return utils.encode(encoding, outputValue)
};

/**
 *
 *
 * @param {"Analyzed Map"} parsedSourceKey This is the analyzed map that informs the external library converter on what to do (if is a new Function(...) it won't check the
 * input source but it will set the output field to the return of the function)
 * @param {"Map"} normSourceKey The map object
 * @param {"Data model"} schemaDestKey This is the schema
 * @param {"Source file"} source The input source file
 * @return {"Analyzed Map"} parsedSourceKey This is the analyzed map that informs the external library converter on what to do (if is a new Function(...) it won't check the
 * input source but it will set the output field to the return of the function)
 */

const objectHandler = (parsedSourceKey, normSourceKey, schemaDestKey, source) => {

    for (let key in normSourceKey) {

        let schemaDestSubKey = schemaDestKey.properties[key];
        if (schemaDestSubKey) {

            let schemaFieldType = schemaDestSubKey.type;
            let schemaFieldFormat = schemaDestSubKey.format;
            let mapSourceSubField = normSourceKey[key];

            parsedSourceKey[key] = {};
            if (schemaFieldType === 'number' || schemaFieldType === 'integer' && mapSourceSubField.split('.').length == 1)
                parsedSourceKey[key] = new Function("input", "return Number(input['" + mapSourceSubField + "']);");
            else if (schemaFieldType === 'boolean')
                parsedSourceKey[key] = new Function("input", "return (input['" + mapSourceSubField + "'].toLowerCase() == 'true' || input['" + mapSourceSubField + "'] == 1 || input['" + mapSourceSubField + "'] == '1'  ) ? true: false");
            else if (schemaFieldType === 'string' && schemaFieldFormat === 'date-time')
                parsedSourceKey[key] = new Function("input", "return new Date(input['" + mapSourceSubField + "']).toISOString();");
            else if (schemaFieldType === 'string' && Array.isArray(mapSourceSubField))
                parsedSourceKey[key] = new Function("input", "return " + handleSourceFieldsArray(mapSourceSubField).result);
            else if (schemaFieldType === 'array' && Array.isArray(mapSourceSubField))
                parsedSourceKey[key] = new Function("input", "return " + handleSourceFieldsToDestArray(mapSourceSubField));
            else if (schemaFieldType === 'string' && typeof mapSourceSubField === 'string' && (mapSourceSubField.startsWith("static:") || mapSourceSubField == "")) {
                if (mapSourceSubField == "") mapSourceSubField = "static:"
                parsedSourceKey[key] = new Function("input", "return '" + mapSourceSubField.match(staticPattern)[1] + "'");
            } else if (schemaFieldType === 'string' && typeof mapSourceSubField === 'string' && (mapSourceSubField.startsWith("encode:")))
                parsedSourceKey[key] = new Function("input", "return '" + encodingHandler(mapSourceSubField, source) + "'");
            else if (schemaFieldType === 'object')
                parsedSourceKey[key] = objectHandler(mapSourceSubField, mapSourceSubField, schemaDestSubKey)
            else  // normal string no action required
                parsedSourceKey[key] = mapSourceSubField;

            // Add type to the nested map field
            //parsedNorm[key]['type'] = new Function("input", "return '" + schemaFieldType + "'");
        }
    }
    return parsedSourceKey;
};

const extractFromNestedField = (source, field) => {
    let layers
    try {
        layers = field.split('.')
    }
    catch (error) {
        logger.error(error.message)
    }
    let value = source
    for (let sublayer in layers) {
        value = value[layers[sublayer]]
    }
    return value
};

const NGSI_entity = () => {
    //I actually don't understand why mapObjectToDataModel fails while reading service.NGSI_entity, so I wrote this getter function
    return service.NGSI_entity
}

/**
 *
 * This function takes in input the source object, uses map object to map to a destination data Model
 * @param {"Input row index"} rowNumber The input source row index. The parser iterates in the input file and calls this mapping function for each row
 * @param {"Source file"} source The input source file
 * @param {"Map file"} map The input map file
 * @param {"Destination schema"} modelSchema The destination schema/data model 
 */
const mapObjectToDataModel = (rowNumber, source, map, modelSchema, site, service, group, entityIdField) => {

    var result = {};
    // If the destKey is entityIdField and has only "static:" fields, the pair value indicates only an ID prefix
    // The resulting string will be concatenated with rowNumber
    var isIdPrefix = false;

    for (var mapDestKey in map) {

        let mapSourceKey = map[mapDestKey];    // sourceField map object or key-value pair
        let singleResult = undefined;
        let schemaDestKey = modelSchema.allOf[0].properties[mapDestKey];

        //// If the map key has a . , it means that the source key is an object
        //if (mapDestKey.test(dotPattern)){
        //    var extrFields = mapDestKey.match(dotPattern);
        //    // Check if there are other subfields for this object field
        //    if (extrFields.length > 1) {


        //  Check if destKey is present in modelSchema ?
        if (schemaDestKey || mapDestKey === entityIdField || config.ignoreValidation) {

            if (config.ignoreValidation && source[map[mapDestKey]])
                modelSchema.allOf[0].properties[mapDestKey] = { "type": typeof source[map[mapDestKey]] }

            // If the value of key-value maping pair is a function definition, eval it.
            //if ( (typeof mapSourceField == "string") && mapSourceField.startsWith("function")) {
            //    map[destKey] = utils.parseFunction(mapSourceField);

            // Convert the single source field from map, to the final mapped single object or key-value pair, to be validated
            // If valid, it is added to the final result object, otherwise is discarded

            // Normalize encoding, avoiding problems with fields name not recognized due to different source encoding
            var normSourceKey = JSON.parse(unorm.nfc(JSON.stringify(mapSourceKey)));

            // Initialize with normalized Source Key, can be replaced in the specific cases below
            let parsedSourceKey = normSourceKey;

            // If the value type of mapped field is different from string, try first to extract it
            // If destination Schema field is OneOf
            if (schemaDestKey && !schemaDestKey.type && schemaDestKey.oneOf) {

                var oneOf = schemaDestKey.oneOf;

                /** If Destination Key is an object with coordinates it's a location type field or if it is "geometry" **/
                if (mapDestKey === 'location') {
                    if (normSourceKey.type && normSourceKey.coordinates && normSourceKey.type.startsWith('static:')) {

                        var parsedStaticType = normSourceKey.type.match(staticPattern)[1];
                        if (Array.isArray(oneOf) && oneOf.find(k => k.properties.type.enum.find(e => e == parsedStaticType))) {

                            parsedSourceKey['type'] = new Function("input", "return '" + parsedStaticType + "'");
                            parsedSourceKey['coordinates'] = new Function("input", "return " + "[Number(input['" + normSourceKey.coordinates[0] + "']),Number(input['" + normSourceKey.coordinates[1] + "'])]");
                        }

                    } else if (normSourceKey === 'geometry' || normSourceKey === 'location') {
                        parsedSourceKey = new Function("input", "return input['" + normSourceKey + "'];");
                    } else
                        continue;
                }

                /********************* Destination Key is an Object ****************************************/

            } else if (schemaDestKey && schemaDestKey.type === 'object' && typeof normSourceKey === 'object')

                parsedSourceKey = objectHandler(parsedSourceKey, normSourceKey, schemaDestKey, source)

            /********************* Destination Field is an Array ********************************************/

            else if (schemaDestKey && schemaDestKey.type === 'array' && Array.isArray(normSourceKey))

                parsedSourceKey = new Function("input", "return " + handleSourceFieldsToDestArray(normSourceKey));

            /********************* Destination Field is a Number ********************************************/

            else if (schemaDestKey && (schemaDestKey.type === 'number' || schemaDestKey.type === 'integer'))

                if (Array.isArray(normSourceKey))
                    parsedSourceKey = new Function("input", "return " + handleSourceFieldsArray(normSourceKey, 'number').result);

                else {

                    parsedSourceKey = handleDottedField(normSourceKey);

                    if (parsedSourceKey.startsWith('[')) {

                        let num = eval('source' + parsedSourceKey);

                        if (typeof num === 'string')
                            parsedSourceKey = new Function("input", "return Number(input['" + normSourceKey + "'])");

                        else if (typeof num === 'number')
                            parsedSourceKey = new Function("input", "return input['" + normSourceKey + "']");
                    }
                }

            /********************* Destination Field is a String ********************************************/

            else if (schemaDestKey && (schemaDestKey.type === 'boolean'))

                parsedSourceKey = new Function("input", "return (input['" + normSourceKey + "'].toLowerCase() == 'true' || input['" + normSourceKey + "'] == 1 || input['" + normSourceKey + "'] == '1'  ) ? true: false");

            else if (schemaDestKey && schemaDestKey.type === 'string') {

                if (schemaDestKey.format === 'date-time') {

                    var date = eval('source' + handleDottedField(normSourceKey));
                    if (date === undefined || date === '')
                        continue;
                    parsedSourceKey = new Function("input", "return new Date(input" + handleDottedField(normSourceKey) + ").toISOString()");
                } else if (Array.isArray(normSourceKey))
                    parsedSourceKey = new Function("input", "return " + handleSourceFieldsArray(normSourceKey).result);
                else if (typeof normSourceKey === 'string' && normSourceKey.startsWith("static:"))
                    parsedSourceKey = new Function("input", "return '" + normSourceKey.match(staticPattern)[1] + "'");
                else if (typeof normSourceKey === 'string' && normSourceKey.startsWith("encode:"))
                    parsedSourceKey = new Function("input", "return '" + encodingHandler(normSourceKey, source) + "'");

                /********************* Destination Key is a entityId field (according to definition in config.js) **/
            } else if (mapDestKey == entityIdField) {

                if (Array.isArray(normSourceKey) && normSourceKey.length !== 0) {
                    let resIdFields = handleSourceFieldsArray(normSourceKey);
                    parsedSourceKey = new Function("input", "return " + resIdFields.result);
                    isIdPrefix = resIdFields.isOnlyStatic;
                }
                else if (normSourceKey.startsWith("static:"))
                    parsedSourceKey = new Function("input", "return '" + normSourceKey.match(staticPattern)[1] + "'");
                else if (normSourceKey.startsWith("encode:"))
                    parsedSourceKey = new Function("input", "return '" + encodingHandler(normSourceKey, source) + "'");


            }

            // Add type to map field
            //parsedNorm.type = new Function("input", "return '" + modelSchemaDestKey.type +"'");

            /********************* Perform actual mapping with parsed and normalized source key (parsedNorm) **/

            if (typeof parsedSourceKey == "string")
                parsedSourceKey = parsedSourceKey.replaceAll('"', '')

            logger.debug(parsedSourceKey)
            logger.debug(typeof parsedSourceKey)

            var converter = mapper.makeConverter({ [mapDestKey]: parsedSourceKey });

            try {
                singleResult = converter(source);
            } catch (error) {
                //logger.error(error)
                logger.error(`There was an error: ${error} while processing ${parsedSourceKey} field`);
                continue;
            }

            /********************* Check if mapping result is valid ************************************************/

            let emptyObject = true;
            for (let a in singleResult) emptyObject = false
            if (emptyObject) singleResult[mapDestKey] = extractFromNestedField(source, normSourceKey)

            if (singleResult && Object.entries(singleResult).length !== 0
                && (mapDestKey == entityIdField || checkPairWithDestModelSchema(singleResult, mapDestKey, modelSchema, rowNumber))) {

                // Additional processing of sourceValue (e.g. filtering or concatenation with other fields)
                // .....
                // Add the mapped singleResult and the destination key to result object
                result[mapDestKey] = singleResult[mapDestKey];

            }
            else if (singleResult[mapDestKey] && (singleResult[mapDestKey][0] == "[")) {
                result[mapDestKey] = singleResult[mapDestKey].substring(1, singleResult[mapDestKey].length - 1).split(',');
            }
            else if (config.ignoreValidation)
                result[mapDestKey] = singleResult[mapDestKey];
            else {
                logger.debug(`Skipping source field: ${JSON.stringify(mapSourceKey)} because the value ${JSON.stringify(singleResult)} is not valid for mapped key: ${mapDestKey}`);
            }

        } else {
            logger.info(`The mapped key: ${mapDestKey} is not present in the selected Data Model Schema`);
        }
    }

    if (((NGSI_entity() == undefined) && config.NGSI_entity || NGSI_entity()).toString() === 'true') {

        // Append type field, according to the Data Model Schema
        try {
            logger.debug(result)
            if (!result.type)
                result.type = modelSchema?.allOf ? modelSchema.allOf ? modelSchema.allOf[0]?.properties?.type?.enum ? modelSchema.allOf[0]?.properties?.type?.enum[0] : modelSchema?.properties?.type?.enum ? modelSchema.properties.type.enum[0] || "Thing" : "Thing" : "Thing" : "Thing";
            result.type = result.type.replaceAll(" ", "")
            // Generate unique id for the mapped object (according to Id Pattern)
            result.id = utils.createSynchId(
                result ? result.type : "",
                //"", 
                site,// || "",
                service,// || "",
                group,// || "",
                result ? result[entityIdField] : "",
                isIdPrefix || "",
                rowNumber);
            delete result[entityIdField];
            result.id = result.id.replaceAll(" ", "")
        } catch (error) {
            logger.error(error)
            logger.error("UnknownEntity")
        }
    }
    else
        if (result[entityIdField]) result[entityIdField] = result[entityIdField].concat(rowNumber)

    /** Once we added only valid mapped single entries, let's do a final validation against the whole final mapped object
    * Despite single validations, the following one is mandatory to be successful
    **/
    if (checkResultWithDestModelSchema(result, mapDestKey, modelSchema, rowNumber)) {
        logger.debug('Mapped object, number: ' + rowNumber + ' is compliant with target Data Model');
        report.info('Mapped object, number: ' + rowNumber + ' is compliant with target Data Model');
        config.validCount++;
        return result;

    } else {

        report.info('--------------------------------------------------------------------------------\n' +
            'Mapped object, number:' + rowNumber + ', id: ' + result.id + ' is not compliant with target Data Model! Skipping!\n' +
            JSON.stringify(result) +
            '\n--------------------------------------------------------------------------------\n');

        logger.debug('Mapped object, number: ' + rowNumber + ', id: ' + result.id + ' is not compliant the target Data Model! Skipping!');
        config.unvalidCount++;
        return undefined;
    }

};

/* This function takes in input the source value to be mapped with a destination object, coming from the Data Model Schema
*  and checks if constraints present in the destination Model object are met by the source value
**/
const checkPairWithDestModelSchema = (mappedObject, destKey, modelSchema, rowNumber) => {
    
    //if (config.noSchema)
    //        return true
    var result = validator.validateSourceValue(mappedObject, modelSchema, true, rowNumber);
    logger.debug("Validator result : ", result)
    return result;

};

/* This function takes in input the final whole mapped object and validate it against the destination Data Model Schema
 **/
const checkResultWithDestModelSchema = (mappedObject, destKey, modelSchema, rowNumber) => {

    //if (config.noSchema)
    //    return true
    return validator.validateSourceValue(mappedObject, modelSchema, false, rowNumber);

};

/* Concatenates fields of the source array into a string (Source is array, dest is string)
 */
const handleSourceFieldsArray = (sourceFieldArray, sourceFieldType) => {

    var finalArray = [];
    var isOnlyStatic = true;
    var isNumber = (sourceFieldType && sourceFieldType === 'number');
    // If value of string array startwith "static:" it is a static string to be concatenated,
    // not the name of the source field.
    sourceFieldArray.forEach(function (value, index, array) {

        var staticMatch = value.match(staticPattern);
        if (staticMatch && staticMatch.length > 0) {
            // filter forbidden characters
            var filterMatch = undefined;
            if (!(filterMatch = staticMatch[1].match(/^([^\(]*)(\((.*)\)|\n|<|>|"|'|=|;|\(|\))(.*)$/)))
                finalArray[index] = "'" + staticMatch[1] + "'";
            else if (filterMatch.length === 1)
                finalArray[index] = ' ';
            else if (filterMatch.length === 5)
                finalArray[index] = "'" + filterMatch[1] + (filterMatch[3] ? filterMatch[3] : "") + filterMatch[4] + "'";
            else
                finalArray[index] = "'" + filterMatch[1] + filterMatch[4] + "'";
        } else {

            isOnlyStatic = false;
            var splittedDot = value.match(dotPattern);

            if (splittedDot) {

                splittedDot.shift();
                if (splittedDot.length > 0) {
                    finalArray[index] = finalArray[index] = (isNumber ? "Number(" : "") + "input['" + splittedDot.join("']['") + "']" + (isNumber ? ")" : "");
                } //return Number(input['" + normSourceKey + "'])

            } else {
                finalArray[index] = (isNumber ? "Number(" : "") + "input['" + value + "']" + (isNumber ? ")" : "");
            }
        }
    });

    return {
        result: finalArray.join(' + '),
        isOnlyStatic: isOnlyStatic
    };

};

/* Map fields of the source array into a stringifed Array (source and dest are both arrays)
*/
const handleSourceFieldsToDestArray = (sourceFieldArray) => {

    if (sourceFieldArray.length > 0) {
        var finalArray = [];
        var resultString = undefined;
        // If value of string array startwith "static:" it is a static string to be concatenated,
        // not the name of the source field.
        sourceFieldArray.forEach(function (value, index, array) {

            var staticMatch = value.match(staticPattern);
            if (staticMatch && staticMatch.length > 0) {

                finalArray[index] = staticMatch[1];

            } else {

                var splittedDot = value.match(dotPattern);
                if (splittedDot) {

                    splittedDot.shift();
                    if (splittedDot.length > 0)
                        finalArray[index] = "input['" + splittedDot.join("']['") + "']";

                } else {
                    finalArray[index] = "input['" + value + "']";
                }
            }
        });

        // print Array String as output
        resultString = '[';
        finalArray.forEach(function (value, index) {
            if (value.startsWith("input")) {
                resultString += value + ',';

            } else { //static
                resultString += '"' + value + '",';
            }
        });

        resultString = resultString.slice(0, resultString.length - 1) + ']';
        return resultString;
    } else return '[]';
};

/* Returns array notation from dotten notation (without input)
 */
const handleDottedField = (fieldName) => {

    var staticMatch = fieldName.match(staticPattern);
    if (staticMatch && staticMatch.length > 0) {

        return staticMatch[1];

    } else {

        var splittedDot = fieldName.match(dotPattern);

        if (splittedDot) {

            splittedDot.shift();
            if (splittedDot.length > 0)
                return "['" + splittedDot.join("']['") + "']";

        } else {
            return "['" + fieldName + "']";
        }
    }

};

module.exports = {
    loadMap: loadMap,
    mapObjectToDataModel: mapObjectToDataModel
};