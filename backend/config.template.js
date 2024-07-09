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
    mode: 'commandLine', // commandLine or server 
    logLevel: 'debug', // error, warn, info, verbose, debug or silly
    httpPort: 8081, // PORT where the application will listen if ran in server mode
    host: "",
    externalPort: undefined, //use undefined if, in prod, you are exposing the data model mapper server with domain instead of IP:port
    modelSchemaFolder: path.join(__dirname, "dataModels"), // DO NOT TOUCH - Data Model schemas folder
    NGSI_entity: false, // enable or disable ngsi entity source 
    ignoreValidation: false, // ignore validation errors
    disableAjv: false, // disable an external validator,
    mappingReport: false, // disable output mapping report
    logSaveInterval: 30000, // log backup interval
    idVersion: 2, // 1 for 2023 version compatibility mode, 2 for newest version
    noSchema: false,

    /********************** 3 INPUTS CONFIGURATION ************************
    * Followings are related to Mapping MANDATORY inputs (source, map, data model).
    * File Paths can be either absolute or relative
    **/

    sourceDataPath: "C:\\path\\to\\inputFile.csv (Windows) or /path/to/inputFile.csv (Mac/Linux)",
    mapPath: "C:\\path\\to\\map.json (Windows) or /path/to/map.json (Mac/Linux)",
    targetDataModel: "Data Model name, according to the related Schema contained in the DataModels folder",

    /************************** Rows/Objects proccesing range *************
    * Following indicates the start and end row/object of the input file to be proccessed
    * To indicate "until end", use Number.MAX_VALUE in rowEnd
    **/
    rowStart: 0,
    rowEnd: Number.MAX_VALUE,

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
    delimiter: ",", // Column delimiter
    endLine: "\n",  // Row delimiter
    deleteEmptySpaceAtBeginning: true, // If set as true, the empty space at the beginning of the string will be deleted

    /********************** OUTPUT/WRITERS CONFIGURATION ****************** 
    * Following is related to writers which will handle mapped objects. Possible values: fileWriter, orionWriter, minioWriter
    **/
    writers: ["orionWriter", "fileWriter", "minioWriter"],

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

    mongo: "mongodb://IPmongo:PORT/DataModelMapper", // mongo url

    /************************* Debugger enable *************************/

    debugger: false // enable an alternate version of logger

    /*********************************************************************/

};

/*************** ORION Context Broker CONFIGURATION **********************/
config.orionWriter = {

    orionUrl: "https://orionUrl", // The Context Broker endpoint (baseUrl) where mapped entities will be stored (/v2/entities POST)
    orionAuthHeaderName: "", // Authorization Header name (e.g. X-Auth-Token or Authorization) for Orion request // Leave blank if any
    orionAuthToken: "", // Authorization token name for Orion request (e.g. Bearer XXX) // Leave blank if any
    fiwareService: "", // Fiware-Service header to be put in the Orion request
    fiwareServicePath: "/", // Fiware-ServicePath header to be put in the Orion request
    enableProxy: false, // Enable Orion requests through a Proxy
    proxy: '', // insert in the form http://user:pwd@proxyHost:proxyPort
    skipExisting: false, // Skip mapped entities (same ID) already existing in the CB, otherwise update them according to updateMode parameter
    updateMode: "APPEND", // Possible values: APPEND, REPLACE. If to append or replace attributes in the existing entities. Used only if skipExisting = false
    maxRetry: 5, // Max retry number per entity POST, until the entity is skipped and marked as NOT WRITTEN
    parallelRequests: 30, // DO NOT TOUCH - Internal configuration for concurrent request parallelization
    keyValues: false, //If false, transforms Mapped object to an Orion Entity (explicit types in attributes)
    keyValuesOption : '?options=keyValues',
    relativeUrl : "/v2/entities",
    protocol : "v1"
};

/*************** File Wirter CONFIGURATION *******************************/
config.fileWriter = {
    filePath: "./result.json",
    addBlankLine: true
};

/*************** Auth CONFIGURATION **************************************/
config.authConfig = {
    idmHost: "https://hostDomain/auth",
    userInfoEndpoint : "",
    clientId: "",
    disableAuth: "false",
    authProfile: "oidc",
    authRealm: "",
    introspect: false, // validate jwt with keycloak
    publicKey: "", // keycloak public key if you want to validate jwt without keycloak call
    secret: "" // don't push it
}

/*************** Minio writer CONFIGURATION *****************************/

config.minioWriter = {
    endPoint: '',
    port: 9000,
    useSSL: true,
    accessKey: '',
    secretKey: '',
    location: 'eu',
    defaultFileInput: '',
    defaultInputFolderName: '',
    defaultOutputFolderName: '',
    subscribe: {
        all: false,
        buckets: []
    }
}

module.exports = config;