const express = require("express");

const router = express.Router();

const AWS = require("aws-sdk");


  AWS.config.update({
    accessKeyId: "AKIA3IKS3ZJHUC5ZLUPJ",
    secretAccessKey: "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",
    "region": "ap-south-1",
  });

  // Create the parameters for calling createBucket
  var bucketParams = {
    Bucket: process.argv[2],
  };
  // Create S3 service object
s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  // call S3 to create the bucket
 // Create initial parameters JSON for putBucketCors
var thisConfig = {
  AllowedHeaders:["Authorization"],
  AllowedMethods:[],
  AllowedOrigins:["*"],
  ExposeHeaders:[],
  MaxAgeSeconds:3000
};

// Assemble the list of allowed methods based on command line parameters
var allowedMethods = [];
process.argv.forEach(function (val, index, array) {
  if (val.toUpperCase() === "POST") {allowedMethods.push("POST")};
  if (val.toUpperCase() === "GET") {allowedMethods.push("GET")};
  if (val.toUpperCase() === "PUT") {allowedMethods.push("PUT")};
  if (val.toUpperCase() === "PATCH") {allowedMethods.push("PATCH")};
  if (val.toUpperCase() === "DELETE") {allowedMethods.push("DELETE")};
  if (val.toUpperCase() === "HEAD") {allowedMethods.push("HEAD")};
});

// Copy the array of allowed methods into the config object
thisConfig.AllowedMethods = allowedMethods;
// Create array of configs then add the config object to it
var corsRules = new Array(thisConfig);

// Create CORS params
var corsParams = {Bucket: process.argv[2], CORSConfiguration: {CORSRules: corsRules}};

// set the new CORS configuration on the selected bucket
s3.putBucketCors(corsParams, function(err, data) {
  if (err) {
    // display error message
    console.log("Error", err);
  } else {
    // update the displayed CORS config for the selected bucket
    console.log("Success", data);
  }
})

module.exports = router;
