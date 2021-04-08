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
 
var readOnlyAnonUserPolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "AddPerm",
        Effect: "Allow",
        Principal: "*",
        Action: [
          "s3:GetObject"
        ],
        Resource: [
          ""
        ]
      }
    ]
  };
  
  // create selected bucket resource string for bucket policy
  var bucketResource = "arn:aws:s3:::" + process.argv[2] + "/*";
  readOnlyAnonUserPolicy.Statement[0].Resource[0] = bucketResource;
  
  // convert policy JSON into string and assign into params
  var bucketPolicyParams = {Bucket: process.argv[2], Policy: JSON.stringify(readOnlyAnonUserPolicy)};
  
  // set the new policy on the selected bucket
  s3.putBucketPolicy(bucketPolicyParams, function(err, data) {
    if (err) {
      // display error message
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
module.exports = router;
