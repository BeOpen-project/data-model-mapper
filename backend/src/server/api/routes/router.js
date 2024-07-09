// A global reset config middleware is configured for all endpoints in server.js

const express = require("express")
const controller = require("../controllers/controller.js")
const router = express.Router()
const multer = require('multer');
const upload = multer();
const { auth } = require("../middlewares/auth.js")

router.post(encodeURI("/map/transform"), upload.none(), auth, controller.mapData)
router.post(encodeURI("/map/register"), upload.none(), auth, controller.insertMap)
router.post(encodeURI("/source"), upload.none(), auth, controller.insertSource)
router.post(encodeURI("/dataModel"), upload.none(), auth, controller.insertDataModel)
router.post(encodeURI("/dereferenceSchema"), upload.none(), auth, controller.dereferenceSchema)
router.post(encodeURI("/cleanSchema"), upload.none(), auth, controller.cleanSchema)

router.get(encodeURI("/map"), auth, controller.getMap)
router.get(encodeURI("/config"), auth, controller.getConfig)
router.get(encodeURI("/source"), auth, controller.getSource)
router.get(encodeURI("/dataModel"), auth, controller.getDataModel)

router.get(encodeURI("/maps"), auth, controller.getMaps)
router.get(encodeURI("/sources"), auth, controller.getSources)
router.get(encodeURI("/sources/db"), auth, controller.getSourcesFromDB)
router.get(encodeURI("/sources/minio"), auth, controller.getSourcesFromMinio)
router.get(encodeURI("/dataModels"), auth, controller.getDataModels)
//
router.get(encodeURI("/bearer"), controller.getToken)
router.get(encodeURI("/logs"), auth, controller.getLogs)

router.put(encodeURI("/map"), upload.none(), auth, controller.modifyMap)
router.put(encodeURI("/source"), upload.none(), auth, controller.modifySource)
router.put(encodeURI("/dataModel"), upload.none(), auth, controller.modifyDataModel)

/* temporary disabled endpoints
router.put(encodeURI("/source/assign"), upload.none(), auth, controller.assignSource)
router.put(encodeURI("/dataModel/assign"), upload.none(), auth, controller.assignSchema)
router.put(encodeURI("/source/deAssign"), upload.none(), auth, controller.deAssignSource)
router.put(encodeURI("/dataModel/deAssign"), upload.none(), auth, controller.deAssignSchema)
router.get(encodeURI("/mockGetUser"), controller.mockGetUser)
router.post(encodeURI("/minio/createBucket/:bucketName"), upload.none(), auth, controller.minioCreateBucket)
router.post(encodeURI("/minio/insertObject/:bucketName/:objectName"), upload.none(), auth, controller.minioInsertObject)
router.get(encodeURI("/minio/listObjects/:bucketName"), auth, controller.minioListObjects)
router.get(encodeURI("/minio/listObjects"), auth, controller.minioListObjects)
router.get(encodeURI("/minio/getObjects/:bucketName"), auth, controller.getSourcesFromMinio)
router.get(encodeURI("/minio/getObjects"), auth, controller.getSourcesFromMinio)
router.get(encodeURI("/minio/getBuckets"), auth, controller.minioGetBuckets)
router.get(encodeURI("/minio/subscribe/:bucketName"), auth, controller.minioSubscribe)
*/

router.get(encodeURI("/minio/getObject/:bucketName/:objectName"), auth, controller.minioGetObject)

router.delete(encodeURI("/map"), auth, controller.deleteMap)
router.delete(encodeURI("/source"), auth, controller.deleteSource)
router.delete(encodeURI("/dataModel"), auth, controller.deleteDataModel)

module.exports = router
