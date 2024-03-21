var Minio = require('minio')
let minioConfig = require('../../config').minioWriter
const { e, sleep } = require('../utils/common')
const Source = require("../server/api/models/source.js")
const log = require('../utils/logger')//.app(module);
const {trace, debug, info, warn, err} = log
function logger (fn, msg) {fn(msg, __filename)}

let minioClient = new Minio.Client({
  endPoint: minioConfig.endPoint,
  port: minioConfig.port,
  useSSL: minioConfig.useSSL,
  accessKey: minioConfig.accessKey,
  secretKey: minioConfig.secretKey,
})

module.exports = {

  async creteBucket(name, location) {

    let resultMessage
    let errorMessage

    minioClient.makeBucket(name, location, function (err) {
      if (err) {
        errorMessage = err;
        logger(err,err)
        return err
        //return e(err)
      }
      resultMessage = 'Bucket created successfully in ' + location + '.'
      logger(info,resultMessage)
      return resultMessage
    })

    let logCounterFlag
    while (!errorMessage && !resultMessage) {
      await sleep(1)
      if (!logCounterFlag) {
        logCounterFlag = true
        sleep(1000).then(resolve => {
          if (!errorMessage && !resultMessage)
            logger(debug,"waiting for creating bucket")
          logCounterFlag = false
        })
      }
    }
    if (errorMessage)
      throw errorMessage
    if (resultMessage)
      return resultMessage
    //})

  },

  subscribe(bucket) {
    minioClient.getBucketNotification(bucket, function (err, bucketNotificationConfig) {
      if (err) return logger(err,err)
      logger(info,bucketNotificationConfig)
    })
  },

  setNotifications(bucket) {

    var bucketNotification = new Minio.NotificationConfig()
    var arn = Minio.buildARN('aws', 'sqs', 'us-east-1', '1', 'webhook')
    var queue = new Minio.QueueConfig(arn)
    queue.addEvent(Minio.ObjectReducedRedundancyLostObject)
    queue.addEvent(Minio.ObjectCreatedAll)
    bucketNotification.add(queue)
    minioClient.setBucketNotification(bucket, bucketNotification, function (err) {
      if (err) return logger(err,err)
      logger(info,'Success')
    })
  },

  getNotifications(bucketName) {
    const poller = minioClient.listenBucketNotification(bucketName, '', '', ['s3:ObjectCreated:*'])
    poller.on('notification', async (record) => {
      logger(info,'New object: %s/%s (size: %d)', record.s3.bucket.name, record.s3.object.key, record.s3.object.size)
      const newObject = await this.getObject(record.s3.bucket.name, record.s3.object.key)
      let jsonParsed
      try {
        jsonParsed = JSON.parse(newObject)
      }
      catch (error) {
        logger(err,error)
      }

      let foundObject = (await Source.find({ name: record.s3.object.key }))[0]
      if (foundObject)
        await Source.findOneAndReplace({ name: record.s3.object.key },
          //format ? 
          {
            name: record.s3.object.key,
            source: jsonParsed ? jsonParsed : newObject,
            bucket: record.s3.bucket.name,
            from: "minio",
            timestamp: Date.now()
          }
          //: { name: record.s3.object.key, sourceCSV: newObject, bucket: record.s3.bucket.name, from: "minio", timestamp: new Number(Date.now()) }
        )
      else
        await Source.insertMany([
          //format ? 
          {
            name: record.s3.object.key,
            source: jsonParsed ? jsonParsed : newObject,
            bucket: record.s3.bucket.name,
            from: "minio",
            timestamp: Date.now()
          }
          //: { name: record.s3.object.key, sourceCSV: newObject, bucket: record.s3.bucket.name, from: "minio", timestamp: new Number(Date.now()) }
        ])
    })
    poller.on('error', (error) => {
      logger(err,error)
      logger(debug,"Creating bucket")
      this.creteBucket(bucketName, minioConfig.location).then(message => {
        logger(debug,message)
        this.getNotifications(bucketName)
      }
      )
    })
  },

  async listObjects(bucketName, prefix, recursive) {


    let resultMessage
    let errorMessage

    var data = []
    var stream = minioClient.listObjects(bucketName, '', true, { IncludeVersion: true })
    //var stream = minioClient.extensions.listObjectsV2WithMetadata(bucketName, '', true, '')
    stream.on('data', function (obj) {
      data.push(obj)
    })
    stream.on('end', function (obj) {
      if (!obj)
        logger(info,"ListObjects ended returning an empty object")
      else
        logger(info,"Found object " + JSON.stringify(obj))
      if (data[0])
        logger(info,JSON.stringify(data))
      resultMessage = data
      //process.res.send(data)
    })
    stream.on('error', function (err) {
      logger(err,err)
      errorMessage = err
    })

    let logCounterFlag
    while (!errorMessage && !resultMessage) {
      await sleep(1)
      if (!logCounterFlag) {
        logCounterFlag = true
        sleep(1000).then(resolve => {
          if (!errorMessage && !resultMessage)
            logger(debug,"waiting for list")
          logCounterFlag = false
        })
      }
    }
    if (errorMessage)
      throw errorMessage
    if (resultMessage)
      return resultMessage
  },

  async listBuckets() {
    return await minioClient.listBuckets()
  },

  fileUpload(bucketName, objectName) {
    var metaData = {
      'Content-Type': 'application/octet-stream',
      'X-Amz-Meta-Testing': 1234,
      example: 5678,
    }

    try {
      minioClient.fPutObject(bucketName, objectName, minioConfig.defaultFileInput, metaData, function (err, etag) {
        logger(info,etag)
        if (err) {
          logger(err,err)
          return err
          //return e(err)
        }
        logger(info,'File uploaded successfully.')
      })
    }
    catch (error) {
      logger(err,error)
      //e(error)
    }
  },

  async stringUpload(bucketName, objectName, object) {

    logger(debug,bucketName + " " + " " + objectName + " " + JSON.stringify(object))

    let resultMessage
    let errorMessage

    minioClient.putObject(bucketName, objectName, Buffer.from(object), function (err, res) {
      if (err) {
        logger(err,"An error occurred while writing object")
        errorMessage = err
        logger(err,err)
        return err
        //return e(err)
      }
      logger(info,"Object Writter.\n Result : ")
      logger(info,JSON.stringify(res))
      resultMessage = res
    })

    let logCounterFlag
    while (!errorMessage && !resultMessage) {
      await sleep(1)
      if (!logCounterFlag) {
        logCounterFlag = true
        sleep(1000).then(resolve => {
          if (!errorMessage && !resultMessage)
            logger(debug,"waiting for upload")
          logCounterFlag = false
        })
      }
    }
    if (errorMessage)
      throw errorMessage
    if (resultMessage)
      return resultMessage
    // })

  },

  async getObject(bucketName, objectName, format) {

    logger(debug,"Now getting object " + objectName + " in bucket " + bucketName)

    let resultMessage
    let errorMessage

    minioClient.getObject(bucketName, objectName, function (err, dataStream) {
      if (err) {
        errorMessage = err
        logger(err,err)
        return err
        //return e(err)
      }

      let objectData = '';
      dataStream.on('data', function (chunk) {
        objectData += chunk;
      });

      dataStream.on('end', function () {
        logger(info,'Object data: ', objectData);
        try {
          resultMessage = format == 'json' ? JSON.parse(objectData) : objectData
        }
        catch (error) {
          logger(err,error)
          resultMessage = format == 'json' ? [{ data: objectData }] : objectData
        }
      });

      dataStream.on('error', function (err) {
        logger(info,'Error reading object:')
        errorMessage = err
        logger(err,err)
        //e(err);
      });

    });

    let logCounterFlag
    while (!errorMessage && !resultMessage) {
      await sleep(1)
      if (!logCounterFlag) {
        logCounterFlag = true
        sleep(1000).then(resolve => {
          if (!errorMessage && !resultMessage)
            logger(debug,"waiting for object " + objectName + " in bucket " + bucketName)
          logCounterFlag = false
        })
      }
    }
    if (errorMessage)
      throw errorMessage
    if (resultMessage)
      return resultMessage
    //})
  }
}