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


const config = require("../../config");
const winston = require("winston");
const path = require("path");
const Log = require("../server/api/models/log");
const DailyRotateFile = require("winston-daily-rotate-file");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const fs = require("fs");
let registredDay = 0;
const logPath = config.logPath || "logs/"
if (!fs.existsSync(logPath))
  fs.mkdirSync(logPath, { recursive: true });
let logStream = fs.createWriteStream(setLogDate(), { flags: "a" });
const { inspect } = require('util')

setInterval(checkDate, 6000);
setInterval(deleteOldLogs, 24 * 60 * 60 * 1000);
deleteOldLogs()

function setLogDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  // Aggiungiamo 1 a month perché gennaio è 0
  const day = String(date.getDate()).padStart(2, "0");
  registredDay = day;

  return logPath + `${year}-${month}-${day}` + ".txt";
}

function checkDate() {
  if (registredDay !== String(new Date().getDate()).padStart(2, "0")) {
    logStream.close();
    logStream = fs.createWriteStream(setLogDate(), { flags: "a" });
  }
}

// Funzione per controllare l'età di un file
function isOlderThan30Days(filePath) {
  try {
    const fileStats = fs.statSync(filePath);
    const { mtimeMs, birthtimeMs } = fileStats
    //console.debug(fileStats)
    const fileTime = (birthtimeMs > mtimeMs) && birthtimeMs || (mtimeMs > birthtimeMs) && mtimeMs
    //console.debug(fileTime)
    const currentDate = Date.now();
    //console.debug(currentDate)
    const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
    //console.debug(currentDate - fileTime)
    //console.debug(thirtyDaysInMilliseconds)
    //console.debug(currentDate - fileTime > thirtyDaysInMilliseconds)
    return currentDate - fileTime > thirtyDaysInMilliseconds;
  } catch (err) {
    if (err.code === "EPERM") {
      console.error("Errore di permessi:", err);
    } else {
      console.error("Errore durante l'ottenimento delle statistiche:", err);
    }
  }
}

// Funzione per eliminare i file
function deleteOldLogs() {
  fs.readdir(logPath + "", (err, files) => {
    if (err) {
      console.error("Errore durante la lettura della directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(logPath, file);
      if (isOlderThan30Days(filePath)) {
        fs.unlinkSync(filePath, (err) => {
          if (err) {
            console.error(
              `Errore durante l'eliminazione del file ${file}:`,
              err
            );
          } else {
            console.log(`File ${file} eliminato.`);
          }
        });
      }
    });
  });
}

const myFormat = printf((msg) => {
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
        label: getLabel(callingModule),
      }),
      timestamp(),
      myFormat
    );
  else
    return combine(
      label({
        label: __filename.replace(/^.*[\\\/]/, ""),
      }),
      timestamp(),
      myFormat
    );
};

const transport = () => {
  return new winston.transports.DailyRotateFile({
    dirname: "./logs",
    level: config.LOG || "info",
    filename: "out.log",
    datePattern: "YYYY-MM-DD",
    maxsize: "50mb", //5MB,
    zippedArchive: true,
  });
};

const transportErr = () => {
  return new winston.transports.DailyRotateFile({
    dirname: "./logs",
    level: "error",
    filename: "error.log",
    datePattern: "YYYY-MM-DD",
    maxsize: "50mb", //5MB,
    zippedArchive: true,
  });
};

const reportTransport = new winston.transports.DailyRotateFile({
  dirname: "./reports/validation",
  filename: "out.log",
  datePattern: "YYYY-MM-DD",
  maxsize: "500mb", //5MB,
  zippedArchive: true,
});

const reportTransportErr = new winston.transports.DailyRotateFile({
  dirname: "./reports/validation",
  level: "error",
  filename: "error.log",
  datePattern: "YYYY-MM-DD",
  maxsize: "500mb", //5MB,
  zippedArchive: true,
});

const orionReportTransport = new winston.transports.DailyRotateFile({
  dirname: "./reports/orion",
  filename: "out.log",
  datePattern: "YYYY-MM-DD",
  maxsize: "500mb", //5MB,
  zippedArchive: true,
});

const orionReportTransportErr = new winston.transports.DailyRotateFile({
  dirname: "./reports/orion",
  level: "error",
  filename: "error.log",
  datePattern: "YYYY-MM-DD",
  maxsize: "500mb", //5MB,
  zippedArchive: true,
});

//
// Return the logger for generic app log, with specific label for passed module name
//

const createAppLogger = (module) => {
  let logger = winston.createLogger({
    transports: [transport(), transportErr()],
    format: logFormat(module),
  });

  // Add console transport in case we are not in production
  if (config.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: logFormat(module),
        level: config.LOG || "info",
      })
    );
  }
  return logger;
};

//
// Configure the logger for report
//
winston.loggers.add("report", {
  transports: [reportTransport, reportTransportErr],
  format: logFormat(),
});

//
// Configure the logger for Orion report
//
winston.loggers.add("orionReport", {
  transports: [orionReportTransport, orionReportTransportErr],
  format: logFormat(),
});

const LEVEL = process.env.LEVEL?.toLowerCase() || config.logLevel || "trace";

function saveLog(log) {
  try {
    if (log && (Array.isArray(log) || typeof log == "object"))
      try {
        logStream.write(JSON.stringify(log) + "\n");
      }
      catch (error) {
        logStream.write(JSON.stringify(inspect(log)) + "\n");
      }
    /*else if (log == false)
      logStream.write("false\n");
    else if (log == null)
      logStream.write("null\n");
    else if (log == undefined)
      logStream.write("undefined\n");*/
    else
      logStream.write(log + "\n");
  } catch (error) {
    console.log("Logs saving fail");
    console.error(error);
  }
}

function customLogger(level, fileName) {
  if (fileName.includes("backend")) fileName = fileName.split("backend")[1];
  const currentDate = new Date().toISOString();
  const line = new Error().stack.split("\n")[3].split("  at").pop()
  const log = `[${currentDate}] [${line}] [${level}]\n`;
  //const log = `[${currentDate}] [${fileName}] [${level}]`;
  return log;
}

function logBackup(...messages) {
  console.log(...messages);
  for (let m of messages) if (m !== " ") saveLog(m);
}

function debugBackup(...messages) {
  console.debug(...messages);
  for (let m of messages) if (m !== " ") saveLog(m);
}

function errorBackup(...messages) {
  console.error(...messages);
  for (let m of messages) if (m !== " ") saveLog(m);
}

function warnBackup(...messages) {
  console.warn(...messages);
  for (let m of messages) if (m !== " ") saveLog(m);
}

function infoBackup(...messages) {
  console.info(...messages);
  for (let m of messages) if (m !== " ") saveLog(m);
}

function minifyMessages(...messages) {
  let messagesArray = [...messages]
  for (let i = 0; i < messagesArray.length; i++) {
    messagesArray[i] = minifyMessage(messagesArray[i]);
    //messagesArray[i] = minifyMessage(...messagesArray[i]);
  }
  return messagesArray
}

function minifyMessage(messag) {
  let message = messag//[0]
  let start = 500, end = 800
  try {
    if (message && (Array.isArray(message) || typeof message == "object"))
      try {
        if (JSON.stringify(message).length < (start + end))
          return message
        return JSON.stringify(message).substring(0, start).concat("...").concat(JSON.stringify(message).substring(JSON.stringify(message).length - end))//, JSON.stringify(message).length - 1))
      }
      catch (error) {
        if (JSON.stringify(inspect(message)).length < 400)
          return message
        return JSON.stringify(inspect(message)).substring(0, start).concat("...").concat(JSON.stringify(inspect(message)).substring(JSON.stringify(inspect(message)) - end))//, JSON.stringify(inspect(message)).length - 1))
      }
    if (typeof message == "string")
      if (message.length < 400)
        return message
      else
        return message.substring(0, start).concat("...").concat(message.length - end)//, message.length - 1)
    return message
  } catch (error) {
    console.log("Logs minifying fail", error, message);
    return message
  }
}

class Logger {
  constructor(fileName) {
    this.fileName = fileName;
  }

  customLogger(level) {
    if (this.fileName.includes("backend"))
      this.fileName = this.fileName.split("backend")[1];
    const currentDate = new Date().toISOString();
    const log = `[${currentDate}] [${this.fileName}] [${level}]`;
    return log;
  }

  truncate = {
    trace: (...message) => {
      if (LEVEL == "trace")
        logBackup(customLogger("trace", this.fileName), " ", ...minifyMessages(message));
    },
    debug: (...message) => {
      if (LEVEL == "trace" || LEVEL == "debug")
        debugBackup(customLogger("debug", this.fileName), " ", ...minifyMessages(message));
    },
    info: (...message) => {
      if (LEVEL == "trace" || LEVEL == "debug" || LEVEL == "info")
        infoBackup(customLogger("info", this.fileName), " ", ...minifyMessages(message));
    },
    warn: (...message) => {
      if (
        LEVEL == "trace" ||
        LEVEL == "debug" ||
        LEVEL == "info" ||
        LEVEL == "warn"
      )
        warnBackup(customLogger("warn", this.fileName), " ", ...minifyMessages(message));
    },
    error: (...message) => {
      if (
        LEVEL == "trace" ||
        LEVEL == "debug" ||
        LEVEL == "info" ||
        LEVEL == "warn" ||
        LEVEL == "error"
      )
        errorBackup(customLogger("error", this.fileName), " ", ...minifyMessages(message));
    },
    err: (...message) => {
      if (
        LEVEL == "trace" ||
        LEVEL == "debug" ||
        LEVEL == "info" ||
        LEVEL == "warn" ||
        LEVEL == "error"
      )
        errorBackup(customLogger("error", this.fileName), " ", ...minifyMessages(message));
    }
  }

  trace(...message) {
    if (LEVEL == "trace")
      if (config.truncateLogs)
        logBackup(customLogger("trace", this.fileName), " ", ...minifyMessages(message));
      else
        logBackup(customLogger("trace", this.fileName), " ", ...message);
  }
  debug(...message) {
    if (LEVEL == "trace" || LEVEL == "debug")
      if (config.truncateLogs)
        debugBackup(customLogger("debug", this.fileName), " ", ...minifyMessages(message));
      else
        debugBackup(customLogger("debug", this.fileName), " ", ...message);
  }
  info(...message) {
    if (LEVEL == "trace" || LEVEL == "debug" || LEVEL == "info")
      if (config.truncateLogs)
        infoBackup(customLogger("info", this.fileName), " ", ...minifyMessages(message));
      else
        infoBackup(customLogger("info", this.fileName), " ", ...message);

  }
  warn(...message) {
    if (
      LEVEL == "trace" ||
      LEVEL == "debug" ||
      LEVEL == "info" ||
      LEVEL == "warn"
    )
      if (config.truncateLogs)
        warnBackup(customLogger("warn", this.fileName), " ", ...minifyMessages(message));
      else
        warnBackup(customLogger("warn", this.fileName), " ", ...message);
  }
  error(...message) {
    if (
      LEVEL == "trace" ||
      LEVEL == "debug" ||
      LEVEL == "info" ||
      LEVEL == "warn" ||
      LEVEL == "error"
    )
      if (config.truncateLogs)
        errorBackup(customLogger("error", this.fileName), " ", ...minifyMessages(message));
      else
        errorBackup(customLogger("error", this.fileName), " ", ...message);
  }
  err(...message) {
    if (
      LEVEL == "trace" ||
      LEVEL == "debug" ||
      LEVEL == "info" ||
      LEVEL == "warn" ||
      LEVEL == "error"
    )
      if (config.truncateLogs)
        errorBackup(customLogger("error", this.fileName), " ", ...minifyMessages(message));
      else
        errorBackup(customLogger("error", this.fileName), " ", ...message);
  }
}

module.exports = {
  Logger: Logger,
  report: winston.loggers.get("report"),
  orionReport: winston.loggers.get("orionReport"),
};
