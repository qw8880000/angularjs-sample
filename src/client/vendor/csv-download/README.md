# csv-download
Angular directive for exporting and downloading JSON data into a CSV file

Code generation [based off of this example](http://halistechnology.com/2015/05/28/use-javascript-to-export-your-data-as-csv/).

# Git Repo
[csv-download](https://github.com/pcimino/csv-download)

# Bower Installation  

    bower install ng-csv-download  

## Demo  
### Plunkr
Demo is running in [Plunker here.](http://embed.plnkr.co/rTDfek/preview).

### Run locally
   - npm install
   - npm start
   - [http://127.0.0.1:8080](http://127.0.0.1:8080)

(If you're using Markdown pad to view this README, open the link in an external browser)

## Usage  

In the app

     ngModule.controller(myApp, ['csvDownload'])  

In your HTML  

     <csv-download
       column-header-array="myHeaderDataArray"
       input-array="myInputArray"
       label="{{myLabel}}"
       filename="{{myFilename}}"></csv-download>

## Attributes  
### column-header-array
Optional  

    Bound Variable: e..g : $scope.myHeader = []; column-header-array="myHeader"  
    If not defined, then defaults to the keys in the inputArray.
    This is a bound variable for an array of column headers, the key matches the data array keys, the values are the headers.
 
### input-array
Required  
         
    Bound Variable: e..g : $scope.myData = []; input-array="myData"
    Contains an array of elements. Each element is a JSON with key/value pairs. If the column-header-array is not included, the keys become the column headers.
 
### label 
Optional

    String variable: e.g. $scope.myLabel; label="{{myLabel}} or label="My Text"
    Display text for the download link. Defaults to "Download Data".
 
### filename
Optional

    String variable: e.g. $scope.myFilename; label="{{myFilename}} or label="MyFile.csv"
    Name of the CSV file being downloaded. Defaults to "export.csv".