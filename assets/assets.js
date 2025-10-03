module.exports = {
    sample: {
        "Field 1": "[Field 1 value 1,Field 1 value 2]",
        "Field 2": [
            "Field 2 value 1",
            "Field 2 value 2"
        ],
        "Field 3": [
            "Field 3 value 1",
            "Field 3 value 2"
        ],
        "Field 31": [
            {
                "Field 31a": "Field 31a",
                "Field 31b": "Field 31b"
            }
        ],
        "Field 32": 33,
        "Field 33": 33,
        "Field 4": {
            "Field 4a": "[Field 4a value 1,Field 4a value 2]",
            "Field 4b": [
                "Field 4b value 1",
                "Field 4b value 2"
            ],
            "Field 4c": [
                "Field 4c value 1",
                "Field 4c value 1"
            ],
            "Field 4d": [
                {
                    "Field 4da": "Field 4da",
                    "Field 4db": "Field 4db"
                },
                {
                    "Field 4da1": "Field 4da1",
                    "Field 4db1": "Field 4db1"
                }
            ]
        },
        "Field 5": 5,
        "Field 6": 6,
        "Field 7": "7",
        "type": "Example",
        "id": "urn:ngsi-ld:Example:SomeRZ:SomeService:CSV:ExampleDataModel-1"
    },
    sample_non_ngsi: {
        "Field 1": "Value 1",
        "Field 2": 2,
        "Field 3": [
            1,
            2,
            3
        ],
        "Field 4": {
            "Field 1": "Value 1",
            "Field 2": 2,
            "Field 3": [
                1,
                2,
                3
            ]
        }
    },
    sample_schema_non_ngsi: {
        "$schema": "http://json-schema.org/schema#",
        "type": "object",
        "properties": {
            "Field 1": {
                "type": "string"
            },
            "Field 2": {
                "type": "integer"
            },
            "Field 3": {
                "type": "array",
                "items": {
                    "type": "integer"
                }
            },
            "Field 4": {
                "type": "object",
                "properties": {
                    "Field 1": {
                        "type": "string"
                    },
                    "Field 2": {
                        "type": "integer"
                    },
                    "Field 3": {
                        "type": "array",
                        "items": {
                            "type": "integer"
                        }
                    }
                },
                "required": [
                    "Field 1",
                    "Field 2",
                    "Field 3"
                ]
            }
        },
        "required": [
            "Field 1",
            "Field 2",
            "Field 3",
            "Field 4"
        ]
    },
    map_non_ngsi: {
        "Field 1": "Field 1",
        "Field 2": "Field 2",
        "Field 3": "Field 3",
        "Field 4": {
            "Field 1": "Field 4 1",
            "Field 2": "Field 4 2",
            "Field 3": "Field 4 3"
        }
    },
    source_non_ngsi: "Field 1;Field 2;Field 3;Field 4 1;Field 4 2;Field 4 3\r\nValue 1;2;[1,2,3];Value 1;2;[1,2,3]",
    example_1: {
        "name": "001 Duomo 1",
        "location": {
            "type": "Point",
            "coordinates": [
                9.1890425716699,
                45.464725436014575
            ]
        },
        "totalSlotNumber": 24,
        "address": {
            "streetAddress": "P.za Duomo"
        },
        "type": "DataModel",
        "id": "urn:ngsi-ld:DataModel:SomeRZ:SomeService:CSV:001Duomo1"
    }
}