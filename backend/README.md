# SynchroniCity - Data Model Mapper

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

# Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Mapping Guide](#mapping)
5. [Logging](#logging)
6. [License](#license)

--------------------

<a name="introduction"></a>

# 1. Introduction

The Data Model Mapper tool enables to convert several file types (e.g. CSV, Json, GeoJson) to the different [Data Models](https://gitlab.com/synchronicity-iot/synchronicity-data-models) defined in the [SynchroniCity Project](https://synchronicity-iot.eu/). 
The files in input can contain either rows, JSON objects or GeoJson Features, each of them representing an object to be mapped to an NGSI entity, according to the selected Data Model.

In particular, it performs following steps:

1) **Parsing:**
    - Parse input file, by converting it into a row/object stream.
2) **Streaming:**
    - Each row/object coming from the stream is converted to an intermediate object.
3) **Mapping:** 
    - By using the input JSON Map, convert the intermediate object to an NGSI entity, according to a specific target Data Model.
4) **Validation and report:**
    - Validate resulting object against the JSON schema corresponding to a target Data Model. It leverages [AJV JSON Schema Validator](https://github.com/epoberezkin/ajv).
    - Produce a report file with validated and unvalidated objects.
* **Writing: Orion CB or File**
    - Validated objects are sent to the configured [Orion Context Broker](https://fiware-orion.readthedocs.io/en/master/) and/or to a local file.

The tool is developed in [Node.js](https://nodejs.org) and can be started as a command line tool and as a REST server

--------------------
<a name="installation"></a>

## 2. Installation

### Prerequisites

The tool requires [NodeJS](https://nodejs.org/it/) version >= 8.11 to be installed.

### Tool Installation

Go to the root folder and type following command:

```
npm install
```

After configuring the tool correctly (conf file or cli arguments), start with:

```
node mapper
```

If you want to start the automated tests run:

```
npm test
```

> If you have selected the Command Line mode append to the previous command the appropriate arguments (as described in  [**Configuration**](#configuration) section). 

--------------------

<a name="configuration"></a>

## 3. Configuration

The configuration of the Data Model Mapper consists of the following steps:
* [**Application**](#conf-application) (optional, left intact to use defaults)
* [**Input**](#conf-input) (mandatory)
* [**ID Pattern**](#conf-id) (mandatory)
* [**Rows Range**](#conf-rows) (optional)
* [**Writers**](#conf-writers) (mandatory)
 

> **`IMPORTANT`** The tool takes its default configuration from the `config.js` file, but some parameters in configuration file (config.js) will be overriden if the corresponding parameters are provided as Command Line arguments or in the HTTP request, depending on which running mode was selected for the tool.

--------------------

<a name="conf-application" />

### 3.1 Configuration - Application 

The global setup is defined in the `config.js` file
* Rename the `config.template.js` file to `config.js` and modify accordingly to the following options:

  + **``env``**: the execution environment. Accepted values are:
    - **`debug`**: the logs are written in the **``/logs``** folder. 
    - **`production`**: the logs are displayed in the console output.

  + **``mode``**: the execution mode. Accepted values are:
    - **`server`**: requests are accepted via HTTP. 
    - **`commandLine`**: you must append the arguments via command line.

  + **``logLevel``**: logging level for [WINSTON](https://www.npmjs.com/package/winston). Valid values are the followings:
    - **``error, warn, info, verbose, debug, silly``**

  + **``httpPort``**: PORT where the application will listen if ran in server mode.

  + **``debugger``**: enable an alternate version of logger.
    - **``true,false``**

  + **``NGSI_entity``**: enable or disable ngsi entity source.
    - **``true,false``**

  + **``ignoreValidation``**: ignore or not validation errors.
    - **``true,false``**

  + **``sourceDataPath``**: source data path.

  + **``mapPath``**: map data path.

  + **``mongo``**: mongo url.

  + **``writers``**: The names of Writers, the handlers for writing the resulting mapped NGSI entities to different outputs. Accepted values (one or more) are:
    - **`orionWriter`**: To write NGSI entities **directly** to a specified **Orion Context Broker**.
    - **`fileWriter`**: To write NGSI entities **locally** to a specified file.

--------------------

<a name="conf-input" />

### 3.2 Configuration - Input

* In order to perform the mapping process, the tool takes **three** inputs:
  1) **`Source`**: The path of the **source file** containing data to be mapped (CSV, JSON or GeoJson).
  2) **`Map`**, specifying the mapping between source fields and destrination fields. It is a **JSON** , where the key-value pairs represent the mapping for each row contained in the source file.
  3) **`Target Data Model`**: the name of the **target SynchroniCity Data Model**.

These three inputs, can be specified either in the **`config.js`** file, as CLI arguments or in the HTTP request (depending on running mode). Following sections describe each option.

#### 3.2.1 Inputs configuration in config file

In order to set Input configuration as config file parameters, modify the following fields of the `config.js` file:

* **``sourceDataPath``** : The path of the source file. If it is a Windows path, it **MUST** be with double backslashes (e.g. **C:\\\Users\\\\....**).
* **``mapPath``**: The path of JSON Map, **MUST** be with `.json` extension. (See following [Mapping Guide](#mapping) section)
* **``targetDataModel``**: The name of target **Data Model** (must match with those contained in the **/dataModels** folder).

**Example:**

```
sourceDataPath: "path/to/sourcefile.csv"
```

#### 3.2.2 Inputs configuration as CLI arguments

In order to use inputs configuration as CLI arguments, append following arguments to the `node mapper` command:

* ``-s, --sourceDataPath``
* ``-m, --mapPath``
* ``-d, --targetDataModel``

**Example:**

```
node mapper -s "path/to/sourcefile.csv" -m "path/to/mapFile.json -d "WeatherObserved"
```

> **`Note`** Previous CLI arguments, if provided, will **override** the default ones specified in `config.js` file.

Do not use npm start at the moment.

#### 3.2.3 Inputs configuration in the body of HTTP request

In order to use data model mapper as server mode, you must set the mode in config.js as server and run node mapper. 

You can send a request at <host-url>:<port>/api/map with these parameters in body :

* **``sourceDataType``**: the type of the source data to convert.
* **``sourceDataIn``**: the path of the source data to convert. Has priority over **``sourceData``**, **``sourceDataID``**, and **``sourceDataURL``**.
* **``sourceDataURL``**: the URL of the source data to convert. Has priority over **``sourceData``** and **``sourceDataID``**.
* **``sourceDataID``**: the Mongo document ID of the source data to convert. Has priority over **``sourceData``**.
* **``sourceData``**: the source data to convert, if no sourceDataIn, no sourceDataID and no sourceDataURL are specified in their field.
* **``mapPathIn``**: the path of the mapping file. Has priority over **``mapData``** and **``mapDataID``**.
* **``mapDataID``**: the Mongo document ID of the mapping file. Has priority over **``mapData``**.
* **``mapData``**: the mapping file, if no mapPathIn and mapDataID are specified in their field.
* **``dataModelIn``**: the name of the target data model (inside the Data Model folder) to compare with the output for validation. Has priority over  **``dataModel``**
* **``dataModelID``**: the Mongo document ID of the target data model to compare with the output for validation. Has priority over **``dataModel``**
* **``dataModel``**: the data model to compare with the output for validation, if no dataModelIn and dataModelID are specified in their field.
* **``config``**: an object containing the configuration file's keys-values pairs that need to be overwritten just for the specified request. 

**Example:**

```
{
    "sourceDataIn": "5. ServiceModel.csv", 
    "mapPathIn": "5. ServiceModelMap.json", 
    "dataModelIn": "ServiceModel",
    "config": {
      "csvDelimiter": ";",
      "NGSI_entity" : false
    }
}
```

<a name="conf-id"/>

### 3.3 Configuration - Id Pattern

Following configurations are relative to fields that will compose the generated IDs of mapped entities, according to the SynchroniCity’s Entity ID Recommendation.

> **`Note`** Id Pattern fields can be specified either in the **`config.js`** file, as CLI arguments or in the HTTP request (depending on running mode).

#### 3.3.1 Id Pattern  configuration in config file

In order to set Id Pattern configuration as config file parameters, modify the following fields of the `config.js` file:

* **``site``**: can represent a RZ, City or area that includes several different IoT deployments, services or apps (e.g., Porto, Milano, Santander, Aarhus, Andorra …).
* **``service``**: represents a smart city service/application domain for example parking, garbage, environmental etc.
* **``group``**: This could be optional. The group part can be used for grouping assets under the same service and/or provider (so it can be used to identify different IoT providers). It is responsibility of OS sites to maintain proper group keys.

The Entity Name (last part of ID pattern), is generated either automatically or by specifying it in the dedicated field **`entitySourceId`** of the JSON Map, as described in the Mapping Guide section.

#### 3.3.2 Id pattern configuration as CLI arguments

In order to use inputs configuration as CLI arguments, append following arguments to the `node mapper` command:

* **``--si, --site``**
* **``--se, --service``**
* **``--gr, --group``**

> **`Note`** Previous CLI arguments, if provided, will **override** the default ones specified in `config.js` file.

#### 3.3.3 Id pattern configuration in the HTTP request

Soon available

<a name="conf-rows" />

### 3.4 Configuration - Rows Range

Following configuration are relative to the rows range (start, end) of the input file that will be mapped. It is useful when you want to map only a part of the input file; in case of huge files, it is **recommended** (in order to easily inspect mapping and writing reports), to use a **"paginated mapping"**, where consecutive and relatively small (2000/5000) rows ranges of the input file are used.

> **`Note`** Rows range can be specified either in the **`config.js`** file, as CLI arguments or in the HTTP request (depending on running mode).

#### 3.4.1 Rows Range configuration in config file

In order to set Rows Range configuration as config file parameters, modify the following fields of the `config.js` file:

* **``rowStart``**: Row of the input file from which the mapper will start to map objects (Allowed values are integers >= 0).
* **``rowEnd``** : Last Row of the input file that will be mapped (Allowed values are integers > 0 or `Infinity` value, indicating "until the end of file").

#### 3.4.2 Rows Range configuration as CLI arguments

In order to use Row Range configuration as CLI arguments, append following arguments to the `node mapper` command:

* **``--rs, --rowStart``**
* **``--re, --rowEnd``**

> **`Note`**. Previous Command Line arguments, if provided, will **override** the default ones specified in `config.js` file.

#### 3.4.3 Rows Range configuration in the HTTP request

Soon available

<a name="conf-writers" />

### 3.5 Configuration - Writers

The Writers handlers are responsible of writing the resulting mapped NGSI entities to different outputs.
The current available writers are:
  + **`orionWriter`**: To write NGSI entities **directly** to a specified **Orion Context Broker**.
  + **`fileWriter`**: To write NGSI entities **locally** to a specified file.

#### 3.5.1 Configuration - Orion Writer

The Orion Writer will try to create a new entity, by sending a **POST** to ` ` /v2/entities `  ` endpoint of the provided Context Broker URL. In case of already existing entity, unless the ` skipExisting ` parameter is set to ` true ` , it tries to update the entity, by sending a POST to `  ` /v2/entities/{existingId}/attrs ` ` endpoint.
It is able also to send requests **behind an HTTP proxy** (see below).

> **`Note`** Orion Writer **URL** can be specified either in the **`config.js`** file, as CLI arguments or in the HTTP request (depending on running mode).

##### Orion configuration in configuration file

Modify the following properties in ` ` config.orionWriter `  ` object contained in the `  ` config.js ` ` file:

* **`orionUrl`**: The Base URL (without /v2...), of the Orion Context Broker where to write.
* **`enableProxy`**: (`true|false`) Enables the write to send requests through a proxy.
* **`proxy`**: Proxy URL in the form `http://user:pwd@proxyHost:proxyPort` .
* **`skipExisting`**: (`true|false`) Skip mapped entities (same ID) already existing in the CB, otherwise try to update them

To send entities to a secured Context Broker, modify following properties:

* **`orionAuthHeaderName`** : The name of Authentication Header (e.g. **"Authorization"**).
* **`orionAuthToken`**: : The value of Authentication Header (e.g **Bearer XXXX** ).

##### Orion configuration as CLI arguments

In order to use Orion Writer configuration as CLI arguments, when launching the tool with ` ` node mapper ` ` command, append following argument:

* **`-u, --orionUrl`**: The Base Url (without /v2…), of Orion Context Broker.

> **`Note`** Previous Command Line arguments, if provided, will **override** the default ones specified in `config.js` file.

#### Orion configuration in the HTTP request

Soon available

#### 3.5.2 Configuration - File Writer

The File Writer will write each mapped NGSI Object inside a JSON Array, stored locally in a file. It is useful when the tool is used in Command Line mode. 
In the Server Mode the output JSON will be sent in the body of the HTTP response.

##### File Writer configuration in configuration file

Modify the following properties in ` ` config.fileWriter `  ` object contained in the `  ` config.js ` ` file:
* **`filePath`**: The full path, icnluding the extension of where to store locally the resulting file.
* **`addBlankLine`**: (`true|false`) Put a carriage return between resulting objects in the file.

##### File Writer configuration as CLI arguments

In order to use File Writer configuration as CLI arguments, when launching the tool with ` ` node mapper ` ` command, append following argument:

* **`-f, --outFilePath`**: The full path, icnluding the extension of where to store locally the resulting file.

> **`Note`** Previous Command Line arguments, if provided, will **override** the default ones specified in `config.js` file.

#### File Writer configuration in the HTTP request

Soon available

--------------------
<a name="mapping"></a>

# 4. Mapping Guide

This section describes, with examples, how to compile the JSON Map file, whose path must be specified as input configuration, as described in [Inputs Configuration](#conf-input) section.

## 4.1 Source Input File

> **`IMPORTANT`** The source file must be **`CSV`**, **`Json`** or **`GeoJson`** and **MUST BE** in **`UTF8`** encoding. If the source file has another encoding (e.g. ANSI), please first convert it to UTF8 encoding (e.g. by using conversion with NotePad++).

Depending on input source type, the tool behaves accordingly:
* **CSV**
    The tool extracts the columns from the first row, and for each next row creates an intermediate data object (JSON), where each key-value field will have the CSV column as key and the specific CSV row value as value. In this way, every intermediate object coming from a CSV row will be mapped in a NGSI entity.

    **`IMPORTANT`** If the value is an array it should be wrapped with []. There is also the possibility to put objects inside array.

* **JSON**
        The input file (unless it contains just one object) must be already in the "intermediate" form, that is a **JSON Array**, where each object contains key-value fields to be mapped directly to a NGSI entity.

* **GeoJSON**
    The file must be a **Feature Collection**. So, the file must be in the form:

     

```
      {
       "type": "FeatureCollection",
       "features": [
          {
             "type": "Feature",
             "geometry": {...},
             "properties": {...}
          },
          ........
       ]}

```

## 4.2 Mapping

The tool needs the Mapping JSON, in order to know how to map each source field of the parsed row/object in the destination fields. The map **MUST** be a **well formed JSON** and have `.json` extension.

### What is the Map?

The Map consists of a JSON, that is a collection of ** `KEY` - `VALUE` pairs**, where, for each pair:

* the **`KEY`** is the **DESTINATION** field, belonging to a target Data Model (e.g. *address* or *totalSlotNumber* for *BikeHireDockingStation*).

* the **`VALUE`** is the **selector** that represents the **SOURCE** field/column, belonging to the source object/row.

* If the **`KEY`** has the reserved name **`entitySourceId`**, its **`VALUE`** will represent the source field from which the **EntityName** part of ID will be taken, according to SynchroniCity Entity ID Recommendation (See [Id Pattern Configuration](##conf-id) section).
  

> **`EXAMPLE`** - ** `KEY` - `VALUE` pair** 

  

```
  { ...
  
  "totalSlotNumber" : "sourceFieldName"
//   KEY            |    VALUE 
// DESTINATION      |    SOURCE          

  ... }

```

> **`NOTE`** the **SOURCE** value (whose field is represented in the example by the `VALUE` **"sourceFieldName"**) will be mapped to the **DESTINATION** field (represented by the `KEY` **"totalSlotNumber"**)

#### Which value types from the source fields are supported?

The **`VALUE`** of a mapping  ** `KEY` - `VALUE` pair** is the **SOURCE** field name. The values, grabbed from these source fields/columns represented by the **`VALUE`** selectors, can have one of the following types:
* **Single value**: String, Number, Array or Boolean
* **Multiple value**: A String, Number or Boolean array
* **Nested value**: A String, Number or Boolean in a field nested inside an object (if source input is CSV, nested values are supported only in objects inside an array)

Depending on the types of source and destination fields, the **`VALUE`** selector of the mapping pair can be one of the followings:

1) **String**:  
   - The **SOURCE** field has a simple (String, Number or Boolean) value, example:

     

```
     //NOTE. This is the SOURCE file, not the mapping pair.
     "sourceFieldName": "15"

```

- The relative **KEY-VALUE PAIR**  will be:
         

```
         "totalSlotNumber" : "sourceFieldName"
```

- The **result** of the mapping will be:
         

```
         "totalSlotNumber" : 15

```

----------------------

     

   - The **SOURCE** field is a "**nested field**", and MUST be specified in the **`VALUE`** selector with dot notation (specifically used in case of **JSON/GeoJson** inputs, as the following), example:

      

```
      //Note that this is the SOURCE file, not the mapping pair.
      "sourceAddress":{
               "sourceStreetName" : "Example Avenue"
      }
```

- The relative **`KEY`-`VALUE` pair**  will be:
        

```
        "destinationStreetName" : "sourceAddress.sourceStreetName"
```

       

- The **result** of the mapping will be:
        

```
        "destinationStreetName" : "Example Avenue"
```

----------------------

- If you want as value of the **DESTINATION** field a specific **"static"** value instead of the one coming from a **SOURCE** field, the **`VALUE`** selector must be specified as **`static:`** (e.g. **`static: something`**), the following substring (**`something`**), will represent the **ACTUAL VALUE** of the resulting field. This is a way for specifying custom values that are not present as field values in the **SOURCE** object/row.

2) **String Array**: If the **`VALUE`** selector is a string array, each string represents a **SOURCE** field (or the actual value if in the **`static:`** form). Their values will be concatenated (with spaces as separator) and mapped to the corresponding **DESTINATION** field (represented  by the **`KEY`** in the mapping pair).
3) **Object**:  One or more source fields will be mapped to a structured/nested **DESTINATION** field. In this case, we have a ** `KEY` - `OBJECT` pair**, where each **`SUBKEY`** has its own **`VALUE`**, example:
   

```
   "destinationAddress" : {
       "destinationStreetName" : "sourceStreetName"
    }
```

or if also the **SOURCE** field is a "**nested field**" (as previous case, MUST use dot notation):

      

```
   "destinationAddress" : {
       "destinationStreetName" : "sourceAddress.sourceStreetName"
    }
```

- The **result** of the mapping will be:

      

```
      "destinationAddress" : {
           "destinationStreetName" : "Example Avenue"
      }
```   
> **`Note`** Following examples omit mandatory fields for mapped NGSI entities, such as **"id"** and **"type"**. These are automatically included by the tool.

------------------------------------

### 4.2.1 Mapping Examples

#### CSV Example

We have as input a **CSV** file, representing Bike Sharing stations. We want to map each CSV row to an entity of the target Data Model **BikeHireDockingStation**.

The first row contains the columns definitions:

```

Location; Area; SubArea; Name; AvailableSlots; TotalSlots; 
 

```

The second line, the first one representing a mappable source object is:

```

Alemagna Avenue; Museum; Triennale di Milano; 10; 40; 

```

The resulting **Map**, according to the target Data Model, will be:

```

{
   "address": {

      "streetAddress": "Location"

   }, 
   "areaServed": "Area", 
   "totalSlotNumber": "TotalSlots"
}

```

Note that the "address" destination field, is a structured object, containing the **DESTINATION** field *streetAddress*, which is mapped to the **SOURCE** field *Location*. So the corresponding value *"Alemagna Avenue"* will be mapped as the value of the *streetAddress*.
The resulting object will be:

```

{
   "address": {

      "streetAddress": "Alemagna Avenue"

   }, 
   "areaServed": "Museum", 
   "totalSlotNumber": 40
}

```

**Alternatively**, we would instead concatenate both *Area* and *SubArea* **SOURCE** fields to the **DESTINATION** *areaServed* field. In that case the **Map** will be:

```

{
   "address": {

      "streetAddress": "Location"

   }, 
   "areaServed": [

      "Area",
      "SubArea"

   ], 
   "totalSlotNumber": "TotalSlots"
}
 

```

The resulting object will be:

```

{
   "address": {

      "streetAddress": "Alemagna Avenue"

   }, 
   "areaServed": "Museum - Triennale di Milano", 
   "totalSlotNumber": 40
}
 

```
 
Finally, if we want to specify DIRECTLY a **static** custom value for a resulting mapped field, the **`VALUE`** selector of the **`KEY`- `VALUE`** mapping pair will have the **`static:` prefix**.
The **Map** will be:

```

{
   "address": {

      "streetAddress": "Location"

   }, 
   "areaServed": [

      "Area",
      "SubArea"

   ], 
   "totalSlotNumber": "TotalSlots", 
   "name": [

      "static:Racks - ",
      "Location"

   ]
}

```

In this case we are concatenating, for target "**name**" field, two values:
1) **"Rastrelliere "** literally
2) The value contained in the source field **"Location"**

The resulting object will be:
```

{
   "address": {

      "streetAddress": "Alemagna Avenue"

   }, 
   "areaServed": "Museum - Triennale di Milano", 
   "totalSlotNumber": 40, 
   "name": "Racks - Alemagna Avenue"
}

```
---------------------

If a field is an array and we have this first line in the CSV :

```

Array 1; ...

```

the second line should be 

```

[value at index 0, value at index 1, value at index 2, ...]; ...

```

If the values are objects, it can be conflicts with the " used to wrap values of each field of the CSV file if we use " to 
wrap the fields and the values of the objects inside the arrays. You can just omit it.

For example :

```

Field Name 1; Field Name 2; ...
[{Field 1 : Value 1, Field 2 : Value 2}, {Field 1b : Value 1b, Field 2b : Value 2b}, ...]; Value 2; ...

```

If you want to insert the [ symbol at the beginning of a string, you must add a space line " " before, otherwise the value will be converted to an array even if it is a string in the data model. For this purpose, you can set the deleteEmptySpaceAtBeginning = true field in config.js if you do not want to see the empty space at beginning.

For example, the output of : 

```

Field Name
 [Value]
 

```

Will be 

```

[
   {

      "Field Name" : "[Value]"

   }
]

```

The output of 

```

 Field Name
 [Value]
 

```

Will be

```

[
 {
   "Field Name" : [

      Value

   ]
 }
]

```

#### GeoJson Example

We have as input a **GeoJson** file, containing a Feature Collection and representing Bike Sharing stations. We want to map each Feature as an entity of the target Data Model **BikeHireDockingStation**.

For instance, for the feature:

```

{
   "type": "Feature", 
   "geometry": {

      "type": "Point",
      "coordinates": [
         9.189043,
         45.464725
      ]

   }, 
   "properties": {

      "ID": 1,
      "BIKE_SH": "001 Duomo 1",
      "INDIRIZZO": "P.za Duomo",
      "ANNO": 2008,
      "STALLI": 24,
      "LOCALIZ": "Carreggiata"

   }
}

```

The resulting **JSON Map**, according to the Target Data Model, will be:

```

{
   "name": "properties. BIKE_SH", 
   "location": "geometry", 
   "totalSlotNumber": "properties. STALLI", 
   "entitySourceId": "properties. BIKE_SH", 
   "address": {

      "streetAddress": "properties.INDIRIZZO"

   }
}

```

In this case, **nested source fields** can be accessed through the dot notation.
> **`NOTE`** the **DESTINATION** *`location`* field is treated in a special way: the whole **SOURCE** field value will be taken and put in the resulting *location* field.

The final resulting object will be:

```

{
   "id": "urn:ngsi-ld: BikeHireDockingStation:site:service:group:entityName", 
   "name": "001 Duomo 1", 
   "location": {

      "type": "Point",
      "coordinates": [
         9.189043,
         45.464725
      ]

   }, 
   "address": {

      "streetAddress": "P.za Duomo"

   }, 
   "totalSlotNumber": 24
}
```

The ID is be composed by:

* **`urn:ngsi-ld`**, statically added.
* **`entity-type`**, target Data Model, as specified in [**Input**](#conf-input) Configuration step .
* **`site`**, **`service`**, **`group`**, whose values was defined in [**ID Pattern**](#conf-id) Configuration step.
* **`entityName`**: as specified either in the **`entitySourceId`** field of JSON Map or automatically generated.

> **`NOTE`** If config.NGSI_entity is set to false, the output ID will just be the value spcified in the map file of the key corresponding on the config.entitySourceId field with the row index concatenated (e.g. if the entitySourceId is "ID" and "ID" in the map file is set to "static:ID : ", the output ID field would be "ID :1" for the first row, "ID :2" for the second row...)

---------------

<a name="logging"/>

## 5. Logging

The tool will collect several types of logging messages.

* **Application Log**: in ```/logs``` folder, .out and .error daily files. Logs messages, according to the Log Level set in the [Application Configuration](#application-configuration) part.
* **Validation Report**: in ```/reports/validation``` folder, file with messages about mapped objects that passed or not the validation against target Data Model Schema.
* **Orion Report**: in ```/reports/orion/``` folder, file with messages about validated mapped objects that was written/not written in the Orion Context Broker, whose url was defined in the [Orion Writer Configuration](#orion-writer-configuration) part.

----------------

<a name="license"/>

## 6. License

Data Model Mapper © 2019 Engineering Ingegneria Informatica S.p. A.

The Data Model Mapper tool is licensed under Affero General Public License (GPL) version 3.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see http://www.gnu.org/licenses/.

Copyright (C) 2019 Engineering Ingegneria Informatica S.p. A.
