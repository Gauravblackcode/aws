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
// Create JSON for putBucketWebsite parameters
var staticHostParams = {
    Bucket: process.argv[2],
    
    WebsiteConfiguration: {
      ErrorDocument: {
        Key: ''
      },
      IndexDocument: {
        Suffix: '',        
      },
    }
  };
  
  // Insert specified bucket name and index and error documents into params JSON
  // from command line arguments
  staticHostParams.Bucket = process.argv[2];
  staticHostParams.WebsiteConfiguration.IndexDocument.Suffix = process.argv[3];
  staticHostParams.WebsiteConfiguration.ErrorDocument.Key = process.argv[4];
  
  // set the new website configuration on the selected bucket
  s3.putBucketWebsite(staticHostParams, function(err, data) {
    if (err) {
      // display error message
      console.log("Error", err);
    } else {
      // update the displayed website configuration for the selected bucket
      console.log("Success", data);
    }
  });

module.exports = router;
