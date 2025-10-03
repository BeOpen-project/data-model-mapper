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
//IMPORTANT: this module now does not work with multiple requests. Use it only in cli mode

var fs = require('fs');
const log = require('../utils/logger')//.app(module);
const {Logger} = log
const logger = new Logger(__filename)
const utils = require('../utils/utils');
const config = require('../../config').fileWriter;

var outFileStream = undefined;
var isFirstObject = true;



const writeObject = async (objNumber, obj, addBRLine) => {

    /** Initialize File Stream and its first content ***/
    if (utils.isFileWriterActive && !outFileStream) {

        outFileStream = fs.createWriteStream(config.outFilePath || utils.parseFilePath(config.filePath).absolute);
        outFileStream.write("[");

    }

    if (obj && config.outFilePath && outFileStream) {

        return new Promise(async (resolve, reject) => {

            logger.debug('Writing to file, object number: ' + objNumber + ' , id: ' + obj.id);
            try {

                outFileStream.on('error', (error) => reject("There was an error while writing object to File Stream: " + error));
                //outFileStream.on('data', () => resolve("'Entity Number: ' + objNumber + ' with Id: ' + obj.id + ' correctly written to file"));

                // Write the object
                if (!isFirstObject)
                    outFileStream.write(",");

                outFileStream.write(JSON.stringify(obj));
                isFirstObject = false;
                config.fileWrittenCount++;

                // Add a blank return line if enabled
                if (addBRLine)
                    outFileStream.write("\n");

                logger.debug("'Entity Number: ' + objNumber + ' with Id: ' + obj.id + ' correctly written to file");
                return resolve();

            } catch (err) {
                config.fileUnWrittenCount++;
                logger.error('Error while writing mapped object to file');
                logger.error('----------------------------------------------------------\n' +
                    'Entity Number: ' + objNumber + ' with Id: ' + obj.id + ' NOT written to file');
                logger.error(err)
                return reject(err);
            }
        });
    } else {

        return new Promise(async (resolve, reject) => {
            logger.info('');
            logger.debug("Mapped Object is undefined or the FileWriter was not correctly configured");
            return resolve();
        });
    }
};

const finalizeFile = async () => {

    return new Promise(async (resolve, reject) => {

        await outFileStream?.write("]");
        await outFileStream?.on('end', () => resolve("File stream correctly closed"));
        await outFileStream?.on('error', () => reject("File stream failed to close"));
        await outFileStream?.end();
        outFileStream = undefined;
        return resolve();
    }).then(value => { if (value) logger.debug(value) }).catch(value => logger.error(value));
};

const printFileFinalReport = async (logger) => {

    await logger.info('\t\n--------FILE WRITER REPORT----------\n' +
        '\t Object written to File: ' + config.fileWrittenCount + '/' + config.validCount + '\n' +
        '\t Object NOT written to File: ' + config.fileUnWrittenCount + '/' + config.validCount + '\n' +
        '\t-----------------------------------------');

};

/// Use Events?
async function checkAndPrintFinalReport() {
    if (parseInt(config.fileWrittenCount) + parseInt(config.fileUnWrittenCount) == parseInt(config.validCount)) {
        await printFileFinalReport(log);
    }
}

module.exports = {
    writeObject: writeObject,
    finalize: finalizeFile,
    checkAndPrintFinalReport: checkAndPrintFinalReport
}