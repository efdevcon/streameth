# Google sheet

The google sheet module uses google sheets as a data management interface. To get started, you can clone [this sample google sheet](https://docs.google.com/spreadsheets/d/1IDUQ1bkgV0NSLLhZ3qoJqh4CGMdKmxGr_TlYKVsGO3o) to use as your own management interface. 


## Setup

Get a valid google api key and create the following env variable: 
```
GOOGLE_API_KEY=<your key here>
```
Configure the data object in streameth config file like so:

```
  "data": {
    "type": "gsheet",
    "config": {
      "sheetId": "google sheet id here"
    }
  },
```
