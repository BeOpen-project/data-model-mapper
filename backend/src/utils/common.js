﻿const config = require ('../../config')
let logIndex = 0
const log = require('./logger')
module.exports = {
    e(error) {
        log.error(error)
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
            if (err) log.error(err);
        })
    
        logIndex++
    
        return error
    },
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    isMinioWriterActive () {
        return config.writers.includes('minioWriter');
    }
}