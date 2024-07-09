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

const csv = require('csv-stream');
const request = require('request');
const fs = require('fs');
const utils = require('../utils/utils.js');
const log = require('../utils/logger')//.app(module);
const {Logger} = log
const logger = new Logger(__filename)
const config = require('../../config');


// All of these arguments are optional.
var options = {
    delimiter: config.delimiter || ',', // default is ,
    endLine: config.endLine || '\n', // default is \n,
    //columns: ['columnName1', 'columnName2'], // by default read the first line and use values found as columns
    columnOffset: 0, // default is 0
    escapeChar: '', // default is an empty string
    enclosedChar: '"' // default is an empty string
};


function sourceDataToRowStream(sourceData, map, schema, rowHandler, mappedHandler, finalizeProcess) {

    if (config.delimiter) options.delimiter = config.delimiter;

    // The Source Data is the File Stream
    if (sourceData && utils.isReadableStream(sourceData)) {

        logger.debug("The Source Data is the File Stream")

        try {
            fileToRowStream(sourceData, map, schema, rowHandler, mappedHandler, finalizeProcess);
        }
        catch (err) {
            logger.error('There was an error while getting buffer from source data: ');
            logger.error(err)
        }
    }

    // The source Data is the file URL
    else if (utils.httpPattern.test(sourceData.path))
        try {
            urlToRowStream(sourceData, map, schema, rowHandler, mappedHandler, finalizeProcess);
        }
        catch (error) {
            logger.error('There was an error while getting buffer from source data: \n');
            logger.error(error)
        }

    // The Source Data is the file path
    else if (sourceData.ext)
        try {
            fileToRowStream(fs.createReadStream(sourceData.absolute), map, schema, rowHandler, mappedHandler, finalizeProcess);
        }
        catch (err) {
            logger.error('There was an error while getting buffer from source data: \n');
            logger.error(err)
        }
    else
        logger.error("No valid Source Data was provided");
}

function urlToRowStream(url, map, schema, rowHandler, mappedHandler, finalizeProcess) {

    var csvStream = csv.createStream(options);
    var rowNumber = Number(config.rowNumber);
    var rowStart = Number(config.rowStart);
    var rowEnd = Number(config.rowEnd);

    request(url).pipe(csvStream)
        .on('error', function (err) {
            logger.error(err);
        })
        .on('header', function (columns) {
            //  logger.info('Columns: ' + columns);
        })
        .on('data', function (data) {

            rowNumber = Number(config.rowNumber) + 1;
            config.rowNumber = rowNumber;
            // outputs an object containing a set of key/value pair representing a line found in the csv file.
            if (rowNumber >= rowStart && rowNumber <= rowEnd) {

                rowHandler(rowNumber, row, map, schema, mappedHandler);
            }
        })
        .on('column', function (key, value) {
            // outputs the column name associated with the value found
            // logger.info('#' + key + ' = ' + value);
        })
        .on('end', async function () {
            try {
                await finalizeProcess();

            } catch (error) {
                logger.error("Error While finalizing the streaming process: ");
                logger.error(error)
            }
        });
}


function fileToRowStream(inputData, map, schema, rowHandler, mappedHandler, finalizeProcess) {

    var csvStream = csv.createStream(options);
    var rowNumber = Number(config.rowNumber);
    var rowStart = Number(config.rowStart);
    var rowEnd = Number(config.rowEnd);

    inputData.pipe(csvStream)
        .on('error', function (err) {
            logger.error(err);
        })
        .on('header', function (columns) {
            logger.debug(columns)
        })
        .on('data', function (row) {

            rowNumber++;
            config.rowNumber = rowNumber;
            // outputs an object containing a set of key/value pair representing a line found in the csv file.
            if (rowNumber >= rowStart && rowNumber <= rowEnd) {

                rowHandler(rowNumber, row, map, schema, mappedHandler);

            }
        })
        .on('column', function (key, value) {
            // outputs the column name associated with the value found
            //logger.info('#' + key + ' = ' + value);
        })
        .on('end', async function () {
            try {
                await finalizeProcess();

            } catch (error) {
                logger.error("Error While finalizing the streaming process: ");
                logger.error(error)
            }
        });

}


module.exports = {
    sourceDataToRowStream: sourceDataToRowStream
};