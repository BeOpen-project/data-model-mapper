const service = require("../services/service.js")
const utils = require("../../../utils/utils.js")
const log = require('../../../utils/logger')//.app(module);
const { Logger } = log
const logger = new Logger(__filename)

module.exports = {

    mapData: async (req, res) => {

        process.res = res;
        let { sourceData, map, dataModel } = utils.bodyMapper(req.body)

        try {
            await service.mapData(sourceData, map, dataModel, req.body.config)
            if (service.error) res.status(404).send(service.error + ".\nMaybe the files name you specified are not correct.")
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
        service.error = null
        logger.info("service.mapData end");
    },

    getSources: async (req, res) => {
        process.res = res;
        try {
            res.send(await service.getAllSources(req.query.bucketName || req.body.bucketName, req.body.prefix, req.query.format))
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    getSourcesFromDB: async (req, res) => {
        process.res = res;
        try {
            res.send(await service.getSourcesFromDB(req.body.prefix))
        }
        catch (error) {
            logger.error(error)
            res.status(500).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    getSourcesFromMinio: async (req, res) => {
        process.res = res;
        try {
            res.send(await service.getMinioObjects(req.params.bucketName || req.query.bucketName,req.body.prefix, req.query.format, []))
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    getMaps: async (req, res) => {
        process.res = res;
        try {
            res.send(await service.getMaps(req.body.prefix))
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    getDataModels: async (req, res) => {
        process.res = res;
        try {
            res.send(await service.getDataModels(req.body.prefix))
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    getSource: async (req, res) => {
        const { id, name, mapRef } = req.query
        process.res = res;
        try {
            res.send(await service.getSource(id, name, mapRef, req.body.prefix))
        }
        catch (error) {
            logger.error(error)
            res.status(error.code || 400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    getMap: async (req, res) => {
        const { id, name } = req.query
        process.res = res;
        try {
            res.send(await service.getMap(id, name, req.body.prefix))
        }
        catch (error) {
            logger.error(error)
            res.status(error.code || 400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    getConfig: async (req, res) => {
        process.res = res;
        try {
            res.send(await service.getConfig())
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    getDataModel: async (req, res) => {
        const { id, name, mapRef } = req.query
        process.res = res;
        try {
            res.send(await service.getDataModel(id, name, mapRef, req.body.prefix))
        }
        catch (error) {
            logger.error(error)
            res.status(error.code || 400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    insertSource: async (req, res) => {

        process.res = res;
        try {
            res.send(await service.insertSource(req.body.name, req.body.id, req.body.source, req.body.path, req.body.mapRef, req.body.bucketName, req.body.prefix))
            logger.info("Source inserted");
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    insertMap: async (req, res) => {

        process.res = res;
        try {
            res.send(await service.insertMap(req.body.name, req.body.id, req.body.map, req.body.dataModel, req.body.status, req.body.description,
                req.body.sourceData, req.body.sourceDataMinio, req.body.sourceDataID, req.body.sourceDataIn, req.body.sourceDataURL, req.body.dataModelIn, req.body.dataModelID, req.body.dataModelURL,
                req.body.config, req.body.sourceDataType, req.body.path, req.body.bucketName, req.body.prefix))
            logger.info("Map inserted");
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    insertDataModel: async (req, res) => {

        process.res = res;
        try {
            res.send(await service.insertDataModel(req.body.name, req.body.id, req.body.dataModel, req.body.mapRef, req.body.bucketName, req.body.prefix))
            logger.info("Model inserted");
        }
        catch (error) {
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
            logger.error(error.toString() == "[object Object]" ? error : error.toString())
        }

    },

    modifySource: async (req, res) => {

        process.res = res;
        try {
            res.send(await service.modifySource(req.body.name, req.body.id, req.body.source, req.body.path, req.body.mapRef, req.body.bucketName, req.body.prefix))
            logger.info("Source modified");
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    assignSource: async (req, res) => {

        process.res = res;
        try {
            res.send(await service.assignSource(req.body.sourceDataID, req.body.mapRef))
            logger.info("Source assigned");
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    assignSchema: async (req, res) => {

        process.res = res;
        try {
            res.send(await service.assignSchema(req.body.dataModelID, req.body.mapRef))
            logger.info("Schema assigned");
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    deAssignSource: async (req, res) => {

        process.res = res;
        try {
            res.send(await service.deAssignSource(req.body.sourceDataID, req.body.mapRef))
            logger.info("Source deassigned");
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    deAssignSchema: async (req, res) => {

        process.res = res;
        try {
            res.send(await service.deAssignSchema(req.body.dataModelID, req.body.mapRef))
            logger.info("Schema deassigned");
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    modifyMap: async (req, res) => {

        process.res = res;
        try {
            res.send(await service.modifyMap(req.body.name, req.body.id, req.body.map, req.body.dataModel, req.body.status, req.body.description,
                req.body.sourceData, req.body.sourceDataMinio, req.body.sourceDataID, req.body.sourceDataIn, req.body.sourceDataURL, req.body.dataModelIn, req.body.dataModelID, req.body.dataModelURL,
                req.body.config, req.body.sourceDataType, req.body.path, req.body.bucketName, req.body.prefix))
            logger.info("Map modified");
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    modifyDataModel: async (req, res) => {

        process.res = res;
        try {
            res.send(await service.modifyDataModel(req.body.name, req.body.id, req.body.dataModel, req.body.mapRef, req.body.bucketName, req.body.prefix))
            logger.info("Schema modified");
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    deleteSource: async (req, res) => {
        const { id, name } = req.query
        process.res = res;
        try { res.send(await service.deleteSource(id, name, req.body.prefix)) }
        catch (error) { res.status(400).send(error.toString() == "[object Object]" ? error : error.toString()) }
    },

    deleteMap: async (req, res) => {
        const { id, name } = req.query
        process.res = res;
        try {
            res.send(await service.deleteMap(id || req.params.id, name, req.body.prefix))
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    deleteDataModel: async (req, res) => {
        const { id, name } = req.query
        process.res = res;
        try {
            res.send(await service.deleteDataModel(id, name, req.body.prefix))
        }
        catch (error) {
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    dereferenceSchema: async (req, res) => {

        process.res = res;
        if (req.body.bucketName) req.body.bucketName = undefined
        if (req.body.prefix) req.body.prefix = undefined

        try {
            res.send(await service.dereferenceSchema(req.body))
        }
        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    cleanSchema: async (req, res) => {

        process.res = res;
        if (req.body.bucketName) req.body.bucketName = undefined
        if (req.body.prefix) req.body.prefix = undefined

        try {
            res.send(await service.dataModelDeClean(req.body))
        }

        catch (error) {
            logger.error(error)
            res.status(400).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },


    minioCreateBucket: async (req, res) => {
        process.res = res;
        try {
            res.send(await service.minioCreateBucket(req.params.bucketName))
        }
        catch (error) {
            let errorStatusCode
            logger.error(error)
            if (error.code == "BucketAlreadyOwnedByYou" || error.name == "InvalidBucketNameError")
                errorStatusCode = 400
            else
                errorStatusCode = 500
            if (error.name == "InvalidBucketNameError")
                error.details = "Use lower a case bucket name"
            res.status(errorStatusCode).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    minioGetObject: async (req, res) => {
        process.res = res;
        try {
            res.send(await service.minioGetObject(req.params.bucketName, req.params.objectName, req.query.format))
        }
        catch (error) {
            let errorStatusCode
            logger.error(error)
            if (error.code == "NoSuchKey")
                errorStatusCode = 400
            else
                errorStatusCode = 500
            res.status(errorStatusCode).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    minioListObjects: async (req, res) => {
        process.res = res;
        try {
            res.send(await service.minioListObjects(req.params.bucketName || req.query.bucketName))
        }
        catch (error) {
            logger.error(error)
            res.status(500).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    minioGetBuckets: async (req, res) => {
        process.res = res;
        try {
            res.send(await service.minioGetBuckets())
        }
        catch (error) {
            logger.error(error)
            res.status(500).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    minioSubscribe: async (req, res) => {
        process.res = res;
        try {
            res.send(await service.minioSubscribe(req.params.bucketName))
        }
        catch (error) {
            logger.error(error)
            res.status(500).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    minioInsertObject: async (req, res) => {
        process.res = res;
        try {
            res.send(await service.minioInsertObject(req.params.bucketName, req.params.objectName, req.body))
        }
        catch (error) {
            let errorStatusCode
            logger.error(error)
            if (error.message == 'third argument should be of type "stream.Readable" or "Buffer" or "string"')
                errorStatusCode = 400
            else
                errorStatusCode = 500
            res.status(errorStatusCode).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    getToken: async (req, res) => {
        try {
            res.send(req.headers.authorization.split(' ')[1])
        }
        catch (error) {
            logger.error(error)
            res.status(500).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    },

    getLogs: async (req, res) => {
        try {
            res.send(await service.getLogs(req.query.from, req.query.to))
        }
        catch (error) {
            logger.error(error)
            res.status(500).send(error.toString() == "[object Object]" ? error : error.toString())
        }
    }
};