﻿/*******************************************************************************
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

var JSONStream = require('JSONStream');
const request = require('request');
const fs = require('fs');
const utils = require('../utils/utils');
const log = require('../utils/logger')//.app(module);
const report = require('../utils/logger').report;
const apiOutput = require('../server/api/services/service')
const config = require('./../../config');



async function sourceDataToRowStream(sourceData, map, schema, rowHandler, mappedHandler, finalizeProcess) {

    // The source Data is the file content itself
    if (sourceData && !sourceData.ext) {

        try {
            await fileToRowStream(sourceData, map, schema, rowHandler, mappedHandler, finalizeProcess);
        }
        catch (err) {
            log.error('There was an error while getting buffer from source data: ');
            log.error(err)
        }

    }

    // The source Data is the file URL
    else if (utils.httpPattern.test(sourceData.path))
        await urlToRowStream(sourceData, map, schema, rowHandler, mappedHandler, finalizeProcess);

    // The Source Data is the file path
    else if (sourceData.ext)
        await fileToRowStream(fs.createReadStream(sourceData.absolute), map, schema, rowHandler, mappedHandler, finalizeProcess);
    else
        log.error("No valid Source Data was provided");

}

async function urlToRowStream(url, map, schema, rowHandler, mappedHandler, finalizeProcess) {

    var rowNumber = Number(config.rowNumber);
    var rowStart = Number(config.rowStart);
    var rowEnd = Number(config.rowEnd);

    request(url).pipe(JSONStream.parse('.*'))
        .on('error', function (err) {
            log.error(err);
        })
        .on('header', function (columns) {
            //  log.info('Columns: ' + columns);
        })
        .on('data', function (data) {

            rowNumber++;
            config.rowNumber = rowNumber;
            // outputs an object containing a set of key/value pair representing a line found in the csv file.
            if (rowNumber >= rowStart && rowNumber <= rowEnd) {

                rowHandler(rowNumber, row, map, schema, mappedHandler);

            }
        })
        .on('column', function (key, value) {
            // outputs the column name associated with the value found
            // log.info('#' + key + ' = ' + value);
        })
        .on('end', async function () {
            try {

                await finalizeProcess();
                log.debug("urlToRowStream: request(url).pipe(geo.parse()).on(end)");
                await utils.printFinalReportAndSendResponse(log);
                await utils.printFinalReportAndSendResponse(report);
            } catch (error) {
                log.error("Error While finalizing the streaming process: ");
                log.error(error);
            }

        });
}


async function fileToRowStream(inputData, map, schema, rowHandler, mappedHandler, finalizeProcess) {

    var rowNumber = Number(config.rowNumber);
    var rowStart = Number(config.rowStart);
    var rowEnd = Number(config.rowEnd);

    await inputData.pipe(JSONStream.parse('.*'))
        .on('error', function (err) {
            log.error(err);
        })
        .on('header', function (columns) {
            // log.info(columns);
        })
        .on('data', function (row) {
            rowNumber = Number(config.rowNumber) + 1;
            config.rowNumber = rowNumber;

            // outputs an object containing a set of key/value pair representing a line found in the csv file.
            if (rowNumber >= rowStart && rowNumber <= rowEnd) {

                rowHandler(rowNumber, row, map, schema, mappedHandler);

            }

        }).on('column', function (key, value) {
            // outputs the column name associated with the value found
            //log.info('#' + key + ' = ' + value);
        })
        .on('end', async function () {
           
            await finalizeProcess();
            log.debug("fileToRowStream: inputData.pipe(geo.parse()).on(end)");
            await utils.printFinalReportAndSendResponse(log);
            await utils.printFinalReportAndSendResponse(report);

        });

}

module.exports = {
    sourceDataToRowStream: sourceDataToRowStream
};