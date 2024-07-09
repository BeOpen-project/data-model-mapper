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
    logLevel: 'trace', // error, warn, info, verbose, debug or silly
    host: "localhost",
    externalPort: 5500,
    httpPort: 5500, // PORT where the application will listen if ran in server mode
    modelSchemaFolder: path.join(__dirname, "dataModels"), // DO NOT TOUCH - Data Model schemas folder
    NGSI_entity: true, // true, // enable or disable ngsi entity source
    ignoreValidation: false, // ignore validation errors
    disableAjv: true, //true, // disable an external validator,
    mappingReport: true, // disable output mapping report
    logSaveInterval: 30000,
    noSchema: false,
    //idVersion: 1, // 1 for 2023 version compatibility mode, 2 for newest version

    /********************** 3 INPUTS CONFIGURATION ************************
    * Followings are related to Mapping MANDATORY inputs (source, map, data model).
    * File Paths can be either absolute or relative
    **/

    sourceDataPath: "input/",
    mapPath: "input/",
    targetDataModel: "Data Model name, according to the related Schema contained in the DataModels folder",

    /************************** Rows/Objects proccesing range *************
    * Following indicates the start and end row/object of the input file to be proccessed
    * To indicate "until end", use Infinity in rowEnd
    **/
    rowStart: 0,
    rowEnd: Number.MAX_VALUE,//1.7976931348623157e+308,

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

    entityNameField: "entitySourceId",//"entitySourceId",

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
        orionUrl: "https://platform.beopen-dep.it/contextBroker",
        //orionUrl: "http://localhost:1026", // The Context Broker endpoint (baseUrl) where mapped entities will be stored (/v2/entities POST)
        orionAuthHeaderName: "", // Authorization Header name (e.g. X-Auth-Token or Authorization) for Orion request // Leave blank if any
        orionAuthToken: "", // Authorization token name for Orion request (e.g. Bearer XXX) // Leave blank if any
        fiwareService: "", // Fiware-Service header to be put in the Orion request
        fiwareServicePath: "/", // Fiware-ServicePath header to be put in the Orion request
        enableProxy: false, // Enable Orion requests through a Proxy
        proxy: '', // insert in the form http://user:pwd@proxyHost:proxyPort
        skipExisting: false, // Skip mapped entities (same ID) already existing in the CB, otherwise update them according to updateMode parameter
        updateMode: "REPLACE", // Possible values: APPEND, REPLACE. If to append or replace attributes in the existing entities. Used only if skipExisting = false
        maxRetry: 5, // Max retry number per entity POST, until the entity is skipped and marked as NOT WRITTEN
        parallelRequests: 30, // DO NOT TOUCH - Internal configuration for concurrent request parallelization

        //keyValues: true, //If false, transforms Mapped object to an Orion Entity (explicit types in attributes)
        //keyValuesOption : '?options=keyValues',
        //relativeUrl : "/v2/entities",
        protocol: "v2",

        keyValues: true, //If false, transforms Mapped object to an Orion Entity (explicit types in attributes)
        relativeUrl: "/ngsi-ld/v1/entities",
        keyValuesOption: ""
    },

    /*************** File Wirter CONFIGURATION *******************************/
    fileWriter: {
        filePath: "./output/result.json",
        addBlankLine: true
    },

    /*************** Auth config CONFIGURATION *******************************/
    authConfig: {
        idmHost: "https://platform.beopen-dep.it/auth",
        clientId: "beopen-dashboard",
        userInfoEndpoint: "https://platform.beopen-dep.it/api/user",//"http://localhost:5500/api/mockGetUser",
        //disableAuth: true,
        authProfile: "oidc",
        authRealm: "master",
        introspect: false,
        publicKey: "-----BEGIN PUBLIC KEY-----\n" +
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqTBjtPH02skpjCe0DcN/PEAg+JgdyALSfpr7RiNukvVr6yEl/BXiK7ckAqPRcGPXcYh0MS2MFLpOm99RmHDI2i1JDejXS+lLLf1V+7dVRZtSTI/O7IhOclZ5nd31+/D/PH5vZ6ZyAgtgTZKj94rSyaLRfzGyjyBfye3i6GXjDotEIf3Alhqrr/mL/lu1jA5gF6alNNJPoe9VGWBrstMRe0Ojd36ThrJpyLs80sFBgciUUE8TSeCnULePWoGXYLO7RR2aNdXEf8cSnSWsqHz/OEh2Cjk6nElTnZucYQqY0ylH0ZH9EDR+MNRgBSAyrJMfzQWqLSfIAb84hQ9XRLgp4QIDAQAB" +
            "\n-----END PUBLIC KEY-----",
        secret: "" // don't push it
    },


    /*************** Minio writer CONFIGURATION *****************************/

    minioWriter: {
        endPoint: 'localhost',//'platform.beopen-dep.it/minio',
        //endPoint2: 'platform.beopen-dep.it/minio',//'platform.beopen-dep.it/minio',
        //endPoint: 'kubernetes.docker.internal',//'platform.beopen-dep.it/minio',
        //endPoint: 'play.min.io',
        port: 9000,//5502,
        useSSL: false,
        accessKey: 'kfLWkkBMDBpvHQ9MH9Ap',//'Q3AM3UQ867SPQQA43P2F',
        secretKey: '4gmG2XFfiTvcojsgRrnUxmFbxxWNOwbqnNUdk1SX',// 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
        location: "us-east-1",
        defaultFileInput: "../../input/inputFile.json",
        defaultOutputFolderName: "private generic data",
        defaultInputFolderName: "data model mapper",
        //defaultOutputBucketName: "private generic data",
        //defaultBucketName: "data model mapper",
        subscribe: {
            all: false,
            buckets: []//["datamodelmapper"],
            //buckets: []
        }
        //location: "eu",
        //accessKey: 'lQrNpaEPjRMLuUVirPfK',
        //secretKey: 'DgurHiJWWYRM83pGDWMoTEZb5tr0E7IEoHwmGelk',
    }

}

module.exports = config;
