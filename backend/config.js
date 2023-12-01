/*******************************************************************************
 * Data Model Mapper
 *  Copyright (C) 2018 Engineering Ingegneria Informatica S.p.A.
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
const path = require('path');

var config = {

    /********************** GLOBAL APPLICATION CONFIGURATION *****************
    * Followings are related to global configurations of the application
    **/
    env: 'debug', // debug or production
    mode: 'server', // commandLine or server 
    logLevel: 'debug', // error, warn, info, verbose, debug or silly
    httpPort: 5500, // PORT where the application will listen if ran in server mode
    modelSchemaFolder: path.join(__dirname, "dataModels"), // DO NOT TOUCH - Data Model schemas folder
    NGSI_entity: false, // enable or disable ngsi entity source
    ignoreValidation: true, // ignore validation errors
    mappingReport: true, // disable output mapping report

    /********************** 3 INPUTS CONFIGURATION ************************
    * Followings are related to Mapping MANDATORY inputs (source, map, data model).
    * File Paths can be either absolute or relative
    **/

    sourceDataPath: "/", // "input/",
    mapPath: "/", // "input/",
    targetDataModel: "Data Model name, according to the related Schema contained in the DataModels folder",

    /************************** Rows/Objects proccesing range *************
    * Following indicates the start and end row/object of the input file to be proccessed
    * To indicate "until end", use Infinity in rowEnd
    **/
    rowStart: 0,
    rowEnd: Infinity,

    /************************** Output string clean ***********************
    * The regex to delete from the output string fields
    * **/

    regexClean: {
        custom: /\0/g, // the regex provided from the request in server mode
        default: /\n|'|<|>|"|'|=|;|\(|\)/g // DO NOT TOUCH this is the default value for ngsi entity 
    },

    /************************* CSV Parser configuration *******************
     * Configuration parameters in case of CSV input
     **/
    delimiter: ";", // Column delimiter
    endLine: "\n",  // Row delimiter
    deleteEmptySpaceAtBeginning: true,

    /********************** OUTPUT/WRITERS CONFIGURATION ****************** 
    * Following is related to writers which will handle mapped objects. Possible values: fileWriter, orionWriter
    **/
    writers: ["fileWriter"], //["orionWriter", "fileWriter"],

    /********************* OUTPUT ID PATTERN CONFIGURATION ****************
    * Following used for id pattern creation
    **/

    site: "SomeRZ",
    service: "SomeService",
    group: "CSV", // could be any value, CSV used to group all entities, for these site and service, coming from a CSV.

    /*********** DO NOT TOUCH ********************************************/
    // Following represents the reserved field name in the MAP file, whose value (string or string array ),
    // will represent one or more fields from which the entityName part of the resulting ID will be taken
    // It is recommended to not modify it :), just use in the map the default field "entitySourceId" as reserved for this purpose

    entityNameField: "entitySourceId",

    // (SOON) If the entityNameField is not specified in the map, the following indicates the prefix of generated ID 
    // it will be concatenated with the row / object number. If empty, that prefix will be the source filename

    entityDefaultPrefix: "ds", // SOON

    /************************* MongoDB configuration *******************
    * Configuration of MongoDB
    **/

    mongo: "mongodb://localhost:27017/DataModelMapper", // mongo url 

    /************************* Debugger enable *************************/

    debugger: false, // enable an alternate version of logger


    /*************** ORION Context Broker CONFIGURATION **********************/
    orionWriter: {

        orionUrl: "http://localhost:1026", // The Context Broker endpoint (baseUrl) where mapped entities will be stored (/v2/entities POST)
        orionAuthHeaderName: "", // Authorization Header name (e.g. X-Auth-Token or Authorization) for Orion request // Leave blank if any
        orionAuthToken: "", // Authorization token name for Orion request (e.g. Bearer XXX) // Leave blank if any
        fiwareService: "", // Fiware-Service header to be put in the Orion request
        fiwareServicePath: "/", // Fiware-ServicePath header to be put in the Orion request
        enableProxy: false, // Enable Orion requests through a Proxy
        proxy: '', // insert in the form http://user:pwd@proxyHost:proxyPort
        skipExisting: false, // Skip mapped entities (same ID) already existing in the CB, otherwise update them according to updateMode parameter
        updateMode: "APPEND", // Possible values: APPEND, REPLACE. If to append or replace attributes in the existing entities. Used only if skipExisting = false
        maxRetry: 5, // Max retry number per entity POST, until the entity is skipped and marked as NOT WRITTEN
        parallelRequests: 30 // DO NOT TOUCH - Internal configuration for concurrent request parallelization
    },

    /*************** File Wirter CONFIGURATION *******************************/
    fileWriter: {
        filePath: "./output/result.json",
        addBlankLine: true
    }
}

module.exports = config;
