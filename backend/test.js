let config = require("./config")
const assets = require("./assets/assets")
const example_1 = require("./assets/example_1")
const chai = require("chai")
const axios = require("axios")

describe("test", function () {

  let n = 1;

  before(() => console.log("Testing started"));
  after(() => console.log("Testing finished"));

  beforeEach(() => console.log("Test ", n++));
  afterEach(() => console.log("Test ", n - 1, " finished"));

  it(
    'Example test', async () => {
      let configTmp = config.sourceDataPath
      config.sourceDataPath = "assets/"
      let res = await axios.post(
        'http://localhost:' + config.httpPort + '/api/map/transform',
        {
          sourceDataType: "csv",
          sourceData: "Field 1;Field 2;Field 3 index 0;Field 3 index 1;Field 31;Field 32;Field 33;Field 4a;Field 4b;Field 4c index 0;Field 4c index 1;Field 4d;Field 5;Field 6;Field 7\r\n[Field 1 value 1,Field 1 value 2];[Field 2 value 1,Field 2 value 2];Field 3 value 1;Field 3 value 2;[{Field 31a : Field 31a, Field 31b : Field 31b }];32;33; [Field 4a value 1,Field 4a value 2];[Field 4b value 1,Field 4b value 2];Field 4c value 1;Field 4c value 1;[{Field 4da : Field 4da, Field 4db : Field 4db }, {Field 4da1 : Field 4da1, Field 4db1 : Field 4db1 }];5;6;7",
          mapData: {
            "Field 1": "Field 1",
            "Field 2": "Field 2",
            "Field 3": [
              "Field 3 index 0",
              "Field 3 index 1"
            ],
            "Field 31": "Field 31",
            "Field 32": "Field 33",
            "Field 33": "Field 33",
            "Field 4": {
              "Field 4a": "Field 4a",
              "Field 4b": "Field 4b",
              "Field 4c": [
                "Field 4c index 0",
                "Field 4c index 1"
              ],
              "Field 4d": "Field 4d"
            },
            "Field 5": "Field 5",
            "Field 6": "Field 6",
            "Field 7": "Field 7",
            "entitySourceId": [
              "static:ExampleDataModel"
            ],
            "targetDataModel": "ExampleDataModel"
          },
          dataModel: "ExampleDataModel",
          config:{delimiter: ";",
          NGSI_entity: true}
        }
      )
      try {
        chai.assert.equal(
          JSON.stringify(res.data[0]),
          JSON.stringify(assets.sample)
        )
      }
      catch (error) {
        console.error("ERROR\nactual\n", JSON.parse(error.actual), "\nexpected\n", JSON.parse(error.expected))
        console.log(JSON.parse(error.actual)["Field 4"]["Field 4d"])
        console.log(JSON.parse(error.expected)["Field 4"]["Field 4d"])
        throw error
      }
      config.sourceDataPath = configTmp
    }
  );
  it(
    'Non Fiware NGSI data model test', async () => {
      //config.NGSI_entity=false;
      let res = await axios.post(
        'http://localhost:' + config.httpPort + '/api/map/transform',
        {
          sourceDataType: "csv",
          sourceData: assets.source_non_ngsi,
          mapData: assets.map_non_ngsi,
          dataModel: assets.sample_schema_non_ngsi,
          config:{delimiter: ";",
          NGSI_entity: false}
        }
      )
      try {
        chai.assert.equal(
          JSON.stringify(res.data[0]),
          JSON.stringify(assets.sample_non_ngsi)
        )
      }
      catch (error) {
        console.error("ERROR\nactual\n", JSON.parse(error.actual), "\nexpected\n", JSON.parse(error.expected))
        throw error
      }
    }
  );
  it(
    'Example test - geojson', async () => {
      //config.NGSI_entity=true;
      let res = await axios.post(
        'http://localhost:' + config.httpPort + '/api/map/transform',
        example_1.test
      )
      try {
        chai.assert.equal(
          JSON.stringify(res.data[0]),
          JSON.stringify(assets.example_1)
        )
      }
      catch (error) {
        console.error("ERROR\nactual\n", JSON.parse(error.actual), "\nexpected\n", JSON.parse(error.expected))
        throw error
      }
    }
  );
});
