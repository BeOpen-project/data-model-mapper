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
const config = require('../../config')
const winston = require('winston');
const path = require('path');
const Log = require('../server/api/models/log')
const DailyRotateFile = require('winston-daily-rotate-file');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }


const myFormat = printf(msg => {
    return `[${msg.timestamp} [${msg.label}] ${msg.level}: ${msg.message}`;
});

const getLabel = (callingModule) => {
    var parts = callingModule.filename.split(path.sep);
    return path.join(parts[parts.length - 2], parts.pop());
};

const logFormat = (callingModule) => {
    if (callingModule)
        return combine(
            label({
                label: getLabel(callingModule)
            }),
            timestamp(),
            myFormat
        );
    else
        return combine(
            label({
                label: __filename.replace(/^.*[\\\/]/, '')
            }),
            timestamp(),
            myFormat
        );
};

const transport = () => {
    return new winston.transports.DailyRotateFile({
        dirname: './logs',
        level: config.LOG || 'info',
        filename: 'out.log',
        datePattern: 'YYYY-MM-DD',
        maxsize: '50mb', //5MB,
        zippedArchive: true
    });
};

const transportErr = () => {
    return new winston.transports.DailyRotateFile({
        dirname: './logs',
        level: "error",
        filename: 'error.log',
        datePattern: 'YYYY-MM-DD',
        maxsize: '50mb', //5MB,
        zippedArchive: true
    });
};

const reportTransport = new winston.transports.DailyRotateFile({
    dirname: './reports/validation',
    filename: 'out.log',
    datePattern: 'YYYY-MM-DD',
    maxsize: '500mb', //5MB,
    zippedArchive: true
});

const reportTransportErr = new winston.transports.DailyRotateFile({
    dirname: './reports/validation',
    level: "error",
    filename: 'error.log',
    datePattern: 'YYYY-MM-DD',
    maxsize: '500mb', //5MB,
    zippedArchive: true
});

const orionReportTransport = new winston.transports.DailyRotateFile({
    dirname: './reports/orion',
    filename: 'out.log',
    datePattern: 'YYYY-MM-DD',
    maxsize: '500mb', //5MB,
    zippedArchive: true
});

const orionReportTransportErr = new winston.transports.DailyRotateFile({
    dirname: './reports/orion',
    level: "error",
    filename: 'error.log',
    datePattern: 'YYYY-MM-DD',
    maxsize: '500mb', //5MB,
    zippedArchive: true
});

//
// Return the logger for generic app log, with specific label for passed module name
//

const createAppLogger = (module) => {
    let logger =
        winston.createLogger({
            transports: [
                transport(),
                transportErr()
            ],
            format: logFormat(module)
        });

    // Add console transport in case we are not in production
    if (config.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: logFormat(module),
            level: config.LOG || 'info'
        }));
    }
    return logger;

};




//
// Configure the logger for report
//
winston.loggers.add('report', {
    transports: [
        reportTransport,
        reportTransportErr
    ],
    format: logFormat()
});

//
// Configure the logger for Orion report
//
winston.loggers.add('orionReport', {
    transports: [
        orionReportTransport,
        orionReportTransportErr
    ],
    format: logFormat()
});


/*module.exports = {
    app: createAppLogger,
    report: winston.loggers.get('report'),
    orionReport: winston.loggers.get('orionReport')
};*/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const LEVEL = process.env.LEVEL?.toLowerCase() || config.logLevel || "trace"
let logs = ""
let busy = false
async function saveLogs() {
    if (logs[0]) {
        busy = true
        //const newLog = new Log({
        //    messages: logs
        //});
        //await newLog.save
        /*((err, insertedLog) => {
            if (err) {
                console.error("Errore during logs save:", err);
                return;
            }*/
        try {
            await Log.insertMany([{ messages: logs, timestamp: parseInt(Date.now()) }])
            console.log("Logs saved");
        }
        catch (error) {
            console.log("Logs saving fail");
            console.error(error)
        }
        logs = ""
        busy = false
        //});
    }
    //else
    //    console.debug("No logs to save")
}

async function deleteLogs() {
    try {
        await Log.deleteMany({ timestamp: { $lt: parseInt(Date.now() - 2592000000) } })
        console.log("Older logs deleted")
    }
    catch (error) {
        console.log("Older logs deleting fail")
        console.error(error)
    }
}

setInterval(deleteLogs, 86400000)

//setInterval(saveLogs, 600000);
setInterval(saveLogs, config.logSaveInterval);

async function customLogger(level, fileName) {
    //console.debug(typeof fileName)
    //console.debug(JSON.stringify(fileName))
    if (fileName.includes("backend"))
        fileName = fileName.split("backend")[1]
    //const currentDate = new Date().toISOString();

    // Ottieni la riga di codice
    //const stackTrace = new Error().stack.split("\n")[2].trim().split(" ");
    //const lineNumber = stackTrace[stackTrace.length - 1].split(":")[1];

    // Ottieni il file di esecuzione (nome del file che importa il logger)
    //const fileName = __filename
    //return (`[${currentDate}] [${fileName}:${lineNumber}] [${level}]`)

    const currentDate = new Date().toISOString();
    const log = (`[${currentDate}] [${fileName}] [${level}]`)
    while (busy && await sleep(1))
        console.log("Wait for logs backup")
    //logs.push(log)
    return log;
    return (`[${currentDate}] [${fileName}] [${level}]`);
    const stackTrace = fileName.stack.split("\n")[2].trim().split("(");
    const filePath = stackTrace[stackTrace.length - 1]?.split(")")[0].split("backend")[1]
    return (`[${currentDate}] [${filePath}] [${level}]`);

}

function logBackup(...messages) {
    for (let m of messages)
        if (m != " ")
            logs += JSON.stringify(m instanceof Error ? m.toString() + "\n" + m.stack : m) + "\n"
    console.log(...messages)
}

function debugBackup(...messages) {
    for (let m of messages)
        if (m != " ")
            logs += JSON.stringify(m instanceof Error ? m.toString() + "\n" + m.stack : m) + "\n"
    console.debug(...messages)
}

function errorBackup(...messages) {
    for (let m of messages)
        if (m != " ")
            logs += JSON.stringify(m instanceof Error ? m.toString() + "\n" + m.stack : m) + "\n"
    console.error(...messages)
}

function warnBackup(...messages) {
    for (let m of messages)
        if (m != " ")
            logs += JSON.stringify(m instanceof Error ? m.toString() + "\n" + m.stack : m) + "\n"
    console.warn(...messages)
}

function infoBackup(...messages) {
    for (let m of messages)
        if (m != " ")
            logs += JSON.stringify(m instanceof Error ? m.toString() + "\n" + m.stack : m) + "\n"
    console.info(...messages)
}

class Logger {

    constructor(fileName) {
        this.fileName = fileName
    }

    customLogger(level) {
        if (this.fileName.includes("backend"))
            this.fileName = this.fileName.split("backend")[1]
        const currentDate = new Date().toISOString();
        const log = (`[${currentDate}] [${this.fileName}] [${level}]`)
        return log;
    }

    //fileName = new Error()

    //customLogger : customLogger,
    async saveLogs(){
        await saveLogs();
    }

    async trace(...message) {
        if (LEVEL == "trace") {
            // console.log(...
            logBackup(await customLogger("trace", this.fileName), " ", ...message)
            //   )

        }
    }
    async debug(...message) {
        if (LEVEL == "trace" || LEVEL == "debug") {
            //   console.debug(...
            debugBackup(await customLogger("debug", this.fileName), " ", ...message)
            //)

        }
    }
    async info(...message) {
        if (LEVEL == "trace" || LEVEL == "debug" || LEVEL == "info") {
            //  console.info(...
            infoBackup(await customLogger("info", this.fileName), " ", ...message)
            // )
        }
    }
    async warn(...message) {
        if (LEVEL == "trace" || LEVEL == "debug" || LEVEL == "info" || LEVEL == "warn") {
            // console.warn(...
            warnBackup(await customLogger("warn", this.fileName), " ", ...message)
            //  )

        }
    }
    async error(...message) {
        if (LEVEL == "trace" || LEVEL == "debug" || LEVEL == "info" || LEVEL == "warn" || LEVEL == "error") {
            // console.error(...
            errorBackup(await customLogger("error", this.fileName), " ", ...message)
            //  )

        }
    }
    async err(...message) {
        if (LEVEL == "trace" || LEVEL == "debug" || LEVEL == "info" || LEVEL == "warn" || LEVEL == "error") {
            // console.error(...
            errorBackup(await customLogger("error", this.fileName), " ", ...message)
            // )
        }
    }
}

module.exports = {
    Logger: Logger,
    report: winston.loggers.get('report'),
    orionReport: winston.loggers.get('orionReport')
}
