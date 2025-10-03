module.exports = {
  schemas: [
    {
      "isAlsoReferencedBy": [],
      "_id": "65ec374ff62822a2e6d9b6c0",
      "mapRef": "65ec374ff62822a2e6d9b6be",
      "dataModel": {
        "dollarschema": "http://json-schema.org/schema",
        "dollarschemaVersion": "1.0.1",
        "modelTags": "",
        "title": "Smart Data models DCAT-AP distribution of a Dataset, according to DCAT-AP 2.1.1",
        "description": "This is a distribution belonging ot a dataset according to the DCAT-AP standard 2.1.1",
        "type": "object",
        "required": [
          "accessURL",
          "id",
          "type"
        ],
        "allOf": [
          {
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "DistributionDCAT-AP"
                ],
                "description": "Property. NGSI entity type. It has to be DistributionDCAT-AP"
              },
              "id": {
                "dollarref": "https://smart-data-models.github.io/data-models/common-schema.json#/definitions/GSMA-Commons/properties/id"
              },
              "accessURL": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Resource'. This property contains a URL that gives access to a Distribution of the Dataset. The resource at the access URL may contain information about how to get the Dataset",
                "items": {
                  "type": "string",
                  "minItems": 1
                }
              },
              "availability": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2004/02/skos/core#Concept'. This property indicates how long it is planned to keep the Distributio of the Dataset available"
              },
              "description": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a free-text account of the Distribution. This property can be repeated for parallel language versions of the description"
              },
              "format": {
                "type": "string",
                "description": "Property. Model:'https://schema.org/Text'. This property refers to the file format of the Distribution"
              },
              "license": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/LicenseDocument'. This property refers to a data service that gives access to the distribution of the dataset"
              },
              "accessService": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#DataService'. This property refers to a data service that gives access to the distribution of the dataset",
                "items": {
                  "type": "string",
                  "description": "Property. Every Data service providing access to the distribution"
                }
              },
              "byteSize": {
                "type": "number",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the size of a Distribution in bytes"
              },
              "checksum": {
                "type": "string",
                "description": "Property. Model:'http://spdx.org/rdf/terms#Checksum'. This property provides a mechanism that can be used to verify that the contents of a distribution have not changed. The checksum is related to the downloadURL"
              },
              "compressFormat": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/MediaType'. This property refers to the format of the file in which the data is contained in a compressed form, e.g. to reduce the size of the downloadable file. It SHOULD be expressed using a media type as defined in the official register of media types managed by IANA"
              },
              "page": {
                "type": "array",
                "description": "Property. Model:'http://xmlns.com/foaf/0.1/#term_Document'. This property refers to a page or document about this Distribution",
                "items": {
                  "type": "string",
                  "description": "Property. Every page providing information about the distribution"
                }
              },
              "downloadURL": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Resource'. This property contains a URL that is a direct link to a downloadable file in a given format"
              },
              "hasPolicy": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/ns/odrl/2/hasPolicy'. This property refers to the policy expressing the rights associated with the distribution if using the ODRL vocabulary"
              },
              "language": {
                "type": "array",
                "description": "Property. Model:'http://purl.org/dc/terms/LinguisticSystem'. This property refers to a language used in the Distribution. This property can be repeated if the metadata is provided in multiple languages",
                "items": {
                  "type": "string",
                  "description": "Property. Every language included"
                }
              },
              "conformsTo": {
                "type": "array",
                "description": "Property. Model:'http://purl.org/dc/terms/Standard'. This property refers to an established schema to which the described Distribution conforms",
                "items": {
                  "type": "string",
                  "description": "Property. Every rule o standard the distribution complies with"
                }
              },
              "mediaType": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/MediaType'. This property refers to the media type of the Distribution as defined in the official register of media types managed by IANA"
              },
              "packageFormat": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/MediaType'. This property refers to the format of the file in which one or more data files are grouped together, e.g. to enable a set of related files to be downloaded together. It SHOULD be expressed using a media type as defined in the official register of media types managed by IANA"
              },
              "issued": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the date of formal issuance (e.g., publication) of the Distribution"
              },
              "rights": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/RightsStatement'. This property refers to a statement that specifies rights associated with the Distribution"
              },
              "spatialResolutionInMeters": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property refers to the minimum spatial separation resolvable in a distribution, measured in meters"
              },
              "status": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2004/02/skos/core#Concept'. This property refers to the maturity of the Distribution. It MUST take one of the values Completed, Deprecated, Under Development, Withdrawn",
                "enum": [
                  "Completed",
                  "Deprecated",
                  "Under Development",
                  "Withdrawn"
                ]
              },
              "title": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a name given to the Distribution. This property can be repeated for parallel language versions of the description"
              },
              "modifiedDate": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the most recent date on which the Distribution was changed or modified"
              },
              "releaseDate": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the most initial date on which the Distribution was created"
              }
            }
          }
        ]
      },
      "name": "DistributionDCAT-AP_v1.0",
      "user": "test@hotmail.it"
    },
    {
      "isAlsoReferencedBy": [],
      "_id": "65ec3859f62822a2e6d9b6c6",
      "name": "DistributionDCAT-AP_v1.0",
      "mapRef": "65ec374ff62822a2e6d9b6be",
      "dataModel": {
        "dollarschema": "http://json-schema.org/schema",
        "dollarschemaVersion": "1.0.1",
        "modelTags": "",
        "title": "Smart Data models DCAT-AP distribution of a Dataset, according to DCAT-AP 2.1.1",
        "description": "This is a distribution belonging ot a dataset according to the DCAT-AP standard 2.1.1",
        "type": "object",
        "required": [
          "accessURL",
          "id",
          "type"
        ],
        "allOf": [
          {
            "dollarref": "https://smart-data-models.github.io/data-models/common-schema.json#/definitions/Location-Commons"
          },
          {
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "DistributionDCAT-AP"
                ],
                "description": "Property. NGSI entity type. It has to be DistributionDCAT-AP"
              },
              "accessURL": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Resource'. This property contains a URL that gives access to a Distribution of the Dataset. The resource at the access URL may contain information about how to get the Dataset",
                "items": {
                  "type": "string",
                  "minItems": 1
                }
              },
              "availability": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2004/02/skos/core#Concept'. This property indicates how long it is planned to keep the Distributio of the Dataset available"
              },
              "description": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a free-text account of the Distribution. This property can be repeated for parallel language versions of the description"
              },
              "format": {
                "type": "string",
                "description": "Property. Model:'https://schema.org/Text'. This property refers to the file format of the Distribution"
              },
              "license": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/LicenseDocument'. This property refers to a data service that gives access to the distribution of the dataset"
              },
              "accessService": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#DataService'. This property refers to a data service that gives access to the distribution of the dataset",
                "items": {
                  "type": "string",
                  "description": "Property. Every Data service providing access to the distribution"
                }
              },
              "byteSize": {
                "type": "number",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the size of a Distribution in bytes"
              },
              "checksum": {
                "type": "string",
                "description": "Property. Model:'http://spdx.org/rdf/terms#Checksum'. This property provides a mechanism that can be used to verify that the contents of a distribution have not changed. The checksum is related to the downloadURL"
              },
              "compressFormat": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/MediaType'. This property refers to the format of the file in which the data is contained in a compressed form, e.g. to reduce the size of the downloadable file. It SHOULD be expressed using a media type as defined in the official register of media types managed by IANA"
              },
              "page": {
                "type": "array",
                "description": "Property. Model:'http://xmlns.com/foaf/0.1/#term_Document'. This property refers to a page or document about this Distribution",
                "items": {
                  "type": "string",
                  "description": "Property. Every page providing information about the distribution"
                }
              },
              "downloadURL": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Resource'. This property contains a URL that is a direct link to a downloadable file in a given format"
              },
              "hasPolicy": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/ns/odrl/2/hasPolicy'. This property refers to the policy expressing the rights associated with the distribution if using the ODRL vocabulary"
              },
              "language": {
                "type": "array",
                "description": "Property. Model:'http://purl.org/dc/terms/LinguisticSystem'. This property refers to a language used in the Distribution. This property can be repeated if the metadata is provided in multiple languages",
                "items": {
                  "type": "string",
                  "description": "Property. Every language included"
                }
              },
              "conformsTo": {
                "type": "array",
                "description": "Property. Model:'http://purl.org/dc/terms/Standard'. This property refers to an established schema to which the described Distribution conforms",
                "items": {
                  "type": "string",
                  "description": "Property. Every rule o standard the distribution complies with"
                }
              },
              "mediaType": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/MediaType'. This property refers to the media type of the Distribution as defined in the official register of media types managed by IANA"
              },
              "packageFormat": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/MediaType'. This property refers to the format of the file in which one or more data files are grouped together, e.g. to enable a set of related files to be downloaded together. It SHOULD be expressed using a media type as defined in the official register of media types managed by IANA"
              },
              "issued": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the date of formal issuance (e.g., publication) of the Distribution"
              },
              "rights": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/RightsStatement'. This property refers to a statement that specifies rights associated with the Distribution"
              },
              "spatialResolutionInMeters": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property refers to the minimum spatial separation resolvable in a distribution, measured in meters"
              },
              "status": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2004/02/skos/core#Concept'. This property refers to the maturity of the Distribution. It MUST take one of the values Completed, Deprecated, Under Development, Withdrawn",
                "enum": [
                  "Completed",
                  "Deprecated",
                  "Under Development",
                  "Withdrawn"
                ]
              },
              "title": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a name given to the Distribution. This property can be repeated for parallel language versions of the description"
              },
              "modifiedDate": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the most recent date on which the Distribution was changed or modified"
              },
              "releaseDate": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the most initial date on which the Distribution was created"
              },
              "id": {
                "dollarref": "https://smart-data-models.github.io/data-models/common-schema.json#/definitions/GSMA-Commons/properties/id"
              }
            }
          }
        ]
      },
      "user": "test@hotmail.it"
    },
    {
      "isAlsoReferencedBy": [],
      "_id": "65ec39cff62822a2e6d9b6cc",
      "name": "DistributionDCAT-AP_v1.0",
      "mapRef": "65ec374ff62822a2e6d9b6be",
      "dataModel": {
        "dollarschema": "http://json-schema.org/schema",
        "dollarschemaVersion": "1.0.1",
        "modelTags": "",
        "title": "Smart Data models DCAT-AP distribution of a Dataset, according to DCAT-AP 2.1.1",
        "description": "This is a distribution belonging ot a dataset according to the DCAT-AP standard 2.1.1",
        "type": "object",
        "required": [
          "accessURL",
          "id",
          "type"
        ],
        "allOf": [
          {
            "dollarref": "https://smart-data-models.github.io/data-models/common-schema.json#/definitions/Location-Commons"
          },
          {
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "DistributionDCAT-AP"
                ],
                "description": "Property. NGSI entity type. It has to be DistributionDCAT-AP"
              },
              "accessURL": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Resource'. This property contains a URL that gives access to a Distribution of the Dataset. The resource at the access URL may contain information about how to get the Dataset",
                "items": {
                  "type": "string",
                  "minItems": 1
                }
              },
              "availability": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2004/02/skos/core#Concept'. This property indicates how long it is planned to keep the Distributio of the Dataset available"
              },
              "description": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a free-text account of the Distribution. This property can be repeated for parallel language versions of the description"
              },
              "format": {
                "type": "string",
                "description": "Property. Model:'https://schema.org/Text'. This property refers to the file format of the Distribution"
              },
              "license": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/LicenseDocument'. This property refers to a data service that gives access to the distribution of the dataset"
              },
              "accessService": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#DataService'. This property refers to a data service that gives access to the distribution of the dataset",
                "items": {
                  "type": "string",
                  "description": "Property. Every Data service providing access to the distribution"
                }
              },
              "byteSize": {
                "type": "number",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the size of a Distribution in bytes"
              },
              "checksum": {
                "type": "string",
                "description": "Property. Model:'http://spdx.org/rdf/terms#Checksum'. This property provides a mechanism that can be used to verify that the contents of a distribution have not changed. The checksum is related to the downloadURL"
              },
              "compressFormat": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/MediaType'. This property refers to the format of the file in which the data is contained in a compressed form, e.g. to reduce the size of the downloadable file. It SHOULD be expressed using a media type as defined in the official register of media types managed by IANA"
              },
              "page": {
                "type": "array",
                "description": "Property. Model:'http://xmlns.com/foaf/0.1/#term_Document'. This property refers to a page or document about this Distribution",
                "items": {
                  "type": "string",
                  "description": "Property. Every page providing information about the distribution"
                }
              },
              "downloadURL": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Resource'. This property contains a URL that is a direct link to a downloadable file in a given format"
              },
              "hasPolicy": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/ns/odrl/2/hasPolicy'. This property refers to the policy expressing the rights associated with the distribution if using the ODRL vocabulary"
              },
              "language": {
                "type": "array",
                "description": "Property. Model:'http://purl.org/dc/terms/LinguisticSystem'. This property refers to a language used in the Distribution. This property can be repeated if the metadata is provided in multiple languages",
                "items": {
                  "type": "string",
                  "description": "Property. Every language included"
                }
              },
              "conformsTo": {
                "type": "array",
                "description": "Property. Model:'http://purl.org/dc/terms/Standard'. This property refers to an established schema to which the described Distribution conforms",
                "items": {
                  "type": "string",
                  "description": "Property. Every rule o standard the distribution complies with"
                }
              },
              "mediaType": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/MediaType'. This property refers to the media type of the Distribution as defined in the official register of media types managed by IANA"
              },
              "packageFormat": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/MediaType'. This property refers to the format of the file in which one or more data files are grouped together, e.g. to enable a set of related files to be downloaded together. It SHOULD be expressed using a media type as defined in the official register of media types managed by IANA"
              },
              "issued": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the date of formal issuance (e.g., publication) of the Distribution"
              },
              "rights": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/RightsStatement'. This property refers to a statement that specifies rights associated with the Distribution"
              },
              "spatialResolutionInMeters": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property refers to the minimum spatial separation resolvable in a distribution, measured in meters"
              },
              "status": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2004/02/skos/core#Concept'. This property refers to the maturity of the Distribution. It MUST take one of the values Completed, Deprecated, Under Development, Withdrawn",
                "enum": [
                  "Completed",
                  "Deprecated",
                  "Under Development",
                  "Withdrawn"
                ]
              },
              "title": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a name given to the Distribution. This property can be repeated for parallel language versions of the description"
              },
              "modifiedDate": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the most recent date on which the Distribution was changed or modified"
              },
              "releaseDate": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the most initial date on which the Distribution was created"
              },
              "id": {
                "dollarref": "https://smart-data-models.github.io/data-models/common-schema.json#/definitions/GSMA-Commons/properties/id"
              }
            }
          }
        ]
      },
      "user": "test@hotmail.it"
    },
    {
      "isAlsoReferencedBy": [],
      "_id": "6602a72d10b4cf992b6b278a",
      "name": "Test deploy ",
      "mapRef": "6602a72d10b4cf992b6b2786",
      "dataModel": {
        "dollarschema": "http://json-schema.org/schema#",
        "title": "DataModelTemp",
        "description": "Bike Hire Docking Station",
        "type": "object",
        "properties": {
          "e": {
            "type": "string"
          },
          "f": {
            "type": "string"
          }
        }
      },
      "user": "test@hotmail.it"
    },
    {
      "isAlsoReferencedBy": [],
      "_id": "66054e1866b06d9dfa191201",
      "name": "Bike lane",
      "mapRef": "66054e1866b06d9dfa1911fd",
      "dataModel": {
        "modelTags": "",
        "title": "Smart Data Models - Bike Lane Schema",
        "description": "A generic bike lane schema",
        "type": "object",
        "allOf": [
          {
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "BikeLane"
                ],
                "description": "Property. NGSI-LD Entity Type. It has to be BikeLanes"
              },
              "laneOccupancy": {
                "type": "string",
                "description": "Property. Model:'https://schema.org/Number'. Indicates the number of vehicles circulating on the lane"
              },
              "laneLength": {
                "type": "string",
                "description": "Property. Model:'https://schema.org/Number'. Indicates the length of the lane"
              },
              "laneWidth": {
                "type": "string",
                "description": "Property. Model:'https://schema.org/Number'. Indicates the width of the lane"
              },
              "dateObserved": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'https://schema.org/DateTime'. The date and time of this observation in ISO8601 UTCformat"
              },
              "id": {
                "anyOf": [
                  {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 256,
                    "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                    "description": "Property. Identifier format of any NGSI entity"
                  },
                  {
                    "type": "string",
                    "format": "uri",
                    "description": "Property. Identifier format of any NGSI entity"
                  }
                ],
                "description": "Property. Unique identifier of the entity"
              },
              "dateCreated": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Entity creation timestamp. This will usually be allocated by the storage platform"
              },
              "dateModified": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Timestamp of the last modification of the entity. This will usually be allocated by the storage platform"
              },
              "source": {
                "type": "string",
                "description": "Property. A sequence of characters giving the original source of the entity data as a URL. Recommended to be the fully qualified domain name of the source provider, or the URL to the source object"
              },
              "name": {
                "type": "string",
                "description": "Property. The name of this item"
              },
              "alternateName": {
                "type": "string",
                "description": "Property. An alternative name for this item"
              },
              "description": {
                "type": "string",
                "description": "Property. A description of this item"
              },
              "dataProvider": {
                "type": "string",
                "description": "Property. A sequence of characters identifying the provider of the harmonised data entity"
              },
              "owner": {
                "type": "array",
                "description": "Property. A List containing a JSON encoded sequence of characters referencing the unique Ids of the owner(s)",
                "items": {
                  "anyOf": [
                    {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 256,
                      "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                      "description": "Property. Identifier format of any NGSI entity"
                    },
                    {
                      "type": "string",
                      "format": "uri",
                      "description": "Property. Identifier format of any NGSI entity"
                    }
                  ],
                  "description": "Property. Unique identifier of the entity"
                }
              },
              "seeAlso": {
                "oneOf": [
                  {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                      "type": "string",
                      "format": "uri"
                    }
                  },
                  {
                    "type": "string",
                    "format": "uri"
                  }
                ],
                "description": "Property. list of uri pointing to additional resources about the item"
              },
              "location": {
                "oneOf": [
                  {
                    "title": "GeoJSON Point",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. Point",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "Point"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "minItems": 2,
                        "items": {
                          "type": "number"
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON LineString",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. LineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "LineString"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "minItems": 2,
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "number"
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON Polygon",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. Polygon",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "Polygon"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 4,
                          "items": {
                            "type": "array",
                            "minItems": 2,
                            "items": {
                              "type": "number"
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiPoint",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiPoint",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiPoint"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "number"
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiLineString",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiLineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiLineString"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "array",
                            "minItems": 2,
                            "items": {
                              "type": "number"
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiPolygon",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiLineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiPolygon"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "minItems": 4,
                            "items": {
                              "type": "array",
                              "minItems": 2,
                              "items": {
                                "type": "number"
                              }
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  }
                ],
                "description": "GeoProperty. Geojson reference to the item. It can be Point, LineString, Polygon, MultiPoint, MultiLineString or MultiPolygon"
              },
              "areaServed": {
                "type": "string",
                "description": "Property. The geographic area where a service or offered item is provided. Model:'https://schema.org/Text'"
              }
            }
          }
        ],
        "required": [
          "id",
          "type"
        ],
        "dollarschema": "http://json-schema.org/schema#",
        "dollarschemaVersion": "/app/dataModels//0.0.1"
      },
      "user": "test@hotmail.it"
    },
    {
      "_id": "660d79cc9f72b2a39bb99e9b",
      "name": "Test deploy 03-04-2024",
      "mapRef": "660d79cc9f72b2a39bb99e97",
      "isAlsoReferencedBy": [],
      "dataModel": {
        "dollarschema": "http://json-schema.org/schema#",
        "title": "DataModelTemp",
        "description": "Bike Hire Docking Station",
        "type": "object",
        "properties": {
          "e": {
            "type": "string"
          },
          "f": {
            "type": "string"
          }
        }
      },
      "user": "test@hotmail.it"
    },
    {
      "_id": "661d4dbabbd46848a7061033",
      "name": "Smart data model ",
      "mapRef": "661d427c5917f8749810adf9",
      "isAlsoReferencedBy": [],
      "user": "test@hotmail.it",
      "dataModel": {
        "modelTags": "IUDX",
        "title": "Smart Data Models - Transportation / EV Charging Station",
        "description": "EV Charging Station",
        "type": "object",
        "allOf": [
          {
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "EVChargingStation"
                ],
                "description": "Property. NGSI Entity type. It has to be EVChargingStation"
              },
              "capacity": {
                "type": "integer",
                "minimum": 1,
                "description": "Property. The total number of vehicles which can be charged at the same time. The total number of sockets can be higher. Model:'http://schema.org/Number'. "
              },
              "socketNumber": {
                "type": "integer",
                "minimum": 1,
                "description": "Property. The total number of sockets offered by this charging station. Model:'http://schema.org/Number'"
              },
              "availableCapacity": {
                "type": "integer",
                "minimum": 0,
                "description": "Property. The number of vehicles which currently can be charged. Model:'http://schema.org/Number'. It must lower or equal than `capacity`"
              },
              "allowedVehicleType": {
                "type": "array",
                "description": "Property. Vehicle type(s) which can be charged. Model:'http://schema.org/Text'. Enum:'bicycle, bus, car, caravan, motorcycle, motorscooter, truck' ",
                "minItems": 1,
                "uniqueItems": true,
                "items": {
                  "type": "string",
                  "enum": [
                    "bicycle",
                    "bus",
                    "car",
                    "caravan",
                    "motorcycle",
                    "motorscooter",
                    "truck"
                  ]
                }
              },
              "socketType": {
                "type": "array",
                "description": "Property. The type of sockets offered by this station. Model:'http://schema.org/Text'. Enum:'Caravan_Mains_Socket, CHAdeMO, CCS/SAE, Dual_CHAdeMO, Dual_J-1772, Dual_Mennekes, J-1772, Mennekes, Other, Tesla, Type2, Type3, Wall_Euro'",
                "minItems": 1,
                "uniqueItems": true,
                "items": {
                  "type": "string",
                  "enum": [
                    "Caravan_Mains_Socket",
                    "CHAdeMO",
                    "CCS/SAE",
                    "Dual_CHAdeMO",
                    "Dual_J-1772",
                    "Dual_Mennekes",
                    "J-1772",
                    "Mennekes",
                    "Other",
                    "Tesla",
                    "Type2",
                    "Type3",
                    "Wall_Euro"
                  ]
                }
              },
              "openingHours": {
                "type": "string",
                "description": "Property. Opening hours of the charging station. Model:'http://schema.org/openingHours'. "
              },
              "status": {
                "type": "string",
                "description": "Property. Model:'http://schema.org/Text'. Status of the charging station. Enum:'almostEmpty, almostFull, empty, full, outOfService, withIncidence, working'. Or any other application-specific",
                "enum": [
                  "almostEmpty",
                  "almostFull",
                  "empty",
                  "full",
                  "outOfService",
                  "withIncidence",
                  "working"
                ]
              },
              "network": {
                "type": "string",
                "description": "Property. The name of the Network, with that the operator cooperates. Model:'https://schema.org/Text'. "
              },
              "operator": {
                "type": "string",
                "description": "Property. Charging station's operator. Model:'https://schema.org/Text'. "
              },
              "contactPoint": {
                "type": "object",
                "description": "Property. Model:'https://schema.org/ContactPoint'. The details to contact with the item",
                "properties": {
                  "contactType": {
                    "type": "string",
                    "description": "Property. Contact type of this item"
                  },
                  "email": {
                    "type": "string",
                    "format": "idn-email",
                    "description": "Property. Email address of owner"
                  },
                  "telephone": {
                    "type": "string",
                    "description": "Property. Telephone of this contact"
                  },
                  "name": {
                    "type": "string",
                    "description": "Property. The name of this item"
                  },
                  "url": {
                    "type": "string",
                    "format": "uri",
                    "description": "Property. URL which provides a description or further information about this item"
                  },
                  "areaServed": {
                    "type": "string",
                    "description": "Property. The geographic area where a service or offered item is provided. Supersedes serviceArea"
                  },
                  "availableLanguage": {
                    "description": "Property. Model:'http://schema.org/availableLanguage'. A language someone may use with or at the item, service or place. Please use one of the language codes from the IETF BCP 47 standard. It is implemented the Text option but it could be also Language",
                    "anyOf": [
                      {
                        "anyOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  "contactOption": {
                    "description": "Property. Model:'http://schema.org/contactOption'. An option available on this contact point (e.g. a toll-free number or support for hearing-impaired callers)",
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    ]
                  },
                  "faxNumber": {
                    "type": "string",
                    "description": "Property. Model:'http://schema.org/Text'. The fax number"
                  },
                  "productSupported": {
                    "type": "string",
                    "description": "Property. Model:'http://schema.org/Text'. The product or service this support contact point is related to (such as product support for a particular product line). This can be a specific product or product line (e.g. 'iPhone') or a general category of products or services (e.g. 'smartphones')"
                  },
                  "availabilityRestriction": {
                    "description": "Relationship. Model:'http://schema.org/hoursAvailable'. This property links a contact point to information about when the contact point is not available. The details are provided using the Opening Hours Specification class",
                    "anyOf": [
                      {
                        "type": "array",
                        "description": "Property. Array of identifiers format of any NGSI entity",
                        "items": {
                          "type": "string",
                          "minLength": 1,
                          "maxLength": 256,
                          "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$"
                        }
                      },
                      {
                        "type": "array",
                        "description": "Property. Array of identifiers format of any NGSI entity",
                        "items": {
                          "type": "string",
                          "format": "uri"
                        }
                      }
                    ]
                  }
                }
              },
              "amperage": {
                "type": "number",
                "minimum": 0,
                "description": "Property. The total amperage offered by the charging station.. Model:'http://schema.org/Number'. Units:'Ampers (A)'"
              },
              "voltage": {
                "type": "number",
                "minimum": 0,
                "description": "Property. The total voltage offered by the charging station. Model:'http://schema.org/Number'. Units:'Volts (V)'"
              },
              "chargeType": {
                "type": "array",
                "description": "Property. Type(s) of charge when using this station. Model:'https://schema.org/Text'. Enum:'annualPayment, flat, free, monthlyPayment, other'",
                "items": {
                  "type": "string",
                  "enum": [
                    "annualPayment",
                    "flat",
                    "free",
                    "monthlyPayment",
                    "other"
                  ]
                },
                "minItems": 1,
                "uniqueItems": true
              },
              "acceptedPaymentMethod": {
                "type": "array",
                "description": "Property. Type(s) of charge when using this station. Model:'https://schema.org/Text'. Enum:'ByBankTransferInAdvance, ByInvoice, Cash, CheckInAdvance, COD, DirectDebit, GoogleCheckout, PayPal, PaySwarm'",
                "items": {
                  "type": "string",
                  "enum": [
                    "ByBankTransferInAdvance",
                    "ByInvoice",
                    "Cash",
                    "CheckInAdvance",
                    "COD",
                    "DirectDebit",
                    "GoogleCheckout",
                    "PayPal",
                    "PaySwarm"
                  ]
                },
                "minItems": 1,
                "uniqueItems": true
              },
              "dataDescriptor": {
                "type": "string",
                "format": "uri",
                "description": "Relationship. URI pointing to the data-descriptor entity"
              },
              "powerConsumption": {
                "type": "number",
                "description": "Property. Power consumed by the entity corresponding to this observation"
              },
              "chargingUnitId": {
                "type": "string",
                "description": "Property. The Id of the charging point in the EV charging station corresponding to this observation"
              },
              "transactionId": {
                "type": "string",
                "description": "Property. Unique transaction Id of the entity corresponding to this observation"
              },
              "transactionType": {
                "type": "string",
                "description": "Property. Type of the transaction based on the mode of payment (For eg. mobile/UPI, card, etc) or mode of service (For eg. Issue, ReIssue, Entry, Exit etc.) corresponding to this observation"
              },
              "stationName": {
                "type": "string",
                "description": "Property. The name station corresponding to this observation. It can be the name of bike docking station, charging station, etc"
              },
              "amountCollected": {
                "type": "number",
                "description": "Property. Amount collected towards the service corresponding to this observation"
              },
              "taxAmountCollected": {
                "type": "number",
                "description": "Property. The amount of tax levied on the products, things and services which includes sales tax, value-added tax, service tax, Good and Service tax, customs duty, etc"
              },
              "endDateTime": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Reported end time corresponding to this observation"
              },
              "startDateTime": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Reported start time corresponding to this observation"
              },
              "vehicleType": {
                "type": "string",
                "description": "Property. Type of vehicle from the point of view of its structural characteristics. This is different than the vehicle category . Model:'https://schema.org/Text'. Enum:'agriculturalVehicle, ambulance, anyVehicle, articulatedVehicle, autorickshaw, bicycle, binTrolley, BRT bus, BRT minibus, bus, car, caravan, carOrLightVehicle, carWithCaravan, carWithTrailer, cleaningTrolley, compactor, constructionOrMaintenanceVehicle, dumper, e-moped, e-scooter, e-motorcycle,fire tender, fourWheelDrive, highSidedVehicle, hopper, lorry, minibus, moped, motorcycle, motorcycleWithSideCar, motorscooter, police van, sweepingMachine, tanker, tempo, threeWheeledVehicle, tipper, trailer, tram, twoWheeledVehicle, trolley, van, vehicleWithoutCatalyticConverter, vehicleWithCaravan, vehicleWithTrailer, withEvenNumberedRegistrationPlates, withOddNumberedRegistrationPlates, other'. The following values defined by _VehicleTypeEnum_ and _VehicleTypeEnum2_, [DATEX 2 version 2.3](http://d2docs.ndwcloud.nu/_static/umlmodel/v2.3/index.htm)",
                "enum": [
                  "agriculturalVehicle",
                  "ambulance",
                  "articulatedVehicle",
                  "autorickshaw",
                  "bicycle",
                  "binTrolley",
                  "BRT bus",
                  "BRT minibus",
                  "bus",
                  "car",
                  "caravan",
                  "carOrLightVehicle",
                  "carWithCaravan",
                  "carWithTrailer",
                  "cleaningTrolley",
                  "compactor",
                  "constructionOrMaintenanceVehicle",
                  "dumper",
                  "e-moped",
                  "e-scooter",
                  "e-motorcycle",
                  "fire tender",
                  "fourWheelDrive",
                  "highSidedVehicle",
                  "hopper",
                  "lorry",
                  "minibus",
                  "moped",
                  "motorcycle",
                  "motorcycleWithSideCar",
                  "motorscooter",
                  "police van",
                  "sweepingMachine",
                  "tanker",
                  "tempo",
                  "threeWheeledVehicle",
                  "tipper",
                  "trailer",
                  "tram",
                  "twoWheeledVehicle",
                  "trolley",
                  "van"
                ]
              },
              "observationDateTime": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Last reported time of observation"
              },
              "id": {
                "anyOf": [
                  {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 256,
                    "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                    "description": "Property. Identifier format of any NGSI entity"
                  },
                  {
                    "type": "string",
                    "format": "uri",
                    "description": "Property. Identifier format of any NGSI entity"
                  }
                ],
                "description": "Property. Unique identifier of the entity"
              },
              "dateCreated": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Entity creation timestamp. This will usually be allocated by the storage platform"
              },
              "dateModified": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Timestamp of the last modification of the entity. This will usually be allocated by the storage platform"
              },
              "source": {
                "type": "string",
                "description": "Property. A sequence of characters giving the original source of the entity data as a URL. Recommended to be the fully qualified domain name of the source provider, or the URL to the source object"
              },
              "name": {
                "type": "string",
                "description": "Property. The name of this item"
              },
              "alternateName": {
                "type": "string",
                "description": "Property. An alternative name for this item"
              },
              "description": {
                "type": "string",
                "description": "Property. A description of this item"
              },
              "dataProvider": {
                "type": "string",
                "description": "Property. A sequence of characters identifying the provider of the harmonised data entity"
              },
              "owner": {
                "type": "array",
                "description": "Property. A List containing a JSON encoded sequence of characters referencing the unique Ids of the owner(s)",
                "items": {
                  "anyOf": [
                    {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 256,
                      "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                      "description": "Property. Identifier format of any NGSI entity"
                    },
                    {
                      "type": "string",
                      "format": "uri",
                      "description": "Property. Identifier format of any NGSI entity"
                    }
                  ],
                  "description": "Property. Unique identifier of the entity"
                }
              },
              "seeAlso": {
                "oneOf": [
                  {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                      "type": "string",
                      "format": "uri"
                    }
                  },
                  {
                    "type": "string",
                    "format": "uri"
                  }
                ],
                "description": "Property. list of uri pointing to additional resources about the item"
              },
              "location": {
                "oneOf": [
                  {
                    "title": "GeoJSON Point",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. Point",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "Point"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "minItems": 2,
                        "items": {
                          "type": "number"
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON LineString",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. LineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "LineString"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "minItems": 2,
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "number"
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON Polygon",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. Polygon",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "Polygon"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 4,
                          "items": {
                            "type": "array",
                            "minItems": 2,
                            "items": {
                              "type": "number"
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiPoint",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiPoint",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiPoint"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "number"
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiLineString",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiLineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiLineString"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "array",
                            "minItems": 2,
                            "items": {
                              "type": "number"
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiPolygon",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiLineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiPolygon"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "minItems": 4,
                            "items": {
                              "type": "array",
                              "minItems": 2,
                              "items": {
                                "type": "number"
                              }
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  }
                ],
                "description": "GeoProperty. Geojson reference to the item. It can be Point, LineString, Polygon, MultiPoint, MultiLineString or MultiPolygon"
              },
              "address": {
                "type": "object",
                "description": "Property. The mailing address. Model:'https://schema.org/address'",
                "properties": {
                  "streetAddress": {
                    "type": "string",
                    "description": "Property. The street address. Model:'https://schema.org/streetAddress'"
                  },
                  "addressLocality": {
                    "type": "string",
                    "description": "Property. The locality in which the street address is, and which is in the region. Model:'https://schema.org/addressLocality'"
                  },
                  "addressRegion": {
                    "type": "string",
                    "description": "Property. The region in which the locality is, and which is in the country. Model:'https://schema.org/addressRegion'"
                  },
                  "addressCountry": {
                    "type": "string",
                    "description": "Property. The country. For example, Spain. Model:'https://schema.org/addressCountry'"
                  },
                  "postalCode": {
                    "type": "string",
                    "description": "Property. The postal code. For example, 24004. Model:'https://schema.org/https://schema.org/postalCode'"
                  },
                  "postOfficeBoxNumber": {
                    "type": "string",
                    "description": "Property. The post office box number for PO box addresses. For example, 03578. Model:'https://schema.org/postOfficeBoxNumber'"
                  },
                  "streetNr": {
                    "type": "string",
                    "description": "Property. Number identifying a specific property on a public street"
                  },
                  "district": {
                    "type": "string",
                    "description": "Property. A district is a type of administrative division that, in some countries, is managed by the local government"
                  }
                }
              },
              "areaServed": {
                "type": "string",
                "description": "Property. The geographic area where a service or offered item is provided. Model:'https://schema.org/Text'"
              }
            }
          }
        ],
        "required": [
          "id",
          "type",
          "socketType",
          "capacity",
          "allowedVehicleType"
        ],
        "dollarschema": "http://json-schema.org/schema#",
        "dollarschemaVersion": "/app/dataModels//0.1.0"
      }
    },
    {
      "_id": "661e262abbd46848a7061053",
      "name": "EVChargingStation",
      "mapRef": "661e262abbd46848a706104f",
      "isAlsoReferencedBy": [],
      "user": "test@hotmail.it",
      "dataModel": {
        "dollarschema": "http://json-schema.org/schema#",
        "dollarschemaVersion": "/app/dataModels//0.1.0",
        "modelTags": "IUDX",
        "title": "Smart Data Models - Transportation / EV Charging Station",
        "description": "EV Charging Station",
        "type": "object",
        "allOf": [
          {
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "EVChargingStation"
                ],
                "description": "Property. NGSI Entity type. It has to be EVChargingStation"
              },
              "capacity": {
                "type": "integer",
                "minimum": 1,
                "description": "Property. The total number of vehicles which can be charged at the same time. The total number of sockets can be higher. Model:'http://schema.org/Number'. "
              },
              "socketNumber": {
                "type": "integer",
                "minimum": 1,
                "description": "Property. The total number of sockets offered by this charging station. Model:'http://schema.org/Number'"
              },
              "availableCapacity": {
                "type": "integer",
                "minimum": 0,
                "description": "Property. The number of vehicles which currently can be charged. Model:'http://schema.org/Number'. It must lower or equal than `capacity`"
              },
              "allowedVehicleType": {
                "type": "array",
                "description": "Property. Vehicle type(s) which can be charged. Model:'http://schema.org/Text'. Enum:'bicycle, bus, car, caravan, motorcycle, motorscooter, truck' ",
                "minItems": 1,
                "uniqueItems": true,
                "items": {
                  "type": "string",
                  "enum": [
                    "bicycle",
                    "bus",
                    "car",
                    "caravan",
                    "motorcycle",
                    "motorscooter",
                    "truck"
                  ]
                }
              },
              "socketType": {
                "type": "array",
                "description": "Property. The type of sockets offered by this station. Model:'http://schema.org/Text'. Enum:'Caravan_Mains_Socket, CHAdeMO, CCS/SAE, Dual_CHAdeMO, Dual_J-1772, Dual_Mennekes, J-1772, Mennekes, Other, Tesla, Type2, Type3, Wall_Euro'",
                "minItems": 1,
                "uniqueItems": true,
                "items": {
                  "type": "string",
                  "enum": [
                    "Caravan_Mains_Socket",
                    "CHAdeMO",
                    "CCS/SAE",
                    "Dual_CHAdeMO",
                    "Dual_J-1772",
                    "Dual_Mennekes",
                    "J-1772",
                    "Mennekes",
                    "Other",
                    "Tesla",
                    "Type2",
                    "Type3",
                    "Wall_Euro"
                  ]
                }
              },
              "openingHours": {
                "type": "string",
                "description": "Property. Opening hours of the charging station. Model:'http://schema.org/openingHours'. "
              },
              "status": {
                "type": "string",
                "description": "Property. Model:'http://schema.org/Text'. Status of the charging station. Enum:'almostEmpty, almostFull, empty, full, outOfService, withIncidence, working'. Or any other application-specific",
                "enum": [
                  "almostEmpty",
                  "almostFull",
                  "empty",
                  "full",
                  "outOfService",
                  "withIncidence",
                  "working"
                ]
              },
              "network": {
                "type": "string",
                "description": "Property. The name of the Network, with that the operator cooperates. Model:'https://schema.org/Text'. "
              },
              "operator": {
                "type": "string",
                "description": "Property. Charging station's operator. Model:'https://schema.org/Text'. "
              },
              "contactPoint": {
                "type": "object",
                "description": "Property. Model:'https://schema.org/ContactPoint'. The details to contact with the item",
                "properties": {
                  "contactType": {
                    "type": "string",
                    "description": "Property. Contact type of this item"
                  },
                  "email": {
                    "type": "string",
                    "format": "idn-email",
                    "description": "Property. Email address of owner"
                  },
                  "telephone": {
                    "type": "string",
                    "description": "Property. Telephone of this contact"
                  },
                  "name": {
                    "type": "string",
                    "description": "Property. The name of this item"
                  },
                  "url": {
                    "type": "string",
                    "format": "uri",
                    "description": "Property. URL which provides a description or further information about this item"
                  },
                  "areaServed": {
                    "type": "string",
                    "description": "Property. The geographic area where a service or offered item is provided. Supersedes serviceArea"
                  },
                  "availableLanguage": {
                    "description": "Property. Model:'http://schema.org/availableLanguage'. A language someone may use with or at the item, service or place. Please use one of the language codes from the IETF BCP 47 standard. It is implemented the Text option but it could be also Language",
                    "anyOf": [
                      {
                        "anyOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  "contactOption": {
                    "description": "Property. Model:'http://schema.org/contactOption'. An option available on this contact point (e.g. a toll-free number or support for hearing-impaired callers)",
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    ]
                  },
                  "faxNumber": {
                    "type": "string",
                    "description": "Property. Model:'http://schema.org/Text'. The fax number"
                  },
                  "productSupported": {
                    "type": "string",
                    "description": "Property. Model:'http://schema.org/Text'. The product or service this support contact point is related to (such as product support for a particular product line). This can be a specific product or product line (e.g. 'iPhone') or a general category of products or services (e.g. 'smartphones')"
                  },
                  "availabilityRestriction": {
                    "description": "Relationship. Model:'http://schema.org/hoursAvailable'. This property links a contact point to information about when the contact point is not available. The details are provided using the Opening Hours Specification class",
                    "anyOf": [
                      {
                        "type": "array",
                        "description": "Property. Array of identifiers format of any NGSI entity",
                        "items": {
                          "type": "string",
                          "minLength": 1,
                          "maxLength": 256,
                          "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$"
                        }
                      },
                      {
                        "type": "array",
                        "description": "Property. Array of identifiers format of any NGSI entity",
                        "items": {
                          "type": "string",
                          "format": "uri"
                        }
                      }
                    ]
                  }
                }
              },
              "amperage": {
                "type": "number",
                "minimum": 0,
                "description": "Property. The total amperage offered by the charging station.. Model:'http://schema.org/Number'. Units:'Ampers (A)'"
              },
              "voltage": {
                "type": "number",
                "minimum": 0,
                "description": "Property. The total voltage offered by the charging station. Model:'http://schema.org/Number'. Units:'Volts (V)'"
              },
              "chargeType": {
                "type": "array",
                "description": "Property. Type(s) of charge when using this station. Model:'https://schema.org/Text'. Enum:'annualPayment, flat, free, monthlyPayment, other'",
                "items": {
                  "type": "string",
                  "enum": [
                    "annualPayment",
                    "flat",
                    "free",
                    "monthlyPayment",
                    "other"
                  ]
                },
                "minItems": 1,
                "uniqueItems": true
              },
              "acceptedPaymentMethod": {
                "type": "array",
                "description": "Property. Type(s) of charge when using this station. Model:'https://schema.org/Text'. Enum:'ByBankTransferInAdvance, ByInvoice, Cash, CheckInAdvance, COD, DirectDebit, GoogleCheckout, PayPal, PaySwarm'",
                "items": {
                  "type": "string",
                  "enum": [
                    "ByBankTransferInAdvance",
                    "ByInvoice",
                    "Cash",
                    "CheckInAdvance",
                    "COD",
                    "DirectDebit",
                    "GoogleCheckout",
                    "PayPal",
                    "PaySwarm"
                  ]
                },
                "minItems": 1,
                "uniqueItems": true
              },
              "dataDescriptor": {
                "type": "string",
                "format": "uri",
                "description": "Relationship. URI pointing to the data-descriptor entity"
              },
              "powerConsumption": {
                "type": "number",
                "description": "Property. Power consumed by the entity corresponding to this observation"
              },
              "chargingUnitId": {
                "type": "string",
                "description": "Property. The Id of the charging point in the EV charging station corresponding to this observation"
              },
              "transactionId": {
                "type": "string",
                "description": "Property. Unique transaction Id of the entity corresponding to this observation"
              },
              "transactionType": {
                "type": "string",
                "description": "Property. Type of the transaction based on the mode of payment (For eg. mobile/UPI, card, etc) or mode of service (For eg. Issue, ReIssue, Entry, Exit etc.) corresponding to this observation"
              },
              "stationName": {
                "type": "string",
                "description": "Property. The name station corresponding to this observation. It can be the name of bike docking station, charging station, etc"
              },
              "amountCollected": {
                "type": "number",
                "description": "Property. Amount collected towards the service corresponding to this observation"
              },
              "taxAmountCollected": {
                "type": "number",
                "description": "Property. The amount of tax levied on the products, things and services which includes sales tax, value-added tax, service tax, Good and Service tax, customs duty, etc"
              },
              "endDateTime": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Reported end time corresponding to this observation"
              },
              "startDateTime": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Reported start time corresponding to this observation"
              },
              "vehicleType": {
                "type": "string",
                "description": "Property. Type of vehicle from the point of view of its structural characteristics. This is different than the vehicle category . Model:'https://schema.org/Text'. Enum:'agriculturalVehicle, ambulance, anyVehicle, articulatedVehicle, autorickshaw, bicycle, binTrolley, BRT bus, BRT minibus, bus, car, caravan, carOrLightVehicle, carWithCaravan, carWithTrailer, cleaningTrolley, compactor, constructionOrMaintenanceVehicle, dumper, e-moped, e-scooter, e-motorcycle,fire tender, fourWheelDrive, highSidedVehicle, hopper, lorry, minibus, moped, motorcycle, motorcycleWithSideCar, motorscooter, police van, sweepingMachine, tanker, tempo, threeWheeledVehicle, tipper, trailer, tram, twoWheeledVehicle, trolley, van, vehicleWithoutCatalyticConverter, vehicleWithCaravan, vehicleWithTrailer, withEvenNumberedRegistrationPlates, withOddNumberedRegistrationPlates, other'. The following values defined by _VehicleTypeEnum_ and _VehicleTypeEnum2_, [DATEX 2 version 2.3](http://d2docs.ndwcloud.nu/_static/umlmodel/v2.3/index.htm)",
                "enum": [
                  "agriculturalVehicle",
                  "ambulance",
                  "articulatedVehicle",
                  "autorickshaw",
                  "bicycle",
                  "binTrolley",
                  "BRT bus",
                  "BRT minibus",
                  "bus",
                  "car",
                  "caravan",
                  "carOrLightVehicle",
                  "carWithCaravan",
                  "carWithTrailer",
                  "cleaningTrolley",
                  "compactor",
                  "constructionOrMaintenanceVehicle",
                  "dumper",
                  "e-moped",
                  "e-scooter",
                  "e-motorcycle",
                  "fire tender",
                  "fourWheelDrive",
                  "highSidedVehicle",
                  "hopper",
                  "lorry",
                  "minibus",
                  "moped",
                  "motorcycle",
                  "motorcycleWithSideCar",
                  "motorscooter",
                  "police van",
                  "sweepingMachine",
                  "tanker",
                  "tempo",
                  "threeWheeledVehicle",
                  "tipper",
                  "trailer",
                  "tram",
                  "twoWheeledVehicle",
                  "trolley",
                  "van"
                ]
              },
              "observationDateTime": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Last reported time of observation"
              },
              "id": {
                "anyOf": [
                  {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 256,
                    "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                    "description": "Property. Identifier format of any NGSI entity"
                  },
                  {
                    "type": "string",
                    "format": "uri",
                    "description": "Property. Identifier format of any NGSI entity"
                  }
                ],
                "description": "Property. Unique identifier of the entity"
              },
              "dateCreated": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Entity creation timestamp. This will usually be allocated by the storage platform"
              },
              "dateModified": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Timestamp of the last modification of the entity. This will usually be allocated by the storage platform"
              },
              "source": {
                "type": "string",
                "description": "Property. A sequence of characters giving the original source of the entity data as a URL. Recommended to be the fully qualified domain name of the source provider, or the URL to the source object"
              },
              "name": {
                "type": "string",
                "description": "Property. The name of this item"
              },
              "alternateName": {
                "type": "string",
                "description": "Property. An alternative name for this item"
              },
              "description": {
                "type": "string",
                "description": "Property. A description of this item"
              },
              "dataProvider": {
                "type": "string",
                "description": "Property. A sequence of characters identifying the provider of the harmonised data entity"
              },
              "owner": {
                "type": "array",
                "description": "Property. A List containing a JSON encoded sequence of characters referencing the unique Ids of the owner(s)",
                "items": {
                  "anyOf": [
                    {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 256,
                      "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                      "description": "Property. Identifier format of any NGSI entity"
                    },
                    {
                      "type": "string",
                      "format": "uri",
                      "description": "Property. Identifier format of any NGSI entity"
                    }
                  ],
                  "description": "Property. Unique identifier of the entity"
                }
              },
              "seeAlso": {
                "oneOf": [
                  {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                      "type": "string",
                      "format": "uri"
                    }
                  },
                  {
                    "type": "string",
                    "format": "uri"
                  }
                ],
                "description": "Property. list of uri pointing to additional resources about the item"
              },
              "location": {
                "oneOf": [
                  {
                    "title": "GeoJSON Point",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. Point",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "Point"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "minItems": 2,
                        "items": {
                          "type": "number"
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON LineString",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. LineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "LineString"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "minItems": 2,
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "number"
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON Polygon",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. Polygon",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "Polygon"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 4,
                          "items": {
                            "type": "array",
                            "minItems": 2,
                            "items": {
                              "type": "number"
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiPoint",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiPoint",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiPoint"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "number"
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiLineString",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiLineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiLineString"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "array",
                            "minItems": 2,
                            "items": {
                              "type": "number"
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiPolygon",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiLineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiPolygon"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "minItems": 4,
                            "items": {
                              "type": "array",
                              "minItems": 2,
                              "items": {
                                "type": "number"
                              }
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  }
                ],
                "description": "GeoProperty. Geojson reference to the item. It can be Point, LineString, Polygon, MultiPoint, MultiLineString or MultiPolygon"
              },
              "address": {
                "type": "object",
                "description": "Property. The mailing address. Model:'https://schema.org/address'",
                "properties": {
                  "streetAddress": {
                    "type": "string",
                    "description": "Property. The street address. Model:'https://schema.org/streetAddress'"
                  },
                  "addressLocality": {
                    "type": "string",
                    "description": "Property. The locality in which the street address is, and which is in the region. Model:'https://schema.org/addressLocality'"
                  },
                  "addressRegion": {
                    "type": "string",
                    "description": "Property. The region in which the locality is, and which is in the country. Model:'https://schema.org/addressRegion'"
                  },
                  "addressCountry": {
                    "type": "string",
                    "description": "Property. The country. For example, Spain. Model:'https://schema.org/addressCountry'"
                  },
                  "postalCode": {
                    "type": "string",
                    "description": "Property. The postal code. For example, 24004. Model:'https://schema.org/https://schema.org/postalCode'"
                  },
                  "postOfficeBoxNumber": {
                    "type": "string",
                    "description": "Property. The post office box number for PO box addresses. For example, 03578. Model:'https://schema.org/postOfficeBoxNumber'"
                  },
                  "streetNr": {
                    "type": "string",
                    "description": "Property. Number identifying a specific property on a public street"
                  },
                  "district": {
                    "type": "string",
                    "description": "Property. A district is a type of administrative division that, in some countries, is managed by the local government"
                  }
                }
              },
              "areaServed": {
                "type": "string",
                "description": "Property. The geographic area where a service or offered item is provided. Model:'https://schema.org/Text'"
              }
            }
          }
        ],
        "required": [
          "id",
          "type",
          "socketType",
          "capacity",
          "allowedVehicleType"
        ]
      }
    },
    {
      "_id": "661e2970bbd46848a7061069",
      "name": "BikeLaneTransportation",
      "mapRef": "661e2970bbd46848a7061065",
      "isAlsoReferencedBy": [],
      "user": "test@hotmail.it",
      "dataModel": {
        "dollarschema": "http://json-schema.org/schema#",
        "dollarschemaVersion": "/app/dataModels//0.0.1",
        "modelTags": "",
        "title": "Smart Data Models - Bike Lane Schema",
        "description": "A generic bike lane schema",
        "type": "object",
        "allOf": [
          {
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "BikeLane"
                ],
                "description": "Property. NGSI-LD Entity Type. It has to be BikeLanes"
              },
              "laneOccupancy": {
                "type": "number",
                "description": "Property. Model:'https://schema.org/Number'. Indicates the number of vehicles circulating on the lane"
              },
              "laneLength": {
                "type": "number",
                "description": "Property. Model:'https://schema.org/Number'. Indicates the length of the lane"
              },
              "laneWidth": {
                "type": "number",
                "description": "Property. Model:'https://schema.org/Number'. Indicates the width of the lane"
              },
              "dateObserved": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'https://schema.org/DateTime'. The date and time of this observation in ISO8601 UTCformat"
              },
              "id": {
                "anyOf": [
                  {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 256,
                    "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                    "description": "Property. Identifier format of any NGSI entity"
                  },
                  {
                    "type": "string",
                    "format": "uri",
                    "description": "Property. Identifier format of any NGSI entity"
                  }
                ],
                "description": "Property. Unique identifier of the entity"
              },
              "dateCreated": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Entity creation timestamp. This will usually be allocated by the storage platform"
              },
              "dateModified": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Timestamp of the last modification of the entity. This will usually be allocated by the storage platform"
              },
              "source": {
                "type": "string",
                "description": "Property. A sequence of characters giving the original source of the entity data as a URL. Recommended to be the fully qualified domain name of the source provider, or the URL to the source object"
              },
              "name": {
                "type": "string",
                "description": "Property. The name of this item"
              },
              "alternateName": {
                "type": "string",
                "description": "Property. An alternative name for this item"
              },
              "description": {
                "type": "string",
                "description": "Property. A description of this item"
              },
              "dataProvider": {
                "type": "string",
                "description": "Property. A sequence of characters identifying the provider of the harmonised data entity"
              },
              "owner": {
                "type": "array",
                "description": "Property. A List containing a JSON encoded sequence of characters referencing the unique Ids of the owner(s)",
                "items": {
                  "anyOf": [
                    {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 256,
                      "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                      "description": "Property. Identifier format of any NGSI entity"
                    },
                    {
                      "type": "string",
                      "format": "uri",
                      "description": "Property. Identifier format of any NGSI entity"
                    }
                  ],
                  "description": "Property. Unique identifier of the entity"
                }
              },
              "seeAlso": {
                "oneOf": [
                  {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                      "type": "string",
                      "format": "uri"
                    }
                  },
                  {
                    "type": "string",
                    "format": "uri"
                  }
                ],
                "description": "Property. list of uri pointing to additional resources about the item"
              },
              "location": {
                "oneOf": [
                  {
                    "title": "GeoJSON Point",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. Point",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "Point"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "minItems": 2,
                        "items": {
                          "type": "number"
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON LineString",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. LineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "LineString"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "minItems": 2,
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "number"
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON Polygon",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. Polygon",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "Polygon"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 4,
                          "items": {
                            "type": "array",
                            "minItems": 2,
                            "items": {
                              "type": "number"
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiPoint",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiPoint",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiPoint"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "number"
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiLineString",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiLineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiLineString"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "array",
                            "minItems": 2,
                            "items": {
                              "type": "number"
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiPolygon",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiLineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiPolygon"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "minItems": 4,
                            "items": {
                              "type": "array",
                              "minItems": 2,
                              "items": {
                                "type": "number"
                              }
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  }
                ],
                "description": "GeoProperty. Geojson reference to the item. It can be Point, LineString, Polygon, MultiPoint, MultiLineString or MultiPolygon"
              },
              "address": {
                "type": "object",
                "description": "Property. The mailing address. Model:'https://schema.org/address'",
                "properties": {
                  "streetAddress": {
                    "type": "string",
                    "description": "Property. The street address. Model:'https://schema.org/streetAddress'"
                  },
                  "addressLocality": {
                    "type": "string",
                    "description": "Property. The locality in which the street address is, and which is in the region. Model:'https://schema.org/addressLocality'"
                  },
                  "addressRegion": {
                    "type": "string",
                    "description": "Property. The region in which the locality is, and which is in the country. Model:'https://schema.org/addressRegion'"
                  },
                  "addressCountry": {
                    "type": "string",
                    "description": "Property. The country. For example, Spain. Model:'https://schema.org/addressCountry'"
                  },
                  "postalCode": {
                    "type": "string",
                    "description": "Property. The postal code. For example, 24004. Model:'https://schema.org/https://schema.org/postalCode'"
                  },
                  "postOfficeBoxNumber": {
                    "type": "string",
                    "description": "Property. The post office box number for PO box addresses. For example, 03578. Model:'https://schema.org/postOfficeBoxNumber'"
                  },
                  "streetNr": {
                    "type": "string",
                    "description": "Property. Number identifying a specific property on a public street"
                  },
                  "district": {
                    "type": "string",
                    "description": "Property. A district is a type of administrative division that, in some countries, is managed by the local government"
                  }
                }
              },
              "areaServed": {
                "type": "string",
                "description": "Property. The geographic area where a service or offered item is provided. Model:'https://schema.org/Text'"
              }
            }
          }
        ],
        "required": [
          "id",
          "type"
        ]
      }
    },
    {
      "_id": "661e2daebbd46848a70610a8",
      "name": "DatasetDCATAP",
      "mapRef": "661e2daebbd46848a70610a4",
      "isAlsoReferencedBy": [],
      "user": "test@hotmail.it",
      "dataModel": {
        "title": "Dataset DCAT-AP 2.1.1 schema",
        "description": "Dataset Schema meeting DCAT-AP 2.1.1 specification",
        "type": "object",
        "allOf": [
          {
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "Dataset"
                ],
                "description": "Property. NGSI type. It has to be Dataset"
              },
              "id": {
                "anyOf": [
                  {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 256,
                    "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                    "description": "Property. Identifier format of any NGSI entity"
                  },
                  {
                    "type": "string",
                    "format": "uri",
                    "description": "Property. Identifier format of any NGSI entity"
                  }
                ],
                "description": "Property. Unique identifier of the entity"
              },
              "datasetDescription": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a free-text account of the Dataset. This property can be repeated for parallel language versions of the description",
                "items": {
                  "type": "string",
                  "description": "Property. Every description in a language"
                }
              },
              "title": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a name given to the Dataset. This property can be repeated for parallel language versions of the name",
                "items": {
                  "type": "string",
                  "description": "Property. Every title in a language"
                }
              },
              "contactPoint": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2006/vcard/ns#Kind'. This property contains contact information that can be used for sending comments about the Dataset",
                "items": {
                  "type": "string",
                  "description": "Property. Every contact element"
                }
              },
              "belongsToCatalogue": {
                "description": "Relationship. It links the Dataset to its parent Catalogue. Model:'https://www.w3.org/ns/dcat#Catalogue'. Note: this attribute does not belong to the current version of DCAT-AP, 2.1.1",
                "anyOf": [
                  {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 256,
                    "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                    "description": "Property. Link to the catalogue"
                  },
                  {
                    "type": "string",
                    "format": "uri",
                    "description": "Property. Link to the catalogue"
                  }
                ]
              },
              "datasetDistribution": {
                "type": "array",
                "description": "Relationship. This property links the Dataset to an available Distribution. Model:'http://www.w3.org/ns/dcat#Distribution'",
                "items": {
                  "anyOf": [
                    {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 256,
                      "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                      "description": "Property. Every link to a distribution"
                    },
                    {
                      "type": "string",
                      "format": "uri",
                      "description": "Property. Every link to a distribution"
                    }
                  ]
                }
              },
              "keyword": {
                "type": "array",
                "description": "Property. This property contains a keyword or tag, describing the Dataset. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'",
                "items": {
                  "type": "string",
                  "description": "Property. Every keyword tag included"
                }
              },
              "publisher": {
                "description": "Property. Model:'http://xmlns.com/foaf/0.1/Agent'. This property refers to an entity (organisation) responsible for making the Dataset available",
                "type": "string"
              },
              "spatial": {
                "description": "GeoProperty. Model:'http://purl.org/dc/terms/Location'. This property refers to a geographic region that is covered by the Dataset",
                "type": "array",
                "items": {
                  "description": "Property. Every location included",
                  "oneOf": [
                    {
                      "title": "GeoJSON Point",
                      "type": "object",
                      "required": [
                        "type",
                        "coordinates"
                      ],
                      "description": "GeoProperty. Geojson reference to the item. Point",
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "Point"
                          ]
                        },
                        "coordinates": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "number"
                          }
                        },
                        "bbox": {
                          "type": "array",
                          "minItems": 4,
                          "items": {
                            "type": "number"
                          }
                        }
                      }
                    },
                    {
                      "title": "GeoJSON LineString",
                      "type": "object",
                      "required": [
                        "type",
                        "coordinates"
                      ],
                      "description": "GeoProperty. Geojson reference to the item. LineString",
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "LineString"
                          ]
                        },
                        "coordinates": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "array",
                            "minItems": 2,
                            "items": {
                              "type": "number"
                            }
                          }
                        },
                        "bbox": {
                          "type": "array",
                          "minItems": 4,
                          "items": {
                            "type": "number"
                          }
                        }
                      }
                    },
                    {
                      "title": "GeoJSON Polygon",
                      "type": "object",
                      "required": [
                        "type",
                        "coordinates"
                      ],
                      "description": "GeoProperty. Geojson reference to the item. Polygon",
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "Polygon"
                          ]
                        },
                        "coordinates": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "minItems": 4,
                            "items": {
                              "type": "array",
                              "minItems": 2,
                              "items": {
                                "type": "number"
                              }
                            }
                          }
                        },
                        "bbox": {
                          "type": "array",
                          "minItems": 4,
                          "items": {
                            "type": "number"
                          }
                        }
                      }
                    },
                    {
                      "title": "GeoJSON MultiPoint",
                      "type": "object",
                      "required": [
                        "type",
                        "coordinates"
                      ],
                      "description": "GeoProperty. Geojson reference to the item. MultiPoint",
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "MultiPoint"
                          ]
                        },
                        "coordinates": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "minItems": 2,
                            "items": {
                              "type": "number"
                            }
                          }
                        },
                        "bbox": {
                          "type": "array",
                          "minItems": 4,
                          "items": {
                            "type": "number"
                          }
                        }
                      }
                    },
                    {
                      "title": "GeoJSON MultiLineString",
                      "type": "object",
                      "required": [
                        "type",
                        "coordinates"
                      ],
                      "description": "GeoProperty. Geojson reference to the item. MultiLineString",
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "MultiLineString"
                          ]
                        },
                        "coordinates": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "minItems": 2,
                            "items": {
                              "type": "array",
                              "minItems": 2,
                              "items": {
                                "type": "number"
                              }
                            }
                          }
                        },
                        "bbox": {
                          "type": "array",
                          "minItems": 4,
                          "items": {
                            "type": "number"
                          }
                        }
                      }
                    },
                    {
                      "title": "GeoJSON MultiPolygon",
                      "type": "object",
                      "required": [
                        "type",
                        "coordinates"
                      ],
                      "description": "GeoProperty. Geojson reference to the item. MultiLineString",
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "MultiPolygon"
                          ]
                        },
                        "coordinates": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "array",
                              "minItems": 4,
                              "items": {
                                "type": "array",
                                "minItems": 2,
                                "items": {
                                  "type": "number"
                                }
                              }
                            }
                          }
                        },
                        "bbox": {
                          "type": "array",
                          "minItems": 4,
                          "items": {
                            "type": "number"
                          }
                        }
                      }
                    }
                  ]
                }
              },
              "temporal": {
                "description": "Property. This property refers to a temporal period that the Dataset covers. Model:'http://purl.org/dc/terms/PeriodOfTime'",
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Property. Every temporal period included"
                }
              },
              "theme": {
                "description": "Property. Model:'http://www.w3.org/2004/02/skos/core#Concept'. This property refers to a category of the Dataset. A Dataset may be associated with multiple themes",
                "type": "array",
                "items": {
                  "type": "string",
                  "description": "Property. Every theme included"
                }
              },
              "accessRights": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/RightsStatement'. This property refers to information that indicates whether the Dataset is open data, has access restrictions or is not public"
              },
              "creator": {
                "type": "array",
                "description": "Property. Model:'http://xmlns.com/foaf/0.1/Agent'. This property refers to the entity primarily responsible for producing the dataset",
                "items": {
                  "type": "string",
                  "description": "Property. Every creator included"
                }
              },
              "conformsTo": {
                "type": "array",
                "description": "Property. Model:'http://purl.org/dc/terms/Standard'. This property refers to an implementing rule or other specification. ",
                "items": {
                  "type": "string",
                  "description": "Property. Every rule or specification applicable"
                }
              },
              "page": {
                "description": "Property. Model:'http://xmlns.com/foaf/0.1/Document'. This property refers to a page or document about this Dataset. ",
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every page or document"
                }
              },
              "accrualPeriodicity": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/Frequency'. This property refers to the frequency at which the Dataset is updated"
              },
              "hasVersion": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#Dataset'. This property refers to a related Dataset that is a version, edition, or adaptation of the described Dataset",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every version of the related datasets"
                }
              },
              "identifier": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the main identifier for the Dataset, e.g. the URI or other unique identifier in the context of the Catalogue",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every identifier of the dataset"
                }
              },
              "isReferencedBy": {
                "type": "array",
                "description": "Relationship. Model:'http://www.w3.org/2000/01/rdf-schema#Resource'. This property is about a related resource, such as a publication, that references, cites, or otherwise points to the dataset",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every resource related to the dataset"
                }
              },
              "isVersionOf": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#Dataset'. This property refers to a related Dataset of which the described Dataset is a version, edition, or adaptation",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every dataset that the current dataset is a version of it"
                }
              },
              "landingPage": {
                "description": "Property. Model:'http://xmlns.com/foaf/0.1/Document'. This property refers to a web page that provides access to the Dataset, its Distributions and/or additional information. It is intended to point to a landing page at the original data provider, not to a page on a site of a third party, such as an aggregator",
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every web page listed"
                }
              },
              "language": {
                "type": "array",
                "description": "Property. Model:'http://purl.org/dc/terms/LinguisticSystem'. This property refers to a language of the Dataset. This property can be repeated if there are multiple languages in the Dataset",
                "items": {
                  "type": "string",
                  "description": "Property. Every language included"
                }
              },
              "otherIdentifier": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/adms#Identifier'. This property refers to a secondary identifier of the Dataset, such as MAST/ADS, DataCite, DOI, EZID or W3ID",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every additional identifier included"
                }
              },
              "provenance": {
                "type": "array",
                "description": "Property. Model:'http://purl.org/dc/terms/ProvenanceStatement'. This property contains a statement about the lineage of a Dataset",
                "items": {
                  "type": "string",
                  "description": "Property. Every lineage associated to the dataset"
                }
              },
              "qualifiedAttribution": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#Relationship'. This property refers to a link to an Agent having some form of responsibility for the resource",
                "items": {
                  "type": "string",
                  "description": "Property. Every attribution included"
                }
              },
              "qualifiedRelation": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#Relationship'. This property provides a link to a description of a relationship with another resource",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every qualified relation included"
                }
              },
              "relation": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Resource'. This property refers to a related resource",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every related resource included"
                }
              },
              "issued": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the date of formal issuance (e.g., publication) of the Dataset",
                "format": "date-time"
              },
              "sample": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#Distribution'. This property refers to a sample distribution of the dataset",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every sample included with the dataset"
                }
              },
              "source": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#Dataset'. This property refers to a related Dataset from which the described Dataset is derived",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every dataset which is a source of the current dataset"
                }
              },
              "spatialResolutionInMeters": {
                "type": "number",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property refers to the minimum spatial separation resolvable in a dataset, measured in meters"
              },
              "Type": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2004/02/skos/core#Concept'. This property refers to the type of the Dataset. A recommended controlled vocabulary data-type is foreseen"
              },
              "modified": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the most recent date on which the Dataset was changed or modified"
              },
              "version": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a version number or other version designation of the Dataset"
              },
              "versionNotes": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a description of the differences between this version and a previous version of the Dataset. This property can be repeated for parallel language versions of the version notes",
                "items": {
                  "type": "string",
                  "description": "Property. Every language description of the version notes"
                }
              },
              "wasGeneratedBy": {
                "type": "array",
                "description": "Property. Model:'https://www.w3.org/ns/prov#Activity'. This property refers to an activity that generated, or provides the business context for, the creation of the dataset",
                "items": {
                  "type": "string",
                  "description": "Property. Every activity included"
                }
              }
            }
          }
        ],
        "required": [
          "type"
        ],
        "dollarschema": "http://json-schema.org/schema#",
        "dollarschemaVersion": "/app/dataModels//2.0.1"
      }
    },
    {
      "_id": "661e4deabbd46848a70610c9",
      "name": "TransportationEV",
      "mapRef": "661e4deabbd46848a70610c5",
      "isAlsoReferencedBy": [],
      "user": "test@hotmail.it",
      "dataModel": {
        "dollarschema": "http://json-schema.org/schema#",
        "dollarschemaVersion": "/app/dataModels//0.1.0",
        "modelTags": "IUDX",
        "title": "Smart Data Models - Transportation / EV Charging Station",
        "description": "EV Charging Station",
        "type": "object",
        "allOf": [
          {
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "EVChargingStation"
                ],
                "description": "Property. NGSI Entity type. It has to be EVChargingStation"
              },
              "capacity": {
                "type": "integer",
                "minimum": 1,
                "description": "Property. The total number of vehicles which can be charged at the same time. The total number of sockets can be higher. Model:'http://schema.org/Number'. "
              },
              "socketNumber": {
                "type": "integer",
                "minimum": 1,
                "description": "Property. The total number of sockets offered by this charging station. Model:'http://schema.org/Number'"
              },
              "availableCapacity": {
                "type": "integer",
                "minimum": 0,
                "description": "Property. The number of vehicles which currently can be charged. Model:'http://schema.org/Number'. It must lower or equal than `capacity`"
              },
              "allowedVehicleType": {
                "type": "array",
                "description": "Property. Vehicle type(s) which can be charged. Model:'http://schema.org/Text'. Enum:'bicycle, bus, car, caravan, motorcycle, motorscooter, truck' ",
                "minItems": 1,
                "uniqueItems": true,
                "items": {
                  "type": "string",
                  "enum": [
                    "bicycle",
                    "bus",
                    "car",
                    "caravan",
                    "motorcycle",
                    "motorscooter",
                    "truck"
                  ]
                }
              },
              "socketType": {
                "type": "array",
                "description": "Property. The type of sockets offered by this station. Model:'http://schema.org/Text'. Enum:'Caravan_Mains_Socket, CHAdeMO, CCS/SAE, Dual_CHAdeMO, Dual_J-1772, Dual_Mennekes, J-1772, Mennekes, Other, Tesla, Type2, Type3, Wall_Euro'",
                "minItems": 1,
                "uniqueItems": true,
                "items": {
                  "type": "string",
                  "enum": [
                    "Caravan_Mains_Socket",
                    "CHAdeMO",
                    "CCS/SAE",
                    "Dual_CHAdeMO",
                    "Dual_J-1772",
                    "Dual_Mennekes",
                    "J-1772",
                    "Mennekes",
                    "Other",
                    "Tesla",
                    "Type2",
                    "Type3",
                    "Wall_Euro"
                  ]
                }
              },
              "openingHours": {
                "type": "string",
                "description": "Property. Opening hours of the charging station. Model:'http://schema.org/openingHours'. "
              },
              "status": {
                "type": "string",
                "description": "Property. Model:'http://schema.org/Text'. Status of the charging station. Enum:'almostEmpty, almostFull, empty, full, outOfService, withIncidence, working'. Or any other application-specific",
                "enum": [
                  "almostEmpty",
                  "almostFull",
                  "empty",
                  "full",
                  "outOfService",
                  "withIncidence",
                  "working"
                ]
              },
              "network": {
                "type": "string",
                "description": "Property. The name of the Network, with that the operator cooperates. Model:'https://schema.org/Text'. "
              },
              "operator": {
                "type": "string",
                "description": "Property. Charging station's operator. Model:'https://schema.org/Text'. "
              },
              "contactPoint": {
                "type": "object",
                "description": "Property. Model:'https://schema.org/ContactPoint'. The details to contact with the item",
                "properties": {
                  "contactType": {
                    "type": "string",
                    "description": "Property. Contact type of this item"
                  },
                  "email": {
                    "type": "string",
                    "format": "idn-email",
                    "description": "Property. Email address of owner"
                  },
                  "telephone": {
                    "type": "string",
                    "description": "Property. Telephone of this contact"
                  },
                  "name": {
                    "type": "string",
                    "description": "Property. The name of this item"
                  },
                  "url": {
                    "type": "string",
                    "format": "uri",
                    "description": "Property. URL which provides a description or further information about this item"
                  },
                  "areaServed": {
                    "type": "string",
                    "description": "Property. The geographic area where a service or offered item is provided. Supersedes serviceArea"
                  },
                  "availableLanguage": {
                    "description": "Property. Model:'http://schema.org/availableLanguage'. A language someone may use with or at the item, service or place. Please use one of the language codes from the IETF BCP 47 standard. It is implemented the Text option but it could be also Language",
                    "anyOf": [
                      {
                        "anyOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          }
                        ]
                      }
                    ]
                  },
                  "contactOption": {
                    "description": "Property. Model:'http://schema.org/contactOption'. An option available on this contact point (e.g. a toll-free number or support for hearing-impaired callers)",
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    ]
                  },
                  "faxNumber": {
                    "type": "string",
                    "description": "Property. Model:'http://schema.org/Text'. The fax number"
                  },
                  "productSupported": {
                    "type": "string",
                    "description": "Property. Model:'http://schema.org/Text'. The product or service this support contact point is related to (such as product support for a particular product line). This can be a specific product or product line (e.g. 'iPhone') or a general category of products or services (e.g. 'smartphones')"
                  },
                  "availabilityRestriction": {
                    "description": "Relationship. Model:'http://schema.org/hoursAvailable'. This property links a contact point to information about when the contact point is not available. The details are provided using the Opening Hours Specification class",
                    "anyOf": [
                      {
                        "type": "array",
                        "description": "Property. Array of identifiers format of any NGSI entity",
                        "items": {
                          "type": "string",
                          "minLength": 1,
                          "maxLength": 256,
                          "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$"
                        }
                      },
                      {
                        "type": "array",
                        "description": "Property. Array of identifiers format of any NGSI entity",
                        "items": {
                          "type": "string",
                          "format": "uri"
                        }
                      }
                    ]
                  }
                }
              },
              "amperage": {
                "type": "number",
                "minimum": 0,
                "description": "Property. The total amperage offered by the charging station.. Model:'http://schema.org/Number'. Units:'Ampers (A)'"
              },
              "voltage": {
                "type": "number",
                "minimum": 0,
                "description": "Property. The total voltage offered by the charging station. Model:'http://schema.org/Number'. Units:'Volts (V)'"
              },
              "chargeType": {
                "type": "array",
                "description": "Property. Type(s) of charge when using this station. Model:'https://schema.org/Text'. Enum:'annualPayment, flat, free, monthlyPayment, other'",
                "items": {
                  "type": "string",
                  "enum": [
                    "annualPayment",
                    "flat",
                    "free",
                    "monthlyPayment",
                    "other"
                  ]
                },
                "minItems": 1,
                "uniqueItems": true
              },
              "acceptedPaymentMethod": {
                "type": "array",
                "description": "Property. Type(s) of charge when using this station. Model:'https://schema.org/Text'. Enum:'ByBankTransferInAdvance, ByInvoice, Cash, CheckInAdvance, COD, DirectDebit, GoogleCheckout, PayPal, PaySwarm'",
                "items": {
                  "type": "string",
                  "enum": [
                    "ByBankTransferInAdvance",
                    "ByInvoice",
                    "Cash",
                    "CheckInAdvance",
                    "COD",
                    "DirectDebit",
                    "GoogleCheckout",
                    "PayPal",
                    "PaySwarm"
                  ]
                },
                "minItems": 1,
                "uniqueItems": true
              },
              "dataDescriptor": {
                "type": "string",
                "format": "uri",
                "description": "Relationship. URI pointing to the data-descriptor entity"
              },
              "powerConsumption": {
                "type": "number",
                "description": "Property. Power consumed by the entity corresponding to this observation"
              },
              "chargingUnitId": {
                "type": "string",
                "description": "Property. The Id of the charging point in the EV charging station corresponding to this observation"
              },
              "transactionId": {
                "type": "string",
                "description": "Property. Unique transaction Id of the entity corresponding to this observation"
              },
              "transactionType": {
                "type": "string",
                "description": "Property. Type of the transaction based on the mode of payment (For eg. mobile/UPI, card, etc) or mode of service (For eg. Issue, ReIssue, Entry, Exit etc.) corresponding to this observation"
              },
              "stationName": {
                "type": "string",
                "description": "Property. The name station corresponding to this observation. It can be the name of bike docking station, charging station, etc"
              },
              "amountCollected": {
                "type": "number",
                "description": "Property. Amount collected towards the service corresponding to this observation"
              },
              "taxAmountCollected": {
                "type": "number",
                "description": "Property. The amount of tax levied on the products, things and services which includes sales tax, value-added tax, service tax, Good and Service tax, customs duty, etc"
              },
              "endDateTime": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Reported end time corresponding to this observation"
              },
              "startDateTime": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Reported start time corresponding to this observation"
              },
              "vehicleType": {
                "type": "string",
                "description": "Property. Type of vehicle from the point of view of its structural characteristics. This is different than the vehicle category . Model:'https://schema.org/Text'. Enum:'agriculturalVehicle, ambulance, anyVehicle, articulatedVehicle, autorickshaw, bicycle, binTrolley, BRT bus, BRT minibus, bus, car, caravan, carOrLightVehicle, carWithCaravan, carWithTrailer, cleaningTrolley, compactor, constructionOrMaintenanceVehicle, dumper, e-moped, e-scooter, e-motorcycle,fire tender, fourWheelDrive, highSidedVehicle, hopper, lorry, minibus, moped, motorcycle, motorcycleWithSideCar, motorscooter, police van, sweepingMachine, tanker, tempo, threeWheeledVehicle, tipper, trailer, tram, twoWheeledVehicle, trolley, van, vehicleWithoutCatalyticConverter, vehicleWithCaravan, vehicleWithTrailer, withEvenNumberedRegistrationPlates, withOddNumberedRegistrationPlates, other'. The following values defined by _VehicleTypeEnum_ and _VehicleTypeEnum2_, [DATEX 2 version 2.3](http://d2docs.ndwcloud.nu/_static/umlmodel/v2.3/index.htm)",
                "enum": [
                  "agriculturalVehicle",
                  "ambulance",
                  "articulatedVehicle",
                  "autorickshaw",
                  "bicycle",
                  "binTrolley",
                  "BRT bus",
                  "BRT minibus",
                  "bus",
                  "car",
                  "caravan",
                  "carOrLightVehicle",
                  "carWithCaravan",
                  "carWithTrailer",
                  "cleaningTrolley",
                  "compactor",
                  "constructionOrMaintenanceVehicle",
                  "dumper",
                  "e-moped",
                  "e-scooter",
                  "e-motorcycle",
                  "fire tender",
                  "fourWheelDrive",
                  "highSidedVehicle",
                  "hopper",
                  "lorry",
                  "minibus",
                  "moped",
                  "motorcycle",
                  "motorcycleWithSideCar",
                  "motorscooter",
                  "police van",
                  "sweepingMachine",
                  "tanker",
                  "tempo",
                  "threeWheeledVehicle",
                  "tipper",
                  "trailer",
                  "tram",
                  "twoWheeledVehicle",
                  "trolley",
                  "van"
                ]
              },
              "observationDateTime": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Last reported time of observation"
              },
              "id": {
                "anyOf": [
                  {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 256,
                    "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                    "description": "Property. Identifier format of any NGSI entity"
                  },
                  {
                    "type": "string",
                    "format": "uri",
                    "description": "Property. Identifier format of any NGSI entity"
                  }
                ],
                "description": "Property. Unique identifier of the entity"
              },
              "dateCreated": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Entity creation timestamp. This will usually be allocated by the storage platform"
              },
              "dateModified": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Timestamp of the last modification of the entity. This will usually be allocated by the storage platform"
              },
              "source": {
                "type": "string",
                "description": "Property. A sequence of characters giving the original source of the entity data as a URL. Recommended to be the fully qualified domain name of the source provider, or the URL to the source object"
              },
              "name": {
                "type": "string",
                "description": "Property. The name of this item"
              },
              "alternateName": {
                "type": "string",
                "description": "Property. An alternative name for this item"
              },
              "description": {
                "type": "string",
                "description": "Property. A description of this item"
              },
              "dataProvider": {
                "type": "string",
                "description": "Property. A sequence of characters identifying the provider of the harmonised data entity"
              },
              "owner": {
                "type": "array",
                "description": "Property. A List containing a JSON encoded sequence of characters referencing the unique Ids of the owner(s)",
                "items": {
                  "anyOf": [
                    {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 256,
                      "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                      "description": "Property. Identifier format of any NGSI entity"
                    },
                    {
                      "type": "string",
                      "format": "uri",
                      "description": "Property. Identifier format of any NGSI entity"
                    }
                  ],
                  "description": "Property. Unique identifier of the entity"
                }
              },
              "seeAlso": {
                "oneOf": [
                  {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                      "type": "string",
                      "format": "uri"
                    }
                  },
                  {
                    "type": "string",
                    "format": "uri"
                  }
                ],
                "description": "Property. list of uri pointing to additional resources about the item"
              },
              "location": {
                "oneOf": [
                  {
                    "title": "GeoJSON Point",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. Point",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "Point"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "minItems": 2,
                        "items": {
                          "type": "number"
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON LineString",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. LineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "LineString"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "minItems": 2,
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "number"
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON Polygon",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. Polygon",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "Polygon"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 4,
                          "items": {
                            "type": "array",
                            "minItems": 2,
                            "items": {
                              "type": "number"
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiPoint",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiPoint",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiPoint"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "number"
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiLineString",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiLineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiLineString"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "minItems": 2,
                          "items": {
                            "type": "array",
                            "minItems": 2,
                            "items": {
                              "type": "number"
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  },
                  {
                    "title": "GeoJSON MultiPolygon",
                    "type": "object",
                    "required": [
                      "type",
                      "coordinates"
                    ],
                    "description": "GeoProperty. Geojson reference to the item. MultiLineString",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "MultiPolygon"
                        ]
                      },
                      "coordinates": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "minItems": 4,
                            "items": {
                              "type": "array",
                              "minItems": 2,
                              "items": {
                                "type": "number"
                              }
                            }
                          }
                        }
                      },
                      "bbox": {
                        "type": "array",
                        "minItems": 4,
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  }
                ],
                "description": "GeoProperty. Geojson reference to the item. It can be Point, LineString, Polygon, MultiPoint, MultiLineString or MultiPolygon"
              },
              "address": {
                "type": "object",
                "description": "Property. The mailing address. Model:'https://schema.org/address'",
                "properties": {
                  "streetAddress": {
                    "type": "string",
                    "description": "Property. The street address. Model:'https://schema.org/streetAddress'"
                  },
                  "addressLocality": {
                    "type": "string",
                    "description": "Property. The locality in which the street address is, and which is in the region. Model:'https://schema.org/addressLocality'"
                  },
                  "addressRegion": {
                    "type": "string",
                    "description": "Property. The region in which the locality is, and which is in the country. Model:'https://schema.org/addressRegion'"
                  },
                  "addressCountry": {
                    "type": "string",
                    "description": "Property. The country. For example, Spain. Model:'https://schema.org/addressCountry'"
                  },
                  "postalCode": {
                    "type": "string",
                    "description": "Property. The postal code. For example, 24004. Model:'https://schema.org/https://schema.org/postalCode'"
                  },
                  "postOfficeBoxNumber": {
                    "type": "string",
                    "description": "Property. The post office box number for PO box addresses. For example, 03578. Model:'https://schema.org/postOfficeBoxNumber'"
                  },
                  "streetNr": {
                    "type": "string",
                    "description": "Property. Number identifying a specific property on a public street"
                  },
                  "district": {
                    "type": "string",
                    "description": "Property. A district is a type of administrative division that, in some countries, is managed by the local government"
                  }
                }
              },
              "areaServed": {
                "type": "string",
                "description": "Property. The geographic area where a service or offered item is provided. Model:'https://schema.org/Text'"
              }
            }
          }
        ],
        "required": [
          "id",
          "type",
          "socketType",
          "capacity",
          "allowedVehicleType"
        ]
      }
    }
  ],
  maps: [
    {
      "_id": "65ec2c4ff62822a2e6d9b68c",
      "name": "DCAT-AP_Dataset",
      "description": "final version",
      "map": {
        "type": "static:Dataset",
        "id": "id",
        "datasetDescription": [
          "datasetDescription"
        ],
        "title": [
          "title"
        ],
        "contactPoint": "contactPoint",
        "belongsToCatalogue": "",
        "datasetDistribution": "datasetDistribution",
        "keyword": "keyword",
        "publisher": "publisher",
        "spatial": "spatial",
        "temporal": "",
        "theme": "theme",
        "accessRights": "",
        "creator": "",
        "conformsTo": "",
        "page": "",
        "accrualPeriodicity": "",
        "hasVersion": "",
        "identifier": "",
        "isReferencedBy": "",
        "isVersionOf": "",
        "landingPage": "",
        "language": "",
        "otherIdentifier": "",
        "provenance": "",
        "qualifiedAttribution": "",
        "qualifiedRelation": "",
        "relation": "",
        "issued": "",
        "sample": "",
        "source": "",
        "spatialResolutionInMeters": "",
        "Type": "",
        "modified": "",
        "versionNotes": "versionNotes",
        "wasGeneratedBy": "",
        "entitySourceId": "id",
        "targetDataModel": "DataModelTemp",
        "version": "version"
      },
      "dataModel": {
        "dollarschema": "http://json-schema.org/schema#",
        "dollarschemaVersion": "2.0.1",
        "title": "Dataset DCAT-AP 2.1.1 schema",
        "description": "Dataset Schema meeting DCAT-AP 2.1.1 specification",
        "type": "object",
        "allOf": [
          {
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "Dataset"
                ],
                "description": "Property. NGSI type. It has to be Dataset"
              },
              "id": {
                "dollarref": "https://smart-data-models.github.io/data-models/common-schema.json#/definitions/GSMA-Commons/properties/id"
              },
              "datasetDescription": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a free-text account of the Dataset. This property can be repeated for parallel language versions of the description",
                "items": {
                  "type": "string",
                  "description": "Property. Every description in a language"
                }
              },
              "title": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a name given to the Dataset. This property can be repeated for parallel language versions of the name",
                "items": {
                  "type": "string",
                  "description": "Property. Every title in a language"
                }
              },
              "contactPoint": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2006/vcard/ns#Kind'. This property contains contact information that can be used for sending comments about the Dataset",
                "items": {
                  "type": "string",
                  "description": "Property. Every contact element"
                }
              },
              "belongsToCatalogue": {
                "description": "Relationship. It links the Dataset to its parent Catalogue. Model:'https://www.w3.org/ns/dcat#Catalogue'. Note: this attribute does not belong to the current version of DCAT-AP, 2.1.1",
                "anyOf": [
                  {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 256,
                    "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                    "description": "Property. Link to the catalogue"
                  },
                  {
                    "type": "string",
                    "format": "uri",
                    "description": "Property. Link to the catalogue"
                  }
                ]
              },
              "datasetDistribution": {
                "type": "array",
                "description": "Relationship. This property links the Dataset to an available Distribution. Model:'http://www.w3.org/ns/dcat#Distribution'",
                "items": {
                  "anyOf": [
                    {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 256,
                      "pattern": "^[\\w\\-\\.\\{\\}\\$\\+\\*\\[\\]`|~^@!,:\\\\]+$",
                      "description": "Property. Every link to a distribution"
                    },
                    {
                      "type": "string",
                      "format": "uri",
                      "description": "Property. Every link to a distribution"
                    }
                  ]
                }
              },
              "keyword": {
                "type": "array",
                "description": "Property. This property contains a keyword or tag, describing the Dataset. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'",
                "items": {
                  "type": "string",
                  "description": "Property. Every keyword tag included"
                }
              },
              "publisher": {
                "description": "Property. Model:'http://xmlns.com/foaf/0.1/Agent'. This property refers to an entity (organisation) responsible for making the Dataset available",
                "type": "string"
              },
              "spatial": {
                "description": "GeoProperty. Model:'http://purl.org/dc/terms/Location'. This property refers to a geographic region that is covered by the Dataset",
                "type": "array",
                "items": {
                  "dollarref": "https://smart-data-models.github.io/data-models/common-schema.json#/definitions/Location-Commons/properties/location",
                  "description": "Property. Every location included"
                }
              },
              "temporal": {
                "description": "Property. This property refers to a temporal period that the Dataset covers. Model:'http://purl.org/dc/terms/PeriodOfTime'",
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Property. Every temporal period included"
                }
              },
              "theme": {
                "description": "Property. Model:'http://www.w3.org/2004/02/skos/core#Concept'. This property refers to a category of the Dataset. A Dataset may be associated with multiple themes",
                "type": "array",
                "items": {
                  "type": "string",
                  "description": "Property. Every theme included"
                }
              },
              "accessRights": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/RightsStatement'. This property refers to information that indicates whether the Dataset is open data, has access restrictions or is not public"
              },
              "creator": {
                "type": "array",
                "description": "Property. Model:'http://xmlns.com/foaf/0.1/Agent'. This property refers to the entity primarily responsible for producing the dataset",
                "items": {
                  "type": "string",
                  "description": "Property. Every creator included"
                }
              },
              "conformsTo": {
                "type": "array",
                "description": "Property. Model:'http://purl.org/dc/terms/Standard'. This property refers to an implementing rule or other specification. ",
                "items": {
                  "type": "string",
                  "description": "Property. Every rule or specification applicable"
                }
              },
              "page": {
                "description": "Property. Model:'http://xmlns.com/foaf/0.1/Document'. This property refers to a page or document about this Dataset. ",
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every page or document"
                }
              },
              "accrualPeriodicity": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/Frequency'. This property refers to the frequency at which the Dataset is updated"
              },
              "hasVersion": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#Dataset'. This property refers to a related Dataset that is a version, edition, or adaptation of the described Dataset",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every version of the related datasets"
                }
              },
              "identifier": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the main identifier for the Dataset, e.g. the URI or other unique identifier in the context of the Catalogue",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every identifier of the dataset"
                }
              },
              "isReferencedBy": {
                "type": "array",
                "description": "Relationship. Model:'http://www.w3.org/2000/01/rdf-schema#Resource'. This property is about a related resource, such as a publication, that references, cites, or otherwise points to the dataset",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every resource related to the dataset"
                }
              },
              "isVersionOf": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#Dataset'. This property refers to a related Dataset of which the described Dataset is a version, edition, or adaptation",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every dataset that the current dataset is a version of it"
                }
              },
              "landingPage": {
                "description": "Property. Model:'http://xmlns.com/foaf/0.1/Document'. This property refers to a web page that provides access to the Dataset, its Distributions and/or additional information. It is intended to point to a landing page at the original data provider, not to a page on a site of a third party, such as an aggregator",
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every web page listed"
                }
              },
              "language": {
                "type": "array",
                "description": "Property. Model:'http://purl.org/dc/terms/LinguisticSystem'. This property refers to a language of the Dataset. This property can be repeated if there are multiple languages in the Dataset",
                "items": {
                  "type": "string",
                  "description": "Property. Every language included"
                }
              },
              "otherIdentifier": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/adms#Identifier'. This property refers to a secondary identifier of the Dataset, such as MAST/ADS, DataCite, DOI, EZID or W3ID",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every additional identifier included"
                }
              },
              "provenance": {
                "type": "array",
                "description": "Property. Model:'http://purl.org/dc/terms/ProvenanceStatement'. This property contains a statement about the lineage of a Dataset",
                "items": {
                  "type": "string",
                  "description": "Property. Every lineage associated to the dataset"
                }
              },
              "qualifiedAttribution": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#Relationship'. This property refers to a link to an Agent having some form of responsibility for the resource",
                "items": {
                  "type": "string",
                  "description": "Property. Every attribution included"
                }
              },
              "qualifiedRelation": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#Relationship'. This property provides a link to a description of a relationship with another resource",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every qualified relation included"
                }
              },
              "relation": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Resource'. This property refers to a related resource",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every related resource included"
                }
              },
              "issued": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the date of formal issuance (e.g., publication) of the Dataset",
                "format": "date-time"
              },
              "sample": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#Distribution'. This property refers to a sample distribution of the dataset",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every sample included with the dataset"
                }
              },
              "source": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#Dataset'. This property refers to a related Dataset from which the described Dataset is derived",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "description": "Property. Every dataset which is a source of the current dataset"
                }
              },
              "spatialResolutionInMeters": {
                "type": "number",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property refers to the minimum spatial separation resolvable in a dataset, measured in meters"
              },
              "Type": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2004/02/skos/core#Concept'. This property refers to the type of the Dataset. A recommended controlled vocabulary data-type is foreseen"
              },
              "modified": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the most recent date on which the Dataset was changed or modified"
              },
              "version": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a version number or other version designation of the Dataset"
              },
              "versionNotes": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a description of the differences between this version and a previous version of the Dataset. This property can be repeated for parallel language versions of the version notes",
                "items": {
                  "type": "string",
                  "description": "Property. Every language description of the version notes"
                }
              },
              "wasGeneratedBy": {
                "type": "array",
                "description": "Property. Model:'https://www.w3.org/ns/prov#Activity'. This property refers to an activity that generated, or provides the business context for, the creation of the dataset",
                "items": {
                  "type": "string",
                  "description": "Property. Every activity included"
                }
              }
            }
          }
        ],
        "required": [
          "type"
        ]
      },
      "sourceDataType": "json",
      "sourceData": [
        {
          "id": "Dataset_DMM",
          "title": "Class skill deal there no language himself. After rule mouth tell economy risk. Glass personal person center.",
          "datasetDescription": [
            "Sit worry pay during TV increase family. Social drop organization method. Fact treatment throw detail.",
            "Experience similar officer social us item lay prepare. Price year close better."
          ],
          "description": "Own fast suffer your. Spend per police. Less skill much run letter shoulder know office. Discuss of director enter process world possible out.",
          "name": "First table field check. Agency writer size. Meeting nice nothing after ever.",
          "publisher": "Statement which consumer product thought total. Nothing concern picture involve paper nor kid.",
          "landingPage": {
            "value": "https://ngsi-broker.dev.ecosystem-urbanage.eu/swagger-ui/index.html#/dcat-ap-controller/createDcatAp"
          },
          "spatial": [
            {
              "type": "Point",
              "coordinates": [
                109.478534,
                9.922458
              ]
            }
          ],
          "releaseDate": "1983-07-16T12:51:26Z",
          "theme": [
            "Win catch job number find number. Leader reason top arrive night. Movement expect security high hair whom three yeah.",
            "Respond character continue gun. Grow best choice group manage over find."
          ],
          "contactPoint": [
            "Minute write his experience similar right.",
            "Experience away remain."
          ],
          "keyword": [
            "Free analysis reduce. Owner Republican institution six science a usually. Value land executive design.",
            "Bag recently might far plan nearly scene example. Trouble official dream author job claim join different. Success full debate here check attorney size."
          ],
          "accessRights": "non-public",
          "frequency": "Case fine feel that. Government executive issue police chance believe.",
          "datasetDistribution": [
            "KJVK:30944452"
          ],
          "creator": "Wall true factor several nothing. Mission want kind design. Who cause health father director either cause.",
          "version": "Financial role together range. Nice government first policy daughter need kind. Employee source nature add rest human station. Ability management test during foot that course nothing.",
          "versionNotes": [
            "Sort language ball floor. Your majority feeling fact by four two.",
            "Natural explain before something first drug contain start. Party prevent live."
          ]
        }
      ],
      "config": {
        "NGSI_entity": true,
        "ignoreValidation": false,
        "mappingReport": true,
        "targetDataModel": "Data Model name, according to the related Schema contained in the DataModels folder",
        "rowStart": 0,
        "rowEnd": 1000,
        "delimiter": ";",
        "endLine": "\n",
        "deleteEmptySpaceAtBeginning": true,
        "site": "id",
        "service": "SomeService",
        "group": "Flanders",
        "entityNameField": "entitySourceId",
        "entityDefaultPrefix": "ds"
      },
      "path": ".root$$$",
      "user": "test@hotmail.it"
    },
    {
      "_id": "65ec374ff62822a2e6d9b6be",
      "path": ".root$$$",
      "sourceDataType": "json",
      "config": {
        "NGSI_entity": true,
        "deleteEmptySpaceAtBeginning": true,
        "delimiter": ",",
        "endLine": "\n",
        "entityDefaultPrefix": "",
        "entityNameField": "entitySourceId",
        "ignoreValidation": false,
        "mappingReport": true,
        "rowEnd": 1000,
        "rowStart": 0,
        "service": "",
        "site": "id",
        "targetDataModel": "Data Model name, according to the related Schema contained in the DataModels folder"
      },
      "sourceData": [
        {
          "id": "KJVK:30944452",
          "title": "another distribution",
          "description": "Distribution of open data portals in csv",
          "accessUrl": [
            "https://www.example.com/page.html"
          ],
          "downloadURL": "urn:ngsi-ld:DistributionDCAT-AP:items:ICPI:96947751",
          "format": " text/csv",
          "byteSize": 43503,
          "checksum": "H3FR.",
          "rights": "copyleft",
          "mediaType": "text/csv",
          "license": "CC-BY",
          "releaseDate": "1997-05-06T05:04:10Z",
          "modifiedDate": "1986-03-28T19:56:43Z"
        }
      ],
      "status": "Under development",
      "dataModel": {
        "dollarschema": "http://json-schema.org/schema",
        "dollarschemaVersion": "1.0.1",
        "modelTags": "",
        "title": "Smart Data models DCAT-AP distribution of a Dataset, according to DCAT-AP 2.1.1",
        "description": "This is a distribution belonging ot a dataset according to the DCAT-AP standard 2.1.1",
        "type": "object",
        "required": [
          "accessURL",
          "id",
          "type"
        ],
        "allOf": [
          {
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "DistributionDCAT-AP"
                ],
                "description": "Property. NGSI entity type. It has to be DistributionDCAT-AP"
              },
              "id": {
                "dollarref": "https://smart-data-models.github.io/data-models/common-schema.json#/definitions/GSMA-Commons/properties/id"
              },
              "accessURL": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Resource'. This property contains a URL that gives access to a Distribution of the Dataset. The resource at the access URL may contain information about how to get the Dataset",
                "items": {
                  "type": "string",
                  "minItems": 1
                }
              },
              "availability": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2004/02/skos/core#Concept'. This property indicates how long it is planned to keep the Distributio of the Dataset available"
              },
              "description": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a free-text account of the Distribution. This property can be repeated for parallel language versions of the description"
              },
              "format": {
                "type": "string",
                "description": "Property. Model:'https://schema.org/Text'. This property refers to the file format of the Distribution"
              },
              "license": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/LicenseDocument'. This property refers to a data service that gives access to the distribution of the dataset"
              },
              "accessService": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/ns/dcat#DataService'. This property refers to a data service that gives access to the distribution of the dataset",
                "items": {
                  "type": "string",
                  "description": "Property. Every Data service providing access to the distribution"
                }
              },
              "byteSize": {
                "type": "number",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the size of a Distribution in bytes"
              },
              "checksum": {
                "type": "string",
                "description": "Property. Model:'http://spdx.org/rdf/terms#Checksum'. This property provides a mechanism that can be used to verify that the contents of a distribution have not changed. The checksum is related to the downloadURL"
              },
              "compressFormat": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/MediaType'. This property refers to the format of the file in which the data is contained in a compressed form, e.g. to reduce the size of the downloadable file. It SHOULD be expressed using a media type as defined in the official register of media types managed by IANA"
              },
              "page": {
                "type": "array",
                "description": "Property. Model:'http://xmlns.com/foaf/0.1/#term_Document'. This property refers to a page or document about this Distribution",
                "items": {
                  "type": "string",
                  "description": "Property. Every page providing information about the distribution"
                }
              },
              "downloadURL": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Resource'. This property contains a URL that is a direct link to a downloadable file in a given format"
              },
              "hasPolicy": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/ns/odrl/2/hasPolicy'. This property refers to the policy expressing the rights associated with the distribution if using the ODRL vocabulary"
              },
              "language": {
                "type": "array",
                "description": "Property. Model:'http://purl.org/dc/terms/LinguisticSystem'. This property refers to a language used in the Distribution. This property can be repeated if the metadata is provided in multiple languages",
                "items": {
                  "type": "string",
                  "description": "Property. Every language included"
                }
              },
              "conformsTo": {
                "type": "array",
                "description": "Property. Model:'http://purl.org/dc/terms/Standard'. This property refers to an established schema to which the described Distribution conforms",
                "items": {
                  "type": "string",
                  "description": "Property. Every rule o standard the distribution complies with"
                }
              },
              "mediaType": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/MediaType'. This property refers to the media type of the Distribution as defined in the official register of media types managed by IANA"
              },
              "packageFormat": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/MediaType'. This property refers to the format of the file in which one or more data files are grouped together, e.g. to enable a set of related files to be downloaded together. It SHOULD be expressed using a media type as defined in the official register of media types managed by IANA"
              },
              "issued": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the date of formal issuance (e.g., publication) of the Distribution"
              },
              "rights": {
                "type": "string",
                "description": "Property. Model:'http://purl.org/dc/terms/RightsStatement'. This property refers to a statement that specifies rights associated with the Distribution"
              },
              "spatialResolutionInMeters": {
                "type": "array",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property refers to the minimum spatial separation resolvable in a distribution, measured in meters"
              },
              "status": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2004/02/skos/core#Concept'. This property refers to the maturity of the Distribution. It MUST take one of the values Completed, Deprecated, Under Development, Withdrawn",
                "enum": [
                  "Completed",
                  "Deprecated",
                  "Under Development",
                  "Withdrawn"
                ]
              },
              "title": {
                "type": "string",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains a name given to the Distribution. This property can be repeated for parallel language versions of the description"
              },
              "modifiedDate": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the most recent date on which the Distribution was changed or modified"
              },
              "releaseDate": {
                "type": "string",
                "format": "date-time",
                "description": "Property. Model:'http://www.w3.org/2000/01/rdf-schema#Literal'. This property contains the most initial date on which the Distribution was created"
              }
            }
          }
        ]
      },
      "map": {
        "accessService": "",
        "accessURL": "accessUrl",
        "availability": "",
        "byteSize": "byteSize",
        "checksum": "checksum",
        "compressFormat": "",
        "conformsTo": "",
        "description": "description",
        "downloadURL": "downloadURL",
        "entitySourceId": "id",
        "format": "format",
        "hasPolicy": "",
        "id": "id",
        "issued": "",
        "language": "",
        "license": "license",
        "mediaType": "mediaType",
        "modifiedDate": "modifiedDate",
        "packageFormat": "",
        "page": "",
        "releaseDate": "releaseDate",
        "rights": "rights",
        "spatialResolutionInMeters": "",
        "status": "",
        "targetDataModel": "DataModelTemp",
        "title": [
          "title"
        ],
        "type": "static:DistributionDCAT-AP"
      },
      "name": "DistributionDCAT-AP_v1.0",
      "user": "test@hotmail.it"
    },
    {
      "_id": "6602a72d10b4cf992b6b2786",
      "sourceDataType": "json",
      "config": {
        "NGSI_entity": true,
        "ignoreValidation": false,
        "mappingReport": false,
        "targetDataModel": "Data Model name, according to the related Schema contained in the DataModels folder",
        "rowStart": 0,
        "rowEnd": 1000,
        "delimiter": ",",
        "endLine": "\n",
        "deleteEmptySpaceAtBeginning": true,
        "site": "SomeRZ",
        "service": "SomeService",
        "group": "CSV",
        "entityNameField": "entitySourceId",
        "entityDefaultPrefix": "ds"
      },
      "dataModelID": "6602a72d10b4cf992b6b278a",
      "sourceDataID": "6602a72d10b4cf992b6b2790",
      "description": "26/03/2024 updated",
      "status": "Completed",
      "map": {
        "e": "a",
        "f": "a",
        "targetDataModel": "DataModelTemp",
        "entitySourceId": "a",
        "type": "a"
      },
      "name": "Test deploy ",
      "user": "test@hotmail.it"
    },
    {
      "_id": "66054e1866b06d9dfa1911fd",
      "sourceDataType": "csv",
      "config": {
        "NGSI_entity": true,
        "ignoreValidation": true,
        "mappingReport": true,
        "targetDataModel": "Data Model name, according to the related Schema contained in the DataModels folder",
        "rowStart": 0,
        "rowEnd": 1000,
        "delimiter": ",",
        "endLine": "\n",
        "deleteEmptySpaceAtBeginning": true,
        "site": "SomeRZ",
        "service": "SomeService",
        "group": "CSV",
        "entityNameField": "entitySourceId",
        "entityDefaultPrefix": "ds",
        "minioWriter": {
          "defaultBucketName": "data model mapper",
          "defaultOutputBucketName": "data model mapper",
          "subscribe": {
            "all": false,
            "buckets": []
          }
        }
      },
      "dataModelID": "66054e1866b06d9dfa191201",
      "sourceDataID": "66054e1866b06d9dfa191207",
      "description": "created by Gabriele",
      "status": "Under development",
      "map": {
        "type": "static:BikeLane",
        "laneOccupancy": " properties__laneOccupancy_",
        "laneLength": " properties__laneLength_",
        "laneWidth": " properties__laneWidth_",
        "dateObserved": " properties__dateObserved_",
        "id": "id_",
        "dateCreated": "",
        "dateModified": "",
        "source": "",
        "name": "",
        "alternateName": "",
        "description": "",
        "dataProvider": "",
        "owner": "",
        "seeAlso": "",
        "location": [
          "",
          ""
        ],
        "areaServed": "",
        "entitySourceId": "id_",
        "targetDataModel": "DataModelTemp"
      },
      "name": "Bike lane",
      "user": "test@hotmail.it"
    },
    {
      "_id": "660d79cc9f72b2a39bb99e97",
      "sourceDataType": "json",
      "config": {
        "NGSI_entity": true,
        "ignoreValidation": false,
        "mappingReport": false,
        "targetDataModel": "Data Model name, according to the related Schema contained in the DataModels folder",
        "rowStart": 0,
        "rowEnd": 1000,
        "delimiter": ",",
        "endLine": "\n",
        "deleteEmptySpaceAtBeginning": true,
        "site": "SomeRZ",
        "service": "SomeService",
        "group": "CSV",
        "entityNameField": "entitySourceId",
        "entityDefaultPrefix": "ds"
      },
      "dataModelID": "660d79cc9f72b2a39bb99e9b",
      "sourceDataID": "660d79cc9f72b2a39bb99ea1",
      "status": "Under development",
      "map": {
        "e": "a",
        "f": "a",
        "targetDataModel": "DataModelTemp",
        "entitySourceId": "a",
        "type": "a"
      },
      "name": "Test deploy 03-04-2024",
      "user": "test@hotmail.it"
    },
    {
      "_id": "661d427c5917f8749810adf9",
      "user": "test@hotmail.it",
      "sourceDataType": "csv",
      "config": {
        "NGSI_entity": true,
        "ignoreValidation": true,
        "mappingReport": true,
        "targetDataModel": "Data Model name, according to the related Schema contained in the DataModels folder",
        "rowStart": 0,
        "rowEnd": 1000,
        "delimiter": ",",
        "endLine": "\n",
        "deleteEmptySpaceAtBeginning": true,
        "site": "SomeRZ",
        "service": "SomeService",
        "group": "CSV",
        "entityNameField": "entitySourceId",
        "entityDefaultPrefix": "ds"
      },
      "dataModelID": "661d4dbabbd46848a7061033",
      "description": "EVChargingStation",
      "status": "Completed",
      "map": {
        "type": " \"type_\"",
        "capacity": " \"capacity__value_\"",
        "socketNumber": "",
        "availableCapacity": "",
        "allowedVehicleType": " \"allowedVehicleType__type_\"",
        "socketType": " \"socketType__type_\"",
        "openingHours": "",
        "status": "",
        "network": "",
        "operator": "",
        "contactPoint": {
          "contactType": "",
          "email": "",
          "telephone": "",
          "name": "",
          "url": "",
          "areaServed": "",
          "availableLanguage": "",
          "contactOption": "",
          "faxNumber": "",
          "productSupported": "",
          "availabilityRestriction": "",
          "targetDataModel": "DataModelTemp"
        },
        "amperage": "",
        "voltage": "",
        "chargeType": "",
        "acceptedPaymentMethod": "",
        "dataDescriptor": "",
        "powerConsumption": "",
        "chargingUnitId": "",
        "transactionId": "",
        "transactionType": "",
        "stationName": "",
        "amountCollected": "",
        "taxAmountCollected": "",
        "endDateTime": "",
        "startDateTime": "",
        "vehicleType": "",
        "observationDateTime": "",
        "id": "\"id_\"",
        "dateCreated": "",
        "dateModified": "",
        "source": "",
        "name": "",
        "alternateName": "",
        "description": "",
        "dataProvider": "",
        "owner": "",
        "seeAlso": "",
        "location": "",
        "address": {
          "streetAddress": "",
          "addressLocality": "",
          "addressRegion": "",
          "addressCountry": "",
          "postalCode": "",
          "postOfficeBoxNumber": "",
          "streetNr": "",
          "district": "",
          "targetDataModel": "DataModelTemp"
        },
        "areaServed": "",
        "targetDataModel": "DataModelTemp",
        "entitySourceId": "\"id_\""
      },
      "name": "Smart data model "
    },
    {
      "_id": "661e262abbd46848a706104f",
      "user": "test@hotmail.it",
      "sourceDataType": "csv",
      "config": {
        "NGSI_entity": true,
        "ignoreValidation": false,
        "mappingReport": true,
        "disableAjv": true,
        "targetDataModel": "Data Model name, according to the related Schema contained in the DataModels folder",
        "rowStart": 0,
        "rowEnd": 1000,
        "delimiter": ",",
        "endLine": "\n",
        "deleteEmptySpaceAtBeginning": true,
        "site": "SmartDataModel",
        "service": "Transportation",
        "group": "EV",
        "entityNameField": "entitySourceId",
        "entityDefaultPrefix": "ds",
        "idSite": "SomeRZ",
        "idService": "SomeService",
        "idGroup": "CSV"
      },
      "dataModelID": "661e262abbd46848a7061053",
      "description": "Smart Data Model - Transportation",
      "status": "Completed",
      "map": {
        "entitySourceId": "\"id_\"",
        "targetDataModel": "DataModelTemp",
        "type": " \"type_\"",
        "capacity": " \"capacity__value_\"",
        "socketNumber": " \"socketType__value__0_\"",
        "availableCapacity": "",
        "allowedVehicleType": " \"allowedVehicleType__type_\"",
        "socketType": " \"socketType__type_\"",
        "openingHours": "",
        "status": "",
        "network": "",
        "operator": "",
        "contactPoint": {
          "contactType": "",
          "email": "",
          "telephone": "",
          "name": "",
          "url": "",
          "areaServed": "",
          "availableLanguage": "",
          "contactOption": "",
          "faxNumber": "",
          "productSupported": "",
          "availabilityRestriction": ""
        },
        "amperage": "",
        "voltage": "",
        "chargeType": "",
        "acceptedPaymentMethod": "",
        "dataDescriptor": "",
        "powerConsumption": "",
        "chargingUnitId": "",
        "transactionId": "",
        "transactionType": "",
        "stationName": "",
        "amountCollected": "",
        "taxAmountCollected": "",
        "endDateTime": "",
        "startDateTime": "",
        "vehicleType": "",
        "observationDateTime": "",
        "id": "",
        "dateCreated": "",
        "dateModified": "",
        "source": "",
        "name": "",
        "alternateName": "",
        "description": "",
        "dataProvider": "",
        "owner": "",
        "seeAlso": "",
        "location": "",
        "address": {
          "streetAddress": "",
          "addressLocality": "",
          "addressRegion": "",
          "addressCountry": "",
          "postalCode": "",
          "postOfficeBoxNumber": "",
          "streetNr": "",
          "district": ""
        },
        "areaServed": ""
      },
      "name": "EVChargingStation"
    },
    {
      "_id": "661e2970bbd46848a7061065",
      "user": "test@hotmail.it",
      "sourceDataType": "csv",
      "config": {
        "NGSI_entity": true,
        "ignoreValidation": false,
        "mappingReport": true,
        "disableAjv": true,
        "targetDataModel": "Data Model name, according to the related Schema contained in the DataModels folder",
        "rowStart": 0,
        "rowEnd": 1000,
        "delimiter": ",",
        "endLine": "\n",
        "deleteEmptySpaceAtBeginning": true,
        "site": "SmartDataModel",
        "service": "Transportation",
        "group": "BikeLane",
        "entityNameField": "entitySourceId",
        "entityDefaultPrefix": "ds",
        "idSite": "SomeRZ",
        "idService": "SomeService",
        "idGroup": "CSV"
      },
      "dataModelID": "661e2970bbd46848a7061069",
      "description": "Smart data models - Transportation",
      "status": "Completed",
      "map": {
        "entitySourceId": "\"id_\"",
        "targetDataModel": "DataModelTemp",
        "type": " \"type_\"",
        "laneOccupancy": " \"laneOccupancy__value_\"",
        "laneLength": " \"laneLength__value_\"",
        "laneWidth": " \"laneWidth__value_\"",
        "dateObserved": "",
        "id": "",
        "dateCreated": "",
        "dateModified": "",
        "source": "",
        "name": "",
        "alternateName": "",
        "description": "",
        "dataProvider": "",
        "owner": "",
        "seeAlso": "",
        "location": "",
        "address": {
          "streetAddress": "",
          "addressLocality": "",
          "addressRegion": "",
          "addressCountry": "",
          "postalCode": "",
          "postOfficeBoxNumber": "",
          "streetNr": "",
          "district": ""
        },
        "areaServed": ""
      },
      "name": "BikeLaneTransportation"
    },
    {
      "_id": "661e2daebbd46848a70610a4",
      "user": "test@hotmail.it",
      "sourceDataType": "json",
      "config": {
        "NGSI_entity": true,
        "ignoreValidation": false,
        "mappingReport": true,
        "disableAjv": true,
        "targetDataModel": "Data Model name, according to the related Schema contained in the DataModels folder",
        "rowStart": 0,
        "rowEnd": 1000,
        "delimiter": ",",
        "endLine": "\n",
        "deleteEmptySpaceAtBeginning": true,
        "site": "SmartDataModel",
        "service": "DCATAP",
        "group": "Dataset",
        "entityNameField": "entitySourceId",
        "entityDefaultPrefix": "ds",
        "idSite": "SomeRZ",
        "idService": "SomeService",
        "idGroup": "CSV"
      },
      "dataModelID": "661e2daebbd46848a70610a8",
      "sourceDataID": "661e2dafbbd46848a70610ae",
      "description": "Smart data model - DCATAP",
      "status": "Completed",
      "map": {
        "entitySourceId": "id",
        "targetDataModel": "DataModelTemp",
        "type": "type",
        "id": "",
        "datasetDescription": "datasetDescription",
        "title": "title",
        "contactPoint": "",
        "belongsToCatalogue": "",
        "datasetDistribution": "",
        "keyword": "",
        "publisher": "",
        "spatial": "",
        "temporal": "",
        "theme": "",
        "accessRights": "",
        "creator": "",
        "conformsTo": "",
        "page": "",
        "accrualPeriodicity": "",
        "hasVersion": "",
        "identifier": "",
        "isReferencedBy": "",
        "isVersionOf": "",
        "landingPage": "",
        "language": "",
        "otherIdentifier": "",
        "provenance": "",
        "qualifiedAttribution": "",
        "qualifiedRelation": "",
        "relation": "",
        "issued": "",
        "sample": "",
        "source": "",
        "spatialResolutionInMeters": "",
        "Type": "",
        "modified": "",
        "version": "",
        "versionNotes": "",
        "wasGeneratedBy": ""
      },
      "name": "DatasetDCATAP"
    },
    {
      "_id": "661e4deabbd46848a70610c5",
      "user": "test@hotmail.it",
      "sourceDataType": "csv",
      "config": {
        "NGSI_entity": true,
        "ignoreValidation": false,
        "mappingReport": true,
        "disableAjv": true,
        "targetDataModel": "Data Model name, according to the related Schema contained in the DataModels folder",
        "rowStart": 0,
        "rowEnd": 1000,
        "delimiter": ",",
        "endLine": "\n",
        "deleteEmptySpaceAtBeginning": true,
        "site": "SmartDataModels",
        "service": "Transportation",
        "group": "EVChargingStation",
        "entityNameField": "entitySourceId",
        "entityDefaultPrefix": "ds",
        "idSite": "SomeRZ",
        "idService": "SomeService",
        "idGroup": "CSV"
      },
      "dataModelID": "661e4deabbd46848a70610c9",
      "description": "Smart data model-TransportationEV",
      "status": "Completed",
      "map": {
        "entitySourceId": "\"id_\"",
        "targetDataModel": "DataModelTemp",
        "type": " \"type_\"",
        "capacity": " \"capacity__value_\"",
        "socketNumber": "",
        "availableCapacity": "",
        "allowedVehicleType": " \"allowedVehicleType__value__0_\"",
        "socketType": " \"socketType__value__0_\"",
        "openingHours": "",
        "status": "",
        "network": "",
        "operator": "",
        "contactPoint": {
          "contactType": "",
          "email": "",
          "telephone": "",
          "name": "",
          "url": "",
          "areaServed": "",
          "availableLanguage": "",
          "contactOption": "",
          "faxNumber": "",
          "productSupported": "",
          "availabilityRestriction": ""
        },
        "amperage": "",
        "voltage": "",
        "chargeType": "",
        "acceptedPaymentMethod": "",
        "dataDescriptor": "",
        "powerConsumption": "",
        "chargingUnitId": "",
        "transactionId": "",
        "transactionType": "",
        "stationName": "",
        "amountCollected": "",
        "taxAmountCollected": "",
        "endDateTime": "",
        "startDateTime": "",
        "vehicleType": "",
        "observationDateTime": "",
        "id": "",
        "dateCreated": "",
        "dateModified": "",
        "source": "",
        "name": "",
        "alternateName": "",
        "description": "",
        "dataProvider": "",
        "owner": "",
        "seeAlso": "",
        "location": "",
        "address": {
          "streetAddress": "",
          "addressLocality": "",
          "addressRegion": "",
          "addressCountry": "",
          "postalCode": "",
          "postOfficeBoxNumber": "",
          "streetNr": "",
          "district": ""
        },
        "areaServed": ""
      },
      "name": "TransportationEV"
    }
  ],
  sources: [
    {
      "isAlsoReferencedBy": [],
      "_id": "65ec2c4ff62822a2e6d9b68f",
      "name": "DCAT-AP_Dataset",
      "mapRef": "65ec2c4ff62822a2e6d9b68c",
      "source": [
        {
          "id": "Dataset_DMM",
          "title": "Class skill deal there no language himself. After rule mouth tell economy risk. Glass personal person center.",
          "datasetDescription": [
            "Sit worry pay during TV increase family. Social drop organization method. Fact treatment throw detail.",
            "Experience similar officer social us item lay prepare. Price year close better."
          ],
          "description": "Own fast suffer your. Spend per police. Less skill much run letter shoulder know office. Discuss of director enter process world possible out.",
          "name": "First table field check. Agency writer size. Meeting nice nothing after ever.",
          "publisher": "Statement which consumer product thought total. Nothing concern picture involve paper nor kid.",
          "landingPage": {
            "value": "https://ngsi-broker.dev.ecosystem-urbanage.eu/swagger-ui/index.html#/dcat-ap-controller/createDcatAp"
          },
          "spatial": [
            {
              "type": "Point",
              "coordinates": [
                109.478534,
                9.922458
              ]
            }
          ],
          "releaseDate": "1983-07-16T12:51:26Z",
          "theme": [
            "Win catch job number find number. Leader reason top arrive night. Movement expect security high hair whom three yeah.",
            "Respond character continue gun. Grow best choice group manage over find."
          ],
          "contactPoint": [
            "Minute write his experience similar right.",
            "Experience away remain."
          ],
          "keyword": [
            "Free analysis reduce. Owner Republican institution six science a usually. Value land executive design.",
            "Bag recently might far plan nearly scene example. Trouble official dream author job claim join different. Success full debate here check attorney size."
          ],
          "accessRights": "non-public",
          "frequency": "Case fine feel that. Government executive issue police chance believe.",
          "datasetDistribution": [
            "KJVK:30944452"
          ],
          "creator": "Wall true factor several nothing. Mission want kind design. Who cause health father director either cause.",
          "version": "Financial role together range. Nice government first policy daughter need kind. Employee source nature add rest human station. Ability management test during foot that course nothing.",
          "versionNotes": [
            "Sort language ball floor. Your majority feeling fact by four two.",
            "Natural explain before something first drug contain start. Party prevent live."
          ]
        }
      ],
      "path": ".root$$$",
      "user": "test@hotmail.it"
    },
    {
      "isAlsoReferencedBy": [],
      "_id": "65ec3750f62822a2e6d9b6c3",
      "mapRef": "65ec374ff62822a2e6d9b6be",
      "path": ".root$$$",
      "source": [
        {
          "id": "KJVK:30944452",
          "title": "another distribution",
          "description": "Distribution of open data portals in csv",
          "accessUrl": [
            "https://www.example.com/page.html"
          ],
          "downloadURL": "urn:ngsi-ld:DistributionDCAT-AP:items:ICPI:96947751",
          "format": " text/csv",
          "byteSize": 43503,
          "checksum": "H3FR.",
          "rights": "copyleft",
          "mediaType": "text/csv",
          "license": "CC-BY",
          "releaseDate": "1997-05-06T05:04:10Z",
          "modifiedDate": "1986-03-28T19:56:43Z"
        }
      ],
      "name": "DistributionDCAT-AP_v1.0",
      "user": "test@hotmail.it"
    },
    {
      "isAlsoReferencedBy": [],
      "_id": "65ec3859f62822a2e6d9b6c9",
      "name": "DistributionDCAT-AP_v1.0",
      "mapRef": "65ec374ff62822a2e6d9b6be",
      "source": [
        {
          "id": "KJVK:30944452",
          "title": "another distribution",
          "description": "Distribution of open data portals in csv",
          "accessUrl": [
            "https://www.example.com/page.html"
          ],
          "downloadURL": "urn:ngsi-ld:DistributionDCAT-AP:items:ICPI:96947751",
          "format": " text/csv",
          "byteSize": 43503,
          "checksum": "H3FR.",
          "rights": "copyleft",
          "mediaType": "text/csv",
          "license": "CC-BY",
          "releaseDate": "1997-05-06T05:04:10Z",
          "modifiedDate": "1986-03-28T19:56:43Z"
        }
      ],
      "path": ".root$$$",
      "user": "test@hotmail.it"
    },
    {
      "isAlsoReferencedBy": [],
      "_id": "65ec39cff62822a2e6d9b6cf",
      "name": "DistributionDCAT-AP_v1.0",
      "mapRef": "65ec374ff62822a2e6d9b6be",
      "source": [
        {
          "id": "DistributionDCAT-AP:id:KJVK:30944452",
          "title": "another distribution",
          "description": "Distribution of open data portals in csv",
          "accessUrl": [
            "https://www.example.com/page.html"
          ],
          "downloadURL": "urn:ngsi-ld:DistributionDCAT-AP:items:ICPI:96947751",
          "format": " text/csv",
          "byteSize": 43503,
          "checksum": "H3FR.",
          "rights": "copyleft",
          "mediaType": "text/csv",
          "license": "CC-BY",
          "releaseDate": "1997-05-06T05:04:10Z",
          "modifiedDate": "1986-03-28T19:56:43Z"
        }
      ],
      "path": ".root$$$",
      "user": "test@hotmail.it"
    },
    {
      "isAlsoReferencedBy": [],
      "_id": "6602a72d10b4cf992b6b2790",
      "name": "Test deploy ",
      "mapRef": "6602a72d10b4cf992b6b2786",
      "source": [
        {
          "a": "a1",
          "b": {
            "c": "c1"
          }
        },
        {
          "a": "a2",
          "b": {
            "c": "c2"
          }
        },
        {
          "a": "a3",
          "b": {
            "c": "c3"
          }
        }
      ],
      "user": "test@hotmail.it"
    },
    {
      "isAlsoReferencedBy": [],
      "_id": "66054e1866b06d9dfa191207",
      "name": "Bike lane",
      "mapRef": "66054e1866b06d9dfa1911fd",
      "sourceCSV": "\"id_\", \"type_\", \"geometry__coordinates__0_\", \"geometry__coordinates__1_\", \"geometry__type_\", \"properties__@context__0_\", \"properties__@context__1_\", \"properties__type_\", \"properties__dateObserved_\", \"properties__location__coordinates__0_\", \"properties__location__coordinates__1_\", \"properties__location__type_\", \"properties__name_\", \"properties__description_\", \"properties__address__streetAddress_\", \"properties__address__addressCountry_\", \"properties__address__addressLocality_\", \"properties__laneOccupancy_\", \"properties__laneWidth_\", \"properties__laneLength_\", \"properties__dataProvider_\"\r\n\"urn:ngsi-ld:BikeLane:BikeLane-AveMed-Benidorm-123456\", \"Feature\", \"-8.768460000000001\", \"42.60214472222222\", \"Point\", \"https://smartdatamodels.org/context.jsonld\", \"https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld\", \"BikeLane\", \"2021-02-20T06:45:00Z\", \"-8.768460000000001\", \"42.60214472222222\", \"Point\", \"Carril bici - Avenida del Mediterráneo\", \"Información del carril bici\", \"37 Avenida del Mediterráneo\", \"ES\", \"Benidorm\", \"7\", \"2\", \"150\", \"LaneSensor-12345\"",
      "user": "test@hotmail.it"
    },
    {
      "_id": "660d79cc9f72b2a39bb99ea1",
      "name": "Test deploy 03-04-2024",
      "mapRef": "660d79cc9f72b2a39bb99e97",
      "source": [
        {
          "a": "a1",
          "b": {
            "c": "c1"
          }
        },
        {
          "a": "a2",
          "b": {
            "c": "c2"
          }
        },
        {
          "a": "a3",
          "b": {
            "c": "c3"
          }
        }
      ],
      "isAlsoReferencedBy": [],
      "user": "test@hotmail.it"
    },
    {
      "_id": "661e2dafbbd46848a70610ae",
      "name": "DatasetDCATAP",
      "mapRef": "661e2daebbd46848a70610a4",
      "source": [
        {
          "id": "Dataset_#1",
          "type": "Dataset",
          "title": "Class skill deal there no language himself. After rule mouth tell economy risk. Glass personal person center.",
          "datasetDescription": [
            "Sit worry pay during TV increase family. Social drop organization method. Fact treatment throw detail.",
            "Experience similar officer social us item lay prepare. Price year close better."
          ],
          "description": "Own fast suffer your. Spend per police. Less skill much run letter shoulder know office. Discuss of director enter process world possible out.",
          "name": "First table field check. Agency writer size. Meeting nice nothing after ever.",
          "publisher": "Statement which consumer product thought total. Nothing concern picture involve paper nor kid.",
          "landingPage": {
            "value": "https://ngsi-broker.dev.ecosystem-urbanage.eu/swagger-ui/index.html#/dcat-ap-controller/createDcatAp"
          },
          "spatial": [
            {
              "type": "Point",
              "coordinates": [
                109.478534,
                9.922458
              ]
            }
          ],
          "releaseDate": "1983-07-16T12:51:26Z",
          "theme": [
            "Win catch job number find number. Leader reason top arrive night. Movement expect security high hair whom three yeah.",
            "Respond character continue gun. Grow best choice group manage over find."
          ],
          "contactPoint": [
            "Minute write his experience similar right.",
            "Experience away remain."
          ],
          "keyword": [
            "Free analysis reduce. Owner Republican institution six science a usually. Value land executive design.",
            "Bag recently might far plan nearly scene example. Trouble official dream author job claim join different. Success full debate here check attorney size."
          ],
          "accessRights": "non-public",
          "frequency": "Case fine feel that. Government executive issue police chance believe.",
          "datasetDistribution": [
            "KJVK:30944452"
          ],
          "creator": "Wall true factor several nothing. Mission want kind design. Who cause health father director either cause.",
          "version": "Financial role together range. Nice government first policy daughter need kind. Employee source nature add rest human station. Ability management test during foot that course nothing.",
          "versionNotes": [
            "Sort language ball floor. Your majority feeling fact by four two.",
            "Natural explain before something first drug contain start. Party prevent live."
          ]
        }
      ],
      "user": "test@hotmail.it",
      "isAlsoReferencedBy": []
    }
  ],
  config: {
    "basePath": "/api",
    "NGSI_entity": true,
    "ignoreValidation": false,
    "mappingReport": true,
    "disableAjv": true,
    "targetDataModel": "Data Model name, according to the related Schema contained in the DataModels folder",
    "rowStart": 0,
    "rowEnd": 1.7976931348623157e+308,
    "delimiter": ",",
    "endLine": "\n",
    "deleteEmptySpaceAtBeginning": true,
    "site": "SomeRZ",
    "service": "SomeService",
    "entityNameField": "entitySourceId",
    "entityDefaultPrefix": "ds",
    "idVersion": 2,
    "idSite": "SomeRZ",
    "idService": "SomeService",
    "idGroup": "test@hotmail.it"
  }
}
